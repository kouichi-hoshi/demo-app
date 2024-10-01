import Link from 'next/link'
import FirebaseLogIn from '@/_components/FirebaseLogIn'
import { SITE_META } from '@/_constants/constants'

export default function CommonHeader() {
  return (
    <header>
      <div className='baseContainer flex items-center justify-between gap-2 py-4'>
        <p>
          <Link href='/'>{SITE_META.siteTitle}</Link>
        </p>
        <FirebaseLogIn />
      </div>
    </header>
  )
}
