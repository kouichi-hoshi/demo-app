'use client'

import { useAuth } from '@/_provider/FirebaseProvider'

export default function LoginStatus() {
  const { currentUser } = useAuth()

  return (
    <dl className='my-6 md:my-12 flex gap-2'>
      <dt>Login status:</dt>
      {currentUser ? <dd>ログイン中</dd> : <dd>ログアウト</dd>}
    </dl>
  )
}
