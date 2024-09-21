'use client'

import { useState, useRef, useEffect } from 'react'
import { db } from '@/_lib/firebase'
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore'
import { useAuth } from '@/_provider/FirebaseProvider'
import TaskItem from '@/_components/TaskItem'

type TaskProps = {
  id: string
  created_at: Date | null
  is_completed: boolean
  title: string
}

export default function FireStoreTest2() {
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const currentUser = useAuth()
  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * Firestoreのデータをリアルタイムで監視する
   */
  useEffect(() => {
    if (!currentUser || !currentUser.uid) {
      console.log('User is not authenticated or uid is missing')
      return
    }

    const tasksCollectionRef = collection(db, 'users', currentUser.uid, 'tasks')
    const q = query(tasksCollectionRef, orderBy('created_at', 'desc')) // 作成日時の降順でソート

    // Firestoreのコレクション全体をリアルタイムで監視する
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TaskProps[]

      setTasks(tasksData)
    })

    // コンポーネントがアンマウントされた際にリスナーを解除する
    return () => unsubscribe()
  }, [currentUser])

  /**
   * Firestoreにタスクを追加する
   */
  const handleAddTask = async () => {
    // inputRef.current や currentUser の存在確認
    if (!inputRef.current || !currentUser || !currentUser.uid) {
      console.error('Input element or user authentication is missing')
      return
    }

    const taskTitle = inputRef.current.value.trim()

    // タスクのタイトルが空かどうかをチェック
    if (!taskTitle) {
      console.error('Task title is empty')
      return
    }

    // Firestoreにデータを追加
    try {
      await addDoc(collection(db, 'users', currentUser.uid, 'tasks'), {
        title: taskTitle,
        is_completed: false,
        created_at: new Date(),
      })
    } catch (error) {
      console.error('Error adding task to Firestore:', error)
      return
    }

    // 入力フィールドをクリア
    inputRef.current.value = ''
  }

  /**
   * タスクの完了状態を切り替える
   */
  const toggleTaskCompletion = async (taskId: string, isCompleted: boolean) => {
    if (!currentUser || !currentUser.uid) {
      console.error('User is not authenticated or uid is missing')
      return
    }

    const taskDocRef = doc(db, 'users', currentUser.uid, 'tasks', taskId)

    try {
      await updateDoc(taskDocRef, {
        is_completed: !isCompleted, // 完了状態をトグル
      })
    } catch (error) {
      console.error('Error updating task completion status:', error)
    }
  }

  // 完了・未完了のタスクを分けて表示
  const incompleteTasks = tasks.filter((task) => !task.is_completed)
  const completedTasks = tasks.filter((task) => task.is_completed)

  return (
    <div className='my-8'>
      <h1 className='my-4 text-xl'>FireStoreTest 2</h1>

      {/* 未完了のタスク */}
      <section className='my-8'>
        <h2 className='mb-2 text-lg'>未完了のタスク</h2>
        <ul className='border-t-2'>
          {incompleteTasks.map((task) => (
            <TaskItem key={task.id} task={task} toggleTaskCompletion={toggleTaskCompletion} />
          ))}
        </ul>
      </section>

      {/* 完了済みのタスク */}
      <section className='my-8'>
        <h2 className='mb-2 mt-4 text-lg'>完了済みのタスク</h2>
        <ul className='border-t-2'>
          {completedTasks.map((task) => (
            <TaskItem key={task.id} task={task} toggleTaskCompletion={toggleTaskCompletion} />
          ))}
        </ul>
      </section>

      <div className='flex gap-1 py-2'>
        <input className='border-2 p-2' type='text' ref={inputRef} placeholder='新しいタスクを入力' />
        <button className='button' onClick={handleAddTask}>
          追加
        </button>
      </div>
    </div>
  )
}
