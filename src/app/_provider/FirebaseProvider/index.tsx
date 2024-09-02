'use client'

import { createContext, useEffect, useContext, useState } from 'react'
import { getApps } from 'firebase/app'
import { Auth, getAuth, User } from 'firebase/auth'
import { initializeFirebaseApp } from '@/_lib/firebase'

export const FirebaseContext = createContext<Auth | null>(null)

// ユーザーの認証状態を監視するカスタムフック
export const useAuthStateListener = () => {
  const auth = useContext(FirebaseContext)
  const [currentUser, setCurrentUser] = useState<User | null>(null) // ユーザーの認証状態を管理する

  useEffect(() => {
    if (auth === null) {
      console.log('Firebase Auth is initializing...')
      return
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(`User is logged in: ${user.email}`)
        setCurrentUser(user) // ログインしているユーザーの情報をステートに格納
      } else {
        console.log('User is not logged in')
        setCurrentUser(null) // ログインしていない場合はnullをセット
      }
    })

    // コンポーネントがアンマウントされる際にリスナーを解除する
    return () => unsubscribe()
  }, [auth])

  return currentUser // 現在のユーザーの認証状態を返す
}

export default function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth | null>(null)

  useEffect(() => {
    try {
      const app = initializeFirebaseApp()
      const authInstance = getAuth(app)
      if (authInstance) {
        setAuth(authInstance)
      }
      console.log('Firebase has been initialized successfully.')
    } catch (error) {
      console.error('Failed to initialize Firebase:', error)
    }

    if (getApps().length > 0) {
      console.log('Firebase apps:', getApps())
    } else {
      console.log('No Firebase apps have been initialized.')
    }
  }, [])

  return <FirebaseContext.Provider value={auth}>{children}</FirebaseContext.Provider>
}
