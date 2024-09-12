'use client'

import { useAuth } from '@/_provider/FirebaseProvider'

export default function LoginStatus() {
  const auth = useAuth()

  return (
    <dl className='my-2 flex gap-2'>
      <dt>Login status:</dt>
      {auth ? <dd>Logged in</dd> : <dd>Logged out</dd>}
    </dl>
  )
}
