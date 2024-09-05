import LoginStatus from '@/_components/LoginStatus'

export default function Home() {
  return (
    <article className='baseContainer'>
      <section>
        <h1 className='mb-4'>Home / main</h1>
        <button className='button'>demo button</button>
        <LoginStatus />
      </section>
    </article>
  )
}
