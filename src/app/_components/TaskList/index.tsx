import React from 'react'
import { FaBars } from 'react-icons/fa6'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type TaskProps = {
  id: string
  created_at: Date | null
  is_completed: boolean
  title: string
}

type TaskAction = (taskId: string, isCompleted: boolean) => void

type TaskItemProps = {
  task: TaskProps
  toggleTaskCompletion: TaskAction
  deleteTask: (taskId: string) => void
}

type TaskListProps = {
  tasks: TaskProps[]
  toggleTaskCompletion: TaskAction
  deleteTask: (taskId: string) => void
}

function SortableTaskItem({ task, toggleTaskCompletion, deleteTask }: TaskItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li ref={setNodeRef} style={style} className='flex items-center justify-between gap-2 border-b-2 py-2'>
      <div className='flex items-center gap-2'>
        {/* この部分がドラッグ専用のハンドル */}
        <span {...listeners} {...attributes}>
          <FaBars />
        </span>
        {task.title} - {task.is_completed ? 'Completed' : 'Incomplete'}
      </div>
      <div className='flex shrink-0 gap-2'>
        <button className='button' onClick={() => toggleTaskCompletion(task.id, task.is_completed)}>
          {task.is_completed ? '未完了に戻す' : '完了'}
        </button>
        <button className='px-4 py-2 text-xs' onClick={() => deleteTask(task.id)}>
          削除
        </button>
      </div>
    </li>
  )
}

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask }: TaskListProps) => {
  return (
    <ul className='border-t-2'>
      {tasks.map((task) => (
        <SortableTaskItem
          key={task.id}
          task={task}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
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
