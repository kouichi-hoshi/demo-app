import React, { useState, useRef, memo } from 'react'
import { FaBars } from 'react-icons/fa6'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import styles from '@/_components/TaskList/taskList.module.scss'

type TaskProps = {
  id: string
  created_at: Date | null
  is_completed: boolean
  title: string
}

type TaskActionsProps = {
  toggleTaskCompletion: TaskAction
  deleteTask: (taskId: string) => void
  updateTaskTitle: (taskId: string, newTitle: string) => void
}

type TaskItemProps = TaskActionsProps & {
  task: TaskProps
}

type TaskListProps = TaskActionsProps & {
  tasks: TaskProps[]
  emptyMessage: string
}

type TaskAction = (taskId: string, isCompleted: boolean) => void

function SortableTaskItem({ task, toggleTaskCompletion, updateTaskTitle, deleteTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState<{ [taskId: string]: boolean }>({}) // 各タスクの編集モードを管理
  const [isComposing, setIsComposing] = useState(false) // IME変換中かどうかを管理
  const titleInputRef = useRef<HTMLInputElement>(null)
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id })
  const [errorMessage, setErrorMessage] = useState<string | null>(null) // エラーメッセージの状態を管理

  // ドラッグ中のタスクのスタイルを設定
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  // 編集モードと通常表示モードをトグルする関数
  const handleToggleEditMode = (taskId: string) => {
    if (titleInputRef.current) {
      const trimmedTitle = titleInputRef.current.value.trim()

      // タイトルが空白の場合はエラーメッセージをセットし、編集モードを維持
      if (!trimmedTitle) {
        setErrorMessage('タスクのタイトルを入力するか、キャンセルしてください。')
        return
      }
      setErrorMessage(null) // エラーメッセージをクリア
    }

    // タスクごとに編集モードをトグル
    setIsEditing((prev) => ({ ...prev, [taskId]: !prev[taskId] }))
  }

  // キャンセルボタン用の編集モード終了関数（バリデーションを行わない）
  const handleCancelEditMode = (taskId: string) => {
    setErrorMessage(null) // エラーメッセージをクリア
    setIsEditing((prev) => ({ ...prev, [taskId]: false })) // 強制的に編集モードを終了
  }

  return (
    <>
      <li
        ref={setNodeRef}
        style={style}
        className={`${styles.taskItem} flex flex-col items-end justify-between gap-4 border-b-2 p-4 sm:flex-row sm:items-center`}
        data-editing={isEditing[task.id]} // 編集モードの状態を表すdata属性を追加
      >
        <div className='flex w-full items-stretch gap-4 '>
          {/* この部分がドラッグ専用のハンドル */}
          <span {...listeners} {...attributes} className='flex items-center'>
            <FaBars />
          </span>
          <div className='flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between'>
            {/* 編集モード と 通常表示モードの条件分岐 */}
            {isEditing[task.id] ? (
              <>
                {/* 編集モード */}
                <div className='grow'>
                  <input
                    ref={titleInputRef}
                    type='text'
                    className='w-full border-2 p-2'
                    defaultValue={task.title}
                    placeholder='タスクタイトルを更新'
                    onCompositionStart={() => setIsComposing(true)} // 変換開始
                    onCompositionEnd={() => setIsComposing(false)} // 変換終了
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !isComposing && titleInputRef.current) {
                        updateTaskTitle(task.id, titleInputRef.current.value)
                        handleToggleEditMode(task.id) // 編集モードを終了
                      }
                    }}
                  />
                  {/* エラーメッセージを表示 */}
                  {errorMessage && <p className='error-message mt-2 text-xs'>{errorMessage}</p>}
                </div>
                <div className='flex gap-2'>
                  <button
                    className='button-primary mr-auto w-1/2 md:mr-0 md:w-fit'
                    onClick={() => {
                      if (titleInputRef.current) {
                        updateTaskTitle(task.id, titleInputRef.current.value)
                        handleToggleEditMode(task.id) // 編集モードを終了
                      }
                    }}
                  >
                    更新
                  </button>
                  <button
                    className='button-secondary mr-auto w-1/2 md:mr-0 md:w-fit'
                    onClick={() => handleCancelEditMode(task.id)}
                  >
                    キャンセル
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* 通常表示モード */}
                <div className='flex items-center gap-2 py-2'>{task.title}</div>
                <div className='flex shrink-0 justify-end gap-2'>
                  <button className='button-primary' onClick={() => toggleTaskCompletion(task.id, task.is_completed)}>
                    {task.is_completed ? '未完了' : '完了'}
                  </button>
                  <button className='button-secondary' onClick={() => handleToggleEditMode(task.id)}>
                    編集
                  </button>
                  {/* タスクに完了済みフラグがセットされてるときのみ削除ボタンを表示する */}
                  {task.is_completed && (
                    <button className='px-4 py-2 text-xs text-gray-500' onClick={() => deleteTask(task.id)}>
                      削除
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </li>
    </>
  )
}

const TaskList = ({ tasks, emptyMessage, toggleTaskCompletion, updateTaskTitle, deleteTask }: TaskListProps) => {
  return (
    <>
      {tasks && tasks.length > 0 ? (
        <ul className='border-t-2 pl-8 md:pl-0'>
          {tasks.map((task) => (
            <SortableTaskItem
              key={task.id}
              task={task}
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
              updateTaskTitle={updateTaskTitle}
            />
          ))}
        </ul>
      ) : (
        <p className='my-4'>{emptyMessage}</p>
      )}
    </>
  )
}

export default memo(TaskList, (prevProps, nextProps) => {
  return (
    prevProps.tasks === nextProps.tasks &&
    prevProps.emptyMessage === nextProps.emptyMessage &&
    prevProps.toggleTaskCompletion === nextProps.toggleTaskCompletion &&
    prevProps.deleteTask === nextProps.deleteTask &&
    prevProps.updateTaskTitle === nextProps.updateTaskTitle
  )
})
