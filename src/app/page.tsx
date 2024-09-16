import LoginStatus from '@/_components/LoginStatus'
import PageHeader from '@/_components/PageHeader'
import FireStoreTest from './_components/FireStoreTest'

export default function Home() {
  return (
    <article className='baseContainer'>
      <section>
        <PageHeader title={'Home'} />
        <button className='button'>demo button</button>
        <LoginStatus />
        <FireStoreTest />
      </section>
    </article>
  )
}
