'use client'

import { createContext, useEffect, useContext, useState } from 'react'
import { getApps } from 'firebase/app'
import { Auth, getAuth, User } from 'firebase/auth'
import { initializeFirebaseApp } from '@/_lib/firebase'

// authとcurrentUserを共有するためにコンテキストを拡張
type FirebaseContextProps = {
  auth: Auth | null
  currentUser: User | null
}

export const FirebaseContext = createContext<FirebaseContextProps | null>(null)

export const useAuth = () => {
  const context = useContext(FirebaseContext)

  if (context === null) {
    throw new Error('useAuth must be used within a FirebaseProvider')
  }

  return context.currentUser
}

export default function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null) // currentUserを追加

  useEffect(() => {
    try {
      const app = initializeFirebaseApp()
      const authInstance = getAuth(app)
      if (authInstance) {
        setAuth(authInstance)

        // 認証状態の変化を監視
        const unsubscribe = authInstance.onAuthStateChanged((user) => {
          if (user) {
            console.log(`User is logged in: ${user.displayName}`)
            setCurrentUser(user) // ログインしているユーザーの情報を保存
          } else {
            console.log('User is not logged in')
            setCurrentUser(null) // ログインしていない場合はnullに
          }
        })

        return () => unsubscribe() // クリーンアップでリスナーを解除
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

  // FirebaseContextでauthとcurrentUserを提供
  return <FirebaseContext.Provider value={{ auth, currentUser }}>{children}</FirebaseContext.Provider>
}
