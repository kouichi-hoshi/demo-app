'use client'

import { createContext, useEffect, useContext, useState } from 'react'
import { Auth, getAuth, User } from 'firebase/auth'
import { app } from '@/_lib/firebase'

type SanitizedUser = {
  displayName: string | null
  photoURL: string | null
  uid: string | null
}

type FirebaseContextProps = {
  auth: Auth | null
  currentUser: SanitizedUser | null
}

export const FirebaseContext = createContext<FirebaseContextProps | null>(null)

export const useAuth = () => {
  const context = useContext(FirebaseContext)
  if (context === null) {
    throw new Error('useAuth must be used within a FirebaseProvider')
  }
  return {
    auth: context.auth,
    currentUser: context.currentUser,
  }
}

export default function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth | null>(null)
  const [currentUser, setCurrentUser] = useState<SanitizedUser | null>(null)

  const sanitizeUser = (user: User | null): SanitizedUser | null => {
    if (!user) return null
    return {
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
    }
  }

  useEffect(() => {
    const authInstance = getAuth(app)
    setAuth(authInstance)

    // 認証状態の監視
    const unsubscribe = authInstance.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(sanitizeUser(user))
        console.log('User is logged in')
      } else {
        console.log('User is not logged in')
        setCurrentUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return <FirebaseContext.Provider value={{ auth, currentUser }}>{children}</FirebaseContext.Provider>
}
