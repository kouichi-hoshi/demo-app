'use client'

import { signOut } from '@/login/actions'

export default function SignOutButton() {
  const handleSignOut = () => {
    signOut()
      .then(() => {
        console.log('サインアウトに成功しました')
        // 必要に応じてリダイレクトや状態管理の更新を行います
      })
      .catch((error) => {
        console.error(error.message)
      })
  }

  return (
    <button className='border-2 p-2' onClick={handleSignOut}>
      サインアウト
    </button>
  )
}
