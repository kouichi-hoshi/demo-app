import { useState, useEffect, useRef } from 'react'
import { db } from '@/_lib/firebase'
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { useAuth } from '@/_provider/FirebaseProvider'

type TaskProps = {
  id: string
  created_at: Date | null
  is_completed: boolean
  title: string
}

// Firestoreのコレクションを監視してタスクの追加、更新、削除を行うカスタムフック
export default function useTasks() {
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const currentUser = useAuth()
  const inputRef = useRef<HTMLInputElement>(null)

  // ユーザーが認証されている場合、Firestoreのコレクションを監視
  useEffect(() => {
    if (!currentUser || !currentUser.uid) {
      console.log('User is not authenticated or uid is missing')
      return
    }

    const tasksCollectionRef = collection(db, 'users', currentUser.uid, 'tasks')
    const q = query(tasksCollectionRef, orderBy('created_at', 'asc'))

    // Firestoreのコレクションを監視してタスクの追加、更新、削除を行う
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TaskProps[]

      setTasks(tasksData)
    })

    return () => unsubscribe()
  }, [currentUser])

  // タスクを追加する関数
  const handleAddTask = async () => {
    if (!inputRef.current || !currentUser || !currentUser.uid) {
      console.error('Input element or user authentication is missing')
      return
    }

    const taskTitle = inputRef.current.value.trim()

    if (!taskTitle) {
      console.error('Task title is empty')
      return
    }

    try {
      await addDoc(collection(db, 'users', currentUser.uid, 'tasks'), {
        title: taskTitle,
        is_completed: false,
        created_at: new Date(),
      })
      inputRef.current.value = ''
    } catch (error) {
      console.error('Error adding task to Firestore:', error)
    }
  }

  // タスクの完了状態を切り替える関数
  const toggleTaskCompletion = async (taskId: string, isCompleted: boolean) => {
    if (!currentUser || !currentUser.uid) {
      console.error('User is not authenticated or uid is missing')
      return
    }

    const taskDocRef = doc(db, 'users', currentUser.uid, 'tasks', taskId)

    try {
      await updateDoc(taskDocRef, {
        is_completed: !isCompleted,
      })
    } catch (error) {
      console.error('Error updating task completion status:', error)
    }
  }

  // タスクを削除する関数
  const deleteTask = async (taskId: string) => {
    if (!currentUser || !currentUser.uid) {
      console.error('User is not authenticated or uid is missing')
      return
    }

    const taskDocRef = doc(db, 'users', currentUser.uid, 'tasks', taskId)

    try {
      await deleteDoc(taskDocRef)
    } catch (error) {
      console.error('Error deleting task: ', error)
    }
  }

  return {
    tasks,
    handleAddTask,
    toggleTaskCompletion,
    deleteTask,
    inputRef,
  }
}
