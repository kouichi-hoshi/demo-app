import PageHeader from '@/_components/PageHeader'
// import { SITE_META } from '@/_constants/constants'

// const masterSiteUrl = SITE_META.masterSiteUrl
// const masterSiteTitle = SITE_META.masterSiteTitle

const metaInitial = {
  title: 'データフェッチテスト',
  description: 'Next.jsでデータフェッチする実装をテスト・検証するページです。',
  canonical: 'data-fetch-practice',
}

const { title, description, canonical } = metaInitial

export const metadata = {
  title,
  description,
  alternates: {
    canonical,
  },
}

export default function DataFetchPractice() {
  return (
    <article className='baseContainer'>
      <PageHeader
        title={title}
        outerClassName={'my-8 flex flex-wrap gap-2 items-center md:my-12'}
        subTitleClassName={'inline-block rounded bg-neutral-500 px-4 py-1 text-sm text-white'}
      />
    </article>
  )
}
