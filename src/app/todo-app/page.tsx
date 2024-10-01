import PageHeader from '@/_components/PageHeader'
import SortableTaskList from '@/_components/SortableTaskList'

const metaInitial = {
  title: 'ToDoアプリ',
  description:
    'シンプルなToDoアプリです。ドラッグ&ドロップでタスクの順番を変更できます。PC、タブレット、スマートフォンに対応しています。',
  canonical: 'todo-app',
}

const { title, description, canonical } = metaInitial

export const metadata = {
  title,
  description,
  alternates: {
    canonical,
  },
}

export default function Home() {
  return (
    <article className='baseContainer'>
      <section>
        <PageHeader title={title} />
        <SortableTaskList />
      </section>
    </article>
  )
}
