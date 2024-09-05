'use client'

import FirebaseLogIn from '@/_components/FirebaseLogIn'
import { SITE_META } from '@/_constants/constants'

export default function CommonHeader() {
  return (
    <header>
      <div className='baseContainer flex items-center justify-between gap-2 py-4'>
        <p>{SITE_META.siteTitle}</p>
        <FirebaseLogIn />
      </div>
    </header>
  )
}
