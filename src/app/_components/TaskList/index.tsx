import React, { useState, useRef } from 'react'
import { FaBars } from 'react-icons/fa6'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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
}

type TaskAction = (taskId: string, isCompleted: boolean) => void

function SortableTaskItem({ task, toggleTaskCompletion, updateTaskTitle, deleteTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState<{ [taskId: string]: boolean }>({}) // 各タスクの編集モードを管理
  const titleInputRef = useRef<HTMLInputElement>(null)
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id })

  // ドラッグ中のタスクのスタイルを設定
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  // タスクのタイトルを更新する関数
  const handleUpdateTaskTitle = () => {
    if (titleInputRef.current) {
      updateTaskTitle(task.id, titleInputRef.current.value) // 入力された新しいタイトルを渡す
      handleToggleEditMode(task.id) // 編集モードを終了
    }
  }

  // タスクのタイトルの編集モードを切り替える関数
  const handleToggleEditMode = (taskId: string) => {
    setIsEditing((prev) => ({ ...prev, [taskId]: !prev[taskId] })) // タスクごとに編集モードをトグル
  }

  return (
    <li ref={setNodeRef} style={style} className='flex items-center justify-between gap-2 border-b-2 py-2'>
      <div className='flex items-center gap-2'>
        {/* この部分がドラッグ専用のハンドル */}
        <span {...listeners} {...attributes}>
          <FaBars />
        </span>
        {/* タスクタイトルの表示モードと編集モードを切り替える */}
        {isEditing[task.id] ? (
          <div>
            <input
              ref={titleInputRef}
              type='text'
              className='border-2 p-2'
              defaultValue={task.title}
              placeholder='タスクタイトルを更新'
            />
            <button className='button' onClick={handleUpdateTaskTitle}>
              更新
            </button>
            <button className='button' onClick={() => handleToggleEditMode(task.id)}>
              キャンセル
            </button>
          </div>
        ) : (
          <div className='flex items-center gap-2'>{task.title}</div>
        )}
      </div>
      <div className='flex shrink-0 gap-2'>
        <button className='button' onClick={() => toggleTaskCompletion(task.id, task.is_completed)}>
          {task.is_completed ? '未完了に戻す' : '完了'}
        </button>
        <button className='button' onClick={() => handleToggleEditMode(task.id)}>
          {isEditing[task.id] ? 'キャンセル' : '編集'}
        </button>
        <button className='px-4 py-2 text-xs' onClick={() => deleteTask(task.id)}>
          削除
        </button>
      </div>
    </li>
  )
}

const TaskList = ({ tasks, toggleTaskCompletion, updateTaskTitle, deleteTask }: TaskListProps) => {
  return (
    <ul className='border-t-2'>
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
  )
}

export default React.memo(TaskList, (prevProps, nextProps) => {
  return (
    prevProps.tasks === nextProps.tasks &&
    prevProps.toggleTaskCompletion === nextProps.toggleTaskCompletion &&
    prevProps.deleteTask === nextProps.deleteTask
  )
})
