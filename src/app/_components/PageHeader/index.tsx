import React from 'react'

type PageHeaderProps = {
  /** 見出しのタイトル */
  title: string
  /** サブタイトル（オプション） */
  subTitle?: string
  /** 外側のコンテナのクラス名（オプション） */
  outerClassName?: string
  /** タイトルのクラス名（オプション） */
  className?: string
  /** サブタイトルのクラス名（オプション） */
  subTitleClassName?: string
  /** 見出しレベルを指定（オプション） */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
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
      {React.createElement(tag, { className }, title)}
      {subTitle && <p className={subTitleClassName}>{subTitle}</p>}
    </header>
  )
}
