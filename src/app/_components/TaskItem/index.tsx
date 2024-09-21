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

export default function TaskItem({ task, toggleTaskCompletion }: TaskItemProps) {
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
