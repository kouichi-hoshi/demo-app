import React from 'react'

type TaskItemProps = {
  task: TaskProps
  toggleTaskCompletion: (taskId: string, isCompleted: boolean) => void
}

type TaskProps = {
  id: string
  created_at: Date | null
  is_completed: boolean
  title: string
}

const TaskItem = ({ task, toggleTaskCompletion }: TaskItemProps) => {
  console.log('Rendering task:', task.title) // 再描画されるタスクを確認できる

  return (
    <li key={task.id} className='flex items-center justify-between border-b-2 py-2'>
      <span>
        {task.title} - {task.is_completed ? 'Completed' : 'Incomplete'}
      </span>
      <button className='button' onClick={() => toggleTaskCompletion(task.id, task.is_completed)}>
        {task.is_completed ? '未完了に戻す' : '完了'}
      </button>
    </li>
  )
}

// React.memoでメモ化
export default React.memo(TaskItem, (prevProps, nextProps) => {
  // is_completed または title が変わった場合のみ再描画する
  return prevProps.task.is_completed === nextProps.task.is_completed && prevProps.task.title === nextProps.task.title
})
