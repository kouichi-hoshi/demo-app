'use client'

import FirebaseLogIn from '@/_components/FirebaseLogIn'

export default function Header() {
  return (
    <header className='container m-2 mx-auto border-2 p-2'>
      <h1 className='mb-4 text-2xl'>Header</h1>
      <FirebaseLogIn />
    </header>
  )
}
