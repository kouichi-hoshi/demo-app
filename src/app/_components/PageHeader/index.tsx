import React from 'react'

type PageHeaderProps = {
  title: string
  outerClassName?: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' // 見出しレベルを指定
}

export default function PageHeader({
  title,
  outerClassName = 'my-8',
  className = 'text-4xl',
  tag = 'h1',
}: PageHeaderProps) {
  return <header className={outerClassName}>{React.createElement(tag, { className } ?? '', title)}</header>
}
