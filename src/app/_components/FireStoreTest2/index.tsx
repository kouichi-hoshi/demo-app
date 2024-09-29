'use client'

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
      <h1 className='my-4 text-xl'>FireStoreTest 2</h1>
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

            <div className='my-16 flex gap-1'>
              <input className='border-2 p-2' type='text' ref={inputRef} placeholder='新しいタスクを入力' />
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
        <p>ログインしてください</p>
      )}
    </div>
  )
}
