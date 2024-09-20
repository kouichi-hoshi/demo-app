import LoginStatus from '@/_components/LoginStatus'
import PageHeader from '@/_components/PageHeader'
import FireStoreTest from './_components/FireStoreTest'
import FireStoreTest2 from './_components/FireStoreTest2'

export default function Home() {
  return (
    <article className='baseContainer'>
      <section>
        <PageHeader title={'Home'} />
        <button className='button'>demo button</button>
        <LoginStatus />
        <hr />
        <FireStoreTest />
        <hr />
        <FireStoreTest2 />
      </section>
    </article>
  )
}
