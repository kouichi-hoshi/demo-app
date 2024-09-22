type TaskProps = {
  id: string
  created_at: Date | null // nullが許容される
  is_completed: boolean
  title: string
}

type TaskListProps = {
  tasks: TaskProps[]
  toggleTaskCompletion: (taskId: string, isCompleted: boolean) => void
}

const TaskList = ({ tasks, toggleTaskCompletion }: TaskListProps) => {
  return (
    <ul className='border-t-2'>
      {tasks.map((task) => (
        <li key={task.id} className='flex items-center justify-between border-b-2 py-2'>
          <span>
            {task.title} - {task.is_completed ? 'Completed' : 'Incomplete'}
          </span>
          <button className='button' onClick={() => toggleTaskCompletion(task.id, task.is_completed)}>
            {task.is_completed ? '未完了に戻す' : '完了'}
          </button>
        </li>
      ))}
    </ul>
  )
}

// React.memo でメモ化
export default React.memo(TaskList, (prevProps, nextProps) => {
  return prevProps.tasks === nextProps.tasks
})
