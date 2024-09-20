'use client'

import { useState, useEffect } from 'react'
import { db } from '@/_lib/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
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
    </div>
  )
}
