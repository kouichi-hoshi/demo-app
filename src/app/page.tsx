import Link from 'next/link'
import LoginStatus from '@/_components/LoginStatus'
import PageHeader from '@/_components/PageHeader'

export default function Home() {
  return (
    <article className='baseContainer'>
      <section>
        <PageHeader title={'Home'} />
        <LoginStatus />
        <p>
          <Link href='/todo-app' className='underline'>
            ToDo App
          </Link>
        </p>
      </section>
    </article>
  )
}
