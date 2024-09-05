'use client'

import FirebaseLogIn from '@/_components/FirebaseLogIn'
import { SITE_META } from '@/_constants/constants'

export default function Header() {
  return (
    <header className='border-b-2'>
      <div className='baseContainer flex items-center justify-between gap-2 py-4'>
        <p className='text-2xl'>{SITE_META.siteTitle}</p>
        <FirebaseLogIn />
      </div>
    </header>
  )
}
