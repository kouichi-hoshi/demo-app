import React from 'react'

type PageHeaderProps = {
  title: string
  subTitle?: string
  outerClassName?: string
  className?: string
  subTitleClassName?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' // 見出しレベルを指定
}

export default function PageHeader({
  title,
  subTitle,
  outerClassName = 'my-8 md:my-12',
  className = 'text-4xl',
  subTitleClassName = '',
  tag = 'h1',
}: PageHeaderProps) {
  return (
    <header className={outerClassName}>
      {React.createElement(tag, { className } ?? '', title)}
      {subTitle && <p className={subTitleClassName}>{subTitle}</p>}
    </header>
  )
}
