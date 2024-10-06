import Link from 'next/link'
import { SITE_META } from '@/_constants/constants'
import PageHeader from '@/_components/PageHeader'
import SortableTaskList from '@/_components/SortableTaskList'

const masterSiteUrl = SITE_META.masterSiteUrl
const masterSiteTitle = SITE_META.masterSiteTitle
const isAppRunning = true // アプリを非表示にするにはfalseに変更

const metaInitial = {
  title: 'ToDoアプリ',
  description:
    'アプリ開発の練習のために制作したシンプルなToDoアプリです。ドラッグ&ドロップでタスクの順番を変更できます。PC、タブレット、スマートフォンに対応しています。',
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
        <PageHeader
          title={title}
          subTitle={'ベータ版'}
          outerClassName={'my-8 flex flex-wrap gap-2 items-center md:my-12'}
          subTitleClassName={'inline-block rounded bg-neutral-500 px-4 py-1 text-sm text-white'}
        />
        {/* アプリの利用可否を制御する条件分岐 */}
        {!isAppRunning ? (
          <p>このアプリは現在メンテナンス中のためご利用いただけません。</p>
        ) : (
          <>
            <SortableTaskList />
            <aside className='my-16'>
              <details className='mx-auto md:w-9/12 lg:w-6/12'>
                <summary className='my-12 text-center underline hover:cursor-pointer'>このアプリについて</summary>
                <section>
                  <header className='my-12'>
                    <h3 className='text-center text-3xl'>このアプリについて</h3>
                  </header>
                  <section className='my-12'>
                    <h4 className='mb-2 text-2xl'>概要</h4>
                    <p className='mb-4'>
                      アプリ開発の学習のために制作した、シンプルなToDoアプリです。タスクの追加、編集、削除など一般的なToDoアプリの機能を実装しています。
                      <br />
                      どなたでも無料でお試しいただけますが、ベータ版のため予告なくサービスを終了する場合があります。
                    </p>
                    <ul className='mb-4 ml-4'>
                      <li className='list-disc'>PC、タブレット、スマートフォンに対応しています。</li>
                      <li className='list-disc'>PCのキーボード操作に対応しています。</li>
                      <li className='list-disc'>ドラッグ&ドロップでタスクの順番を変更できます。</li>
                      <li className='list-disc'>
                        登録したタスクはデータベースに保存され、異なるデバイス間で同期して利用可能です。
                      </li>
                    </ul>
                  </section>
                  <section className='my-12'>
                    <h4 className='mb-2 text-2xl'>ご利用方法</h4>
                    <p className='mb-4'>
                      アプリにログインすると、ご利用が可能になります。画面右上の「Googleでログイン」ボタンをクリック/タップしてログインすると、ログイン画面が開きます。
                      画面の指示に従ってログインしてください。
                    </p>
                  </section>
                  <section className='my-12'>
                    <h4 className='mb-2 text-2xl'>ログアウトと接続解除</h4>
                    <p>ログアウトボタンが表示されているときは、そのボタンをクリック/タップするとログアウトできます。</p>
                    <p>
                      アプリとの接続を解除する場合はGoogleアカウントの
                      <Link href='https://myaccount.google.com/security' target='_blank'>
                        セキュリティページ
                      </Link>
                      で当アプリ（<strong>demo-app</strong>）を解除してください。
                    </p>
                  </section>
                  <section className='my-12'>
                    <h4 className='mb-2 text-2xl'>データの削除について</h4>
                    <p className='mb-4'>
                      アプリと接続を解除しても、登録したタスクの情報はデータベースから削除されません。
                      <br />
                      タスクのデータを完全に削除したい場合は、ログイン中にタスクの削除ボタンをクリック/タップして削除してください。
                      <br />
                      接続解除後に再接続も可能です。
                    </p>
                  </section>
                  <section className='my-12'>
                    <h4 className='mb-2 text-2xl'>開発者について</h4>
                    <p className='mb-4'>
                      このアプリは{masterSiteTitle}が作成しました。
                      <br />
                      開発者のサイトは以下のURLからご覧いただけます。
                      <br />
                      <Link href={masterSiteUrl} target='_blank'>
                        {masterSiteUrl}
                      </Link>
                    </p>
                  </section>
                  <section className='my-12'>
                    <h4 className='mb-2 text-2xl'>免責事項</h4>
                    <p className='mb-4'>
                      このアプリを利用することによって生じた、いかなる直接的または間接的な損害、損失、逸失利益等について、当方は一切の責任を負いません。
                      <br />
                      また、当方はこのアプリにおける正確性や完全性、特定の目的への適合性を保証しません。
                      <br />
                    </p>
                    <p>
                      このアプリは予告なく変更・削除される場合があります。アプリの利用に際しては、すべて利用者の責任において行われるものとします。
                    </p>
                  </section>
                  <p>個人情報の特定につながる内容は入力を控えてください。</p>
                </section>
              </details>
            </aside>
          </>
        )}
      </section>
    </article>
  )
}
