import React from 'react'

type TaskProps = {
  id: string
  created_at: Date | null
  is_completed: boolean
  title: string
}

type TaskListProps = {
  tasks: TaskProps[]
  toggleTaskCompletion: (taskId: string, isCompleted: boolean) => void
  deleteTask: (taskId: string) => void
}

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask }: TaskListProps) => {
  return (
    <ul className='border-t-2'>
      {tasks.map((task) => (
        <li key={task.id} className='flex items-center justify-between border-b-2 py-2'>
          <span>
            {task.title} - {task.is_completed ? 'Completed' : 'Incomplete'}
          </span>
          <div className='flex gap-2'>
            <button className='button' onClick={() => toggleTaskCompletion(task.id, task.is_completed)}>
              {task.is_completed ? '未完了に戻す' : '完了'}
            </button>
            <button className='px-4 py-2 text-xs' onClick={() => deleteTask(task.id)}>
              削除
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default React.memo(TaskList)
