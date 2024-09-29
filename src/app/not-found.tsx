import Link from 'next/link'
import PageHeader from '@/_components/PageHeader'

export default function NotFound() {
  return (
    <article className='baseContainer'>
      <PageHeader title={'ページが見つかりませんでした'} outerClassName={'text-center my-12'} />
      <div className='container mx-auto text-center'>
        <h2 className='my-6'>404 Page not found</h2>
        <p className='my-6'>
          あなたがアクセスしようとしたページは存在しません。
          <br />
          URLを再度ご確認ください。
        </p>
        <p>
          <Link href='/' className='underline'>
            Home
          </Link>
        </p>
      </div>
    </article>
  )
}
