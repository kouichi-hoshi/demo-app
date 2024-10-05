import Link from 'next/link'
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
        <div>
          <section className='my-8'>
            <h2 className='mb-2 text-2xl'>このアプリについて</h2>
            <p className='mb-4'>
              シンプルなToDoアプリです。
              <br />
              タスクの追加、編集、削除など一般的なToDoアプリと同様にご利用できます。
            </p>
            <p className='mb-4'>
              PC、タブレット、スマートフォンに対応しています。
              <br />
              ドラッグ&ドロップでタスクの順番を変更できます。
              <br />
              登録したタスクはデータベースに保存され、異なるデバイス間で同期して利用可能です。
            </p>
          </section>
          <section className='my-8'>
            <h2 className='mb-2 text-2xl'>ご利用方法</h2>
            <p className='mb-4'>
              画面右上の「Googleでログイン」ボタンをクリック/タップしてログインすると利用可能になります。
              <br />
              ログインするとGoogleアカウントに登録されているアカウントの画像と名前が表示されます。
            </p>
          </section>
          <section className='my-8'>
            <h2 className='mb-2 text-2xl'>ログアウトと接続解除</h2>
            <p className='mb-4'>
              ログアウトボタンが表示されているときは、そのボタンをクリック/タップするとログアウトできます。
            </p>
            <p className='mb-4'>
              アプリとの接続を解除する場合はGoogleアカウントの
              <Link href='https://myaccount.google.com/security' target='_blank' className='underline'>
                セキュリティページ
              </Link>
              で解除してください。
            </p>
          </section>
          <section className='my-8'>
            <h2 className='mb-2 text-2xl'>データの削除について</h2>
            <p className='mb-4'>
              アプリと接続を解除しても、登録したタスクの情報はデータベースから削除されません。
              <br />
              データを完全に削除したい場合は、削除ボタンをクリック/タップして削除してください。
            </p>
          </section>
        </div>
      </section>
    </article>
  )
}
