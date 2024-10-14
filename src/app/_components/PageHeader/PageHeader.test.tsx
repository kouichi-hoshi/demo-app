import { render, screen } from '@testing-library/react'
import PageHeader from '../PageHeader'

describe('PageHeader コンポーネント', () => {
  test('デフォルトのタグ h1 でタイトルが正しくレンダリングされる', () => {
    render(<PageHeader title='Test Title' />)
    const titleElement = screen.getByRole('heading', { name: /test title/i })
    expect(titleElement).toBeInTheDocument()
    expect(titleElement.tagName).toBe('H1')
  })

  test('指定されたタグでタイトルがレンダリングされる', () => {
    render(<PageHeader title='Test Title' tag='h3' />)
    const titleElement = screen.getByRole('heading', { name: /test title/i })
    expect(titleElement).toBeInTheDocument()
    expect(titleElement.tagName).toBe('H3')
  })

  test('サブタイトルが提供された場合にレンダリングされる', () => {
    render(<PageHeader title='Test Title' subTitle='Test Subtitle' />)
    const subTitleElement = screen.getByText(/test subtitle/i)
    expect(subTitleElement).toBeInTheDocument()
  })

  test('サブタイトルが提供されていない場合にはレンダリングされない', () => {
    render(<PageHeader title='Test Title' />)
    const subTitleElement = screen.queryByText(/test subtitle/i)
    expect(subTitleElement).not.toBeInTheDocument()
  })

  test('正しいクラス名が適用される', () => {
    render(
      <PageHeader
        title='Test Title'
        subTitle='Test Subtitle'
        outerClassName='outer-class'
        className='text-base'
        subTitleClassName='subtitle-class'
      />
    )
    const headerElement = screen.getByRole('heading', { name: /test title/i })
    const subTitleElement = screen.getByText(/test subtitle/i)

    expect(headerElement).toHaveClass('text-base')
    expect(subTitleElement).toHaveClass('subtitle-class')
    expect(headerElement.parentElement).toHaveClass('outer-class')
  })
})
