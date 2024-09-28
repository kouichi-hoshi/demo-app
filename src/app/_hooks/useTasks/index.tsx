import { useState, useEffect, useRef, useCallback } from 'react'
import { db } from '@/_lib/firebase'
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { useAuth } from '@/_provider/FirebaseProvider'
import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

type TaskProps = {
  id: string
  created_at: Date | null
  is_completed: boolean
  title: string
}

// Firestoreのコレクションを監視してタスクの追加、更新、削除、ドラッグ＆ドロップを行う
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

    // Firestoreのコレクションを参照
    const tasksCollectionRef = collection(db, 'users', currentUser.uid, 'tasks')

    // タスクを order フィールドで昇順に並び替える
    const q = query(tasksCollectionRef, orderBy('order', 'asc'))

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

  // タスクを追加してFirestoreを更新
  const handleAddTask = useCallback(async () => {
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
      const newOrder = tasks.length + 1 // タスクの順序を現在の長さ+1とする
      await addDoc(collection(db, 'users', currentUser.uid, 'tasks'), {
        title: taskTitle,
        is_completed: false,
        created_at: new Date(),
        order: newOrder,
      })
      inputRef.current.value = ''
    } catch (error) {
      console.error('Error adding task to Firestore:', error)
    }
  }, [currentUser, tasks.length])

  // ドラッグ＆ドロップ完了時にFirestoreを更新
  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!currentUser || !currentUser.uid) {
        console.error('User is not authenticated or uid is missing')
        return
      }

      if (over && active.id !== over.id) {
        setTasks((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id)
          const newIndex = items.findIndex((item) => item.id === over.id)
          const updatedTasks = arrayMove(items, oldIndex, newIndex)

          // Firestoreの order フィールドを更新
          updatedTasks.forEach((task, index) => {
            const taskDocRef = doc(db, 'users', currentUser.uid!, 'tasks', task.id) // uid!でnullチェックを回避
            updateDoc(taskDocRef, { order: index + 1 })
          })

          return updatedTasks
        })
      }
    },
    [currentUser]
  )

  // タスクの完了状態を切り替えてFirestoreを更新
  const toggleTaskCompletion = useCallback(
    async (taskId: string, isCompleted: boolean) => {
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
    },
    [currentUser]
  )

  // タスクを削除してFirestoreを更新
  const deleteTask = useCallback(
    async (taskId: string) => {
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
    },
    [currentUser]
  )

  // タスクのタイトルを変更してFirestoreを更新
  const updateTaskTitle = useCallback(
    async (taskId: string, newTitle: string) => {
      if (!currentUser || !currentUser.uid) {
        console.error('User is not authenticated or uid is missing')
        return
      }

      // タイトルが空白でないかチェック
      const trimmedTitle = newTitle.trim()
      if (!trimmedTitle) {
        console.error('Task title is empty or contains only whitespace.')
        return
      }

      const taskDocRef = doc(db, 'users', currentUser.uid, 'tasks', taskId)

      try {
        await updateDoc(taskDocRef, { title: trimmedTitle })
      } catch (error) {
        console.error('Error updating task title:', error)
      }
    },
    [currentUser]
  )

  return {
    tasks,
    inputRef,
    handleAddTask,
    toggleTaskCompletion,
    deleteTask,
    updateTaskTitle,
    handleDragEnd,
  }
}
