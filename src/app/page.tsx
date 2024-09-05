import LoginStatus from '@/_components/LoginStatus'
import PageHeader from '@/_components/PageHeader'

export default function Home() {
  return (
    <article className='baseContainer'>
      <section>
        <PageHeader title={'Home'} />
        <button className='button'>demo button</button>
        <LoginStatus />
      </section>
    </article>
  )
}
