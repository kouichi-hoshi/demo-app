'use client'

import { useAuthStateListener } from '@/_provider/FirebaseProvider'

export default function LoginStatus() {
  const auth = useAuthStateListener()

  return (
    <dl className='my-2 flex gap-2'>
      <dt>Login status:</dt>
      {auth ? <dd>Logged in</dd> : <dd>Logged out</dd>}
    </dl>
  )
}
