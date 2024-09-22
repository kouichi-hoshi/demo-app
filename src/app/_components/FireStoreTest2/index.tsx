'use client'

import useTasks from '@/_hooks/useTasks'
import TaskList from '@/_components/TaskList'

export default function FireStoreTest2() {
  const { tasks, handleAddTask, toggleTaskCompletion, deleteTask, inputRef } = useTasks()

  // 未完了のタスクと完了済みのタスクを分ける
  const incompleteTasks = tasks.filter((task) => !task.is_completed)
  const completedTasks = tasks.filter((task) => task.is_completed)

  return (
    <div className='my-8'>
      <h1 className='my-4 text-xl'>FireStoreTest 2</h1>

      <section className='my-8'>
        <h2 className='mb-2 text-lg'>未完了のタスク</h2>
        <TaskList tasks={incompleteTasks} toggleTaskCompletion={toggleTaskCompletion} deleteTask={deleteTask} />
      </section>

      <div className='flex gap-1 py-2'>
        <input className='border-2 p-2' type='text' ref={inputRef} placeholder='新しいタスクを入力' />
        <button className='button' onClick={handleAddTask}>
          追加
        </button>
      </div>

      <section className='my-8'>
        <h2 className='mb-2 text-lg'>完了済みのタスク</h2>
        <TaskList tasks={completedTasks} toggleTaskCompletion={toggleTaskCompletion} deleteTask={deleteTask} />
      </section>
    </div>
  )
}
