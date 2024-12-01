import PageHeader from '@/_components/PageHeader'

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
// json placeholder test
function jsonPlaceholderTest1() {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => response.json())
    .then((json) => console.log(json))
}
jsonPlaceholderTest1()

function jsonPlaceholderTest2() {
  fetch('https://jsonplaceholder.typicode.com/todos/2')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTPエラー: ${response.status}`)
      }
      return response.json()
    })
    .then((json) => console.log(json))
    .catch((error) => {
      console.error('Fetchエラー:', error)
    })
}
jsonPlaceholderTest2()

function jsonPlaceholderTest3() {
  const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/3',
  ]

  const fetchPromises = urls.map((url) => fetch(url).then((response) => response.json()))

  Promise.all(fetchPromises)
    .then((results) => {
      results.forEach((result, index) => {
        console.log(`Response from URL ${index + 1}:`, result)
      })
    })
    .catch((error) => {
      console.error('Error fetching resources:', error)
    })
}

jsonPlaceholderTest3()

async function jsonPlaceholderTest4(): Promise<void> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/4')
  const json = await response.json()
  console.log(json)
}
jsonPlaceholderTest4()

async function jsonPlaceholderTest5() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/5')
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`)
    }
    const json = await response.json()
    console.log(json)
  } catch (error) {
    console.error('Fetchエラー:', error)
  }
}

jsonPlaceholderTest5()

async function jsonPlaceholderTest6() {
  const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/3',
  ]

  try {
    const fetchPromises = urls.map(async (url) => {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTPエラー: ${response.status}`)
      }
      return response.json()
    })

    const results = await Promise.all(fetchPromises)
    results.forEach((result, index) => {
      console.log(`データ ${index + 1}:`, result)
    })
  } catch (error) {
    console.error('Fetchエラー:', error)
  }
}

jsonPlaceholderTest6()

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
