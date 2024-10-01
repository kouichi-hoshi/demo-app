'use client'

import { useAuth } from '@/_provider/FirebaseProvider'

export default function LoginStatus() {
  const { currentUser } = useAuth()

  return (
    <dl className='my-6 flex gap-2 md:my-12'>
      <dt>Login status:</dt>
      {currentUser ? <dd>ログイン中</dd> : <dd>ログアウト</dd>}
    </dl>
  )
}
