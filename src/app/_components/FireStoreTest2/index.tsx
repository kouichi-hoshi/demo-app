'use client'

import { useState, useRef, useEffect } from 'react'
import { db } from '@/_lib/firebase'
import { collection, addDoc, onSnapshot } from 'firebase/firestore'
import { useAuth } from '@/_provider/FirebaseProvider'

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

  useEffect(() => {
    if (!currentUser || !currentUser.uid) {
      console.log('User is not authenticated or uid is missing')
      return
    }

    const tasksCollectionRef = collection(db, 'users', currentUser.uid, 'tasks')

    // Firestoreのコレクション全体をリアルタイムで監視する
    const unsubscribe = onSnapshot(tasksCollectionRef, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TaskProps[]

      setTasks(tasksData)
    })

    // コンポーネントがアンマウントされた際にリスナーを解除する
    return () => unsubscribe()
  }, [currentUser])

  const handleAddTask = async () => {
    if (!inputRef.current) {
      return
    }

    const taskTitle = inputRef.current.value

    if (taskTitle.trim() === '') {
      return
    }

    // currentUser または currentUser.uid が null の場合は処理を中断
    if (!currentUser || !currentUser.uid) {
      console.error('User is not authenticated or uid is missing')
      return
    }

    // Firestoreにデータを追加
    await addDoc(collection(db, 'users', currentUser.uid, 'tasks'), {
      title: taskTitle,
      is_completed: false,
      created_at: new Date(),
    })

    // 入力フィールドをクリア
    inputRef.current.value = ''
  }

  return (
    <div className='my-8'>
      <h1>FireStoreTest 2</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.is_completed ? 'Completed' : 'Incomplete'}
          </li>
        ))}
      </ul>
      <div className='py-2'>
        <input className='border-2 p-2' type='text' ref={inputRef} placeholder='新しいタスクを入力' />
        <button onClick={handleAddTask}>追加</button>
      </div>
    </div>
  )
}
