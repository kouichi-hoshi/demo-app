'use client'

import useTasks from '@/_hooks/useTasks'
import TaskList from '@/_components/TaskList'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

export default function FireStoreTest2() {
  const { tasks, handleAddTask, handleDragEnd, toggleTaskCompletion, deleteTask, inputRef } = useTasks()

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

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={taskIds.incomplete} strategy={verticalListSortingStrategy}>
          <section className='my-8'>
            <h2 className='mb-2 text-lg'>未完了のタスク</h2>
            <TaskList tasks={incompleteTasks} toggleTaskCompletion={toggleTaskCompletion} deleteTask={deleteTask} />
          </section>
        </SortableContext>

        <div className='flex gap-1 py-2'>
          <input className='border-2 p-2' type='text' ref={inputRef} placeholder='新しいタスクを入力' />
          <button className='button' onClick={handleAddTask}>
            追加
          </button>
        </div>

        <SortableContext items={taskIds.completed} strategy={verticalListSortingStrategy}>
          <section className='my-8'>
            <h2 className='mb-2 text-lg'>完了済みのタスク</h2>
            <TaskList tasks={completedTasks} toggleTaskCompletion={toggleTaskCompletion} deleteTask={deleteTask} />
          </section>
        </SortableContext>
      </DndContext>
    </div>
  )
}
