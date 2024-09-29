import PageHeader from '@/_components/PageHeader'
import SortableTaskList from '@/_components/SortableTaskList'

export default function Home() {
  return (
    <article className='baseContainer'>
      <section>
        <PageHeader title={'ToDo App'} />
        <SortableTaskList />
      </section>
    </article>
  )
}
