import Image from 'next/image'
import { useAuth } from '@/_provider/FirebaseProvider'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import Button from '@/_components/Button'

export default function FirebaseLogIn() {
  const provider = new GoogleAuthProvider()
  const { auth, currentUser } = useAuth()

  const signIn = () => {
    if (!auth) {
      console.error('Firebase Auth is not initialized')
      return
    }

    // ログイン時にアカウント選択ダイアログを表示する
    provider.setCustomParameters({
      prompt: 'select_account',
    })

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        if (credential) {
          //TODO:不要なコードを後で削除する
          //const token = credential.accessToken
          const user = result.user
          console.log('ログインしました', user.displayName)
        }
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.customData.email
        const credential = GoogleAuthProvider.credentialFromError(error)

        //TODO: エラー処理を追加する
        console.log(errorCode, errorMessage, email, credential)
      })
  }

  const signOut = () => {
    if (!auth) {
      console.error('Firebase Auth is not initialized')
      return
    }

    auth
      .signOut()
      .then(() => {
        console.log('ログアウトしました')
        location.reload()
      })
      .catch((error) => {
        console.error(`ログアウト時にエラーが発生しました: ${error}`)
      })
  }

  return (
    <>
      {/* TODO: ユーザー情報（'currentUser'、'displayName'、'photoURL'）のスタブを作ってテストする */}
      {currentUser ? (
        <div className='flex items-center gap-4'>
          {currentUser?.displayName && <p>{currentUser?.displayName}</p>}
          {currentUser?.photoURL && (
            <p>
              <Image
                src={currentUser.photoURL}
                alt={currentUser?.displayName || ''}
                className='rounded-full'
                width='32'
                height='32'
              />
            </p>
          )}
          <Button className='button' onClick={signOut} text={'ログアウト'} />
        </div>
      ) : (
        <button className='button flex items-center gap-2' onClick={signIn}>
          <Image src='/images/icon-google.png' alt='Googleでログイン' width='20' height='20' />
          Googleでログイン
        </button>
      )}
    </>
  )
}
