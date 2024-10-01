'use client'

import Link from 'next/link'
import { useAuth } from '@/_provider/FirebaseProvider'
import useTasks from '@/_hooks/useTasks'
import TaskList from '@/_components/TaskList'
import { useState } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

export default function FireStoreTest2() {
  const { currentUser } = useAuth()
  const { tasks, handleAddTask, handleDragEnd, toggleTaskCompletion, deleteTask, updateTaskTitle, inputRef } =
    useTasks()

  // 完了済みタスクの表示状態を管理
  const [showCompletedTasks, setShowCompletedTasks] = useState(false)

  // 未完了のタスクと完了済みのタスクを分ける
  const incompleteTasks = tasks.filter((task) => !task.is_completed)
  const completedTasks = tasks.filter((task) => task.is_completed)

  // タスクのIDを抽出して変数に格納
  const taskIds = {
    incomplete: incompleteTasks.map((task) => task.id),
    completed: completedTasks.map((task) => task.id),
  }

  return (
    <div className='my-8'>
      {currentUser ? (
        <>
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={taskIds.incomplete} strategy={verticalListSortingStrategy}>
              <section className='my-8'>
                <h2 className='mb-2 text-lg'>タスク一覧</h2>
                <TaskList
                  tasks={incompleteTasks}
                  emptyMessage='タスクがありません。登録しましょう！'
                  toggleTaskCompletion={toggleTaskCompletion}
                  deleteTask={deleteTask}
                  updateTaskTitle={updateTaskTitle}
                />
              </section>
            </SortableContext>

            <div className='my-16 flex gap-2'>
              <input
                className='grow border-2 p-2 md:w-3/5 md:grow-0'
                type='text'
                ref={inputRef}
                placeholder='新しいタスクを入力'
              />
              <button className='button-primary' onClick={handleAddTask}>
                追加
              </button>
            </div>

            {/* 完了済みタスクの表示/非表示を真偽値で切り替え */}
            {showCompletedTasks && (
              <SortableContext items={taskIds.completed} strategy={verticalListSortingStrategy}>
                <section className='my-8'>
                  <h2 className='mb-2 text-lg'>完了済みのタスク</h2>
                  <TaskList
                    tasks={completedTasks}
                    emptyMessage='完了済みのタスクはありません。'
                    toggleTaskCompletion={toggleTaskCompletion}
                    deleteTask={deleteTask}
                    updateTaskTitle={updateTaskTitle}
                  />
                </section>
              </SortableContext>
            )}
          </DndContext>
          {/* ボタンで完了済みタスクの表示状態をトグル */}
          <div className='my-16 text-center'>
            <button className='button' onClick={() => setShowCompletedTasks(!showCompletedTasks)}>
              {showCompletedTasks ? '完了済みタスクを非表示' : '完了済みタスクを表示'}
            </button>
          </div>
        </>
      ) : (
        <>
          <section className='my-8'>
            <h2 className='mb-2 text-2xl'>このアプリについて</h2>
            <p className='mb-4'>
              シンプルなTODOアプリです。
              <br />
              タスクの追加、編集、削除など一般的なTODOアプリと同様ご利用できます。
            </p>
            <p className='mb-4'>
              PC、タブレット、スマートフォンに対応しています。
              <br />
              ドラッグ&ドロップでタスクの順番を変更できます。
              <br />
              登録したタスクはデータベースに保存され、異なるデバイス間で同期して利用可能です。
            </p>
          </section>
          <section className='my-8'>
            <h2 className='mb-2 text-2xl'>ご利用方法</h2>
            <p className='mb-4'>
              画面右上の「Googleでログイン」ボタンをクリック/タップしてログインすると利用可能になります。
              <br />
              ログインするとgoogleアカウントに登録されているアカウントの画像と名前をが表示されます。
            </p>
          </section>
          <section className='my-8'>
            <h2 className='mb-2 text-2xl'>ログアウトと接続解除</h2>
            <p className='mb-4'>
              ログアウトボタンが表示されているときは、そのボタンクリック/タップするとログアウトできます。
            </p>
            <p className='mb-4'>
              アプリとの接続を解除する場合はGoogleアカウントの
              <Link href='https://myaccount.google.com/security' target='_blank' className='underline'>
                セキュリティページ
              </Link>
              で解除してください。
            </p>
          </section>
          <section className='my-8'>
            <h2 className='mb-2 text-2xl'>データの削除について</h2>
            <p className='mb-4'>
              アプリと接続を解除しても、登録したタスクの情報はデータベースから削除されません。
              <br />
              データを完全に削除したい場合は、削除ボタンをクリック/タップして削除してください。
            </p>
          </section>
        </>
      )}
    </div>
  )
}
