import { useContext } from 'react'
import Image from 'next/image'
import { FirebaseContext } from '@/_provider/FirebaseProvider'
import { useAuthStateListener } from '@/_provider/FirebaseProvider'
import { Auth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import Button from '@/_components/Button'

export default function FirebaseLogIn() {
  const auth = useContext<Auth | null>(FirebaseContext)
  const provider = new GoogleAuthProvider()
  const currentUser = useAuthStateListener() // ログイン状態を監視する

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
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        if (credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = credential.accessToken
          // The signed-in user info.
          const user = result.user
          // IdP data available using getAdditionalUserInfo(result)
          console.log(`Signed in as ${user.displayName} with token: ${token}`)
        } else {
          console.log('No credentials returned from the provider.')
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
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
        <div className='flex flex-col items-center gap-4'>
          {currentUser?.photoURL && (
            <p>
              <Image
                src={currentUser.photoURL}
                alt={currentUser?.displayName || ''}
                className='rounded-full'
                width='96'
                height='96'
              />
            </p>
          )}
          {currentUser?.displayName && <p>{currentUser?.displayName}</p>}
          <Button className='w-28' onClick={signOut} text={'ログアウト'} />
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
