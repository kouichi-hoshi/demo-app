'use client'

import { useState, useEffect, useRef } from 'react'
import { db } from '@/_lib/firebase'
import { doc, setDoc, Firestore, onSnapshot } from 'firebase/firestore'

export default function FireStoreTest() {
  const [data, setData] = useState<string>('')
  const docRef = doc(db, 'users', 'user1')
  const isFirestoreUpdate = useRef(true) // Firestoreのデータ更新かどうかを追跡する

  useEffect(() => {
    // Firestoreのドキュメントをリアルタイムで監視する
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        // console.log('Document data:', docSnap.data())
        // Firestoreからの更新のときだけdataを更新する
        if (isFirestoreUpdate.current) {
          setData(docSnap.data()?.data || '')
        }
        isFirestoreUpdate.current = true // リスナーでの変更後はtrueに戻す
      } else {
        console.log('No such document!')
      }
    })

    // コンポーネントがアンマウントされた際にリスナーを解除する
    return () => unsubscribe()
  }, [docRef])

  const dbFunc = async (db: Firestore): Promise<void> => {
    try {
      await setDoc(doc(db, 'users', 'user1'), {
        data: data,
      })
      console.log('Document successfully written!')
    } catch (error) {
      console.error('Error writing document: ', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isFirestoreUpdate.current = false // ユーザーが変更しているときはFirestoreのデータを無視
    setData(e.target.value)
  }

  return (
    <div className='my-8'>
      <h1>FireStoreTest</h1>
      <p className='my-2'>{data}</p>
      <div>
        <input
          type='text'
          className='my-2 border-2 px-2'
          value={data}
          onChange={handleChange} // onChangeでhandleChange関数を呼び出す
        />
      </div>
      <button type='submit' className='button' onClick={() => dbFunc(db)}>
        Write
      </button>
    </div>
  )
}
