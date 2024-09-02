'use client'

import FirebaseProvider from '@/_provider/FirebaseProvider'

export default function FirebaseWrapProvider({ children }: { children: React.ReactNode }) {
  return <FirebaseProvider>{children}</FirebaseProvider>
}
