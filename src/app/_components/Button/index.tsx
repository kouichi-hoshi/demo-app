import React from 'react'

type Props = {
  text: string
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onFocus?: () => void
}

export default function Button({ className, text, onClick, onFocus }: Props) {
  // デフォルトのクラスを定義
  const defaultClass = 'rounded border-2 py-2 px-4'

  // classNameがundefinedの場合はデフォルトクラスを使用、そうでなければclassNameを使用
  const buttonClass = className === undefined ? defaultClass : className
  return (
    <button type='submit' aria-label={text} className={buttonClass} onClick={onClick} onFocus={onFocus}>
      {text}
    </button>
  )
}
