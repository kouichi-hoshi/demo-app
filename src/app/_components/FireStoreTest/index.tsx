'use client'

import { useState, useEffect } from 'react'
import { db } from '@/_lib/firebase'
import { doc, setDoc, getDoc, Firestore } from 'firebase/firestore'

export default function FireStoreTest() {
  const [data, setData] = useState<string>('')
  const docRef = doc(db, 'users', 'user1')

  useEffect(() => {
    const getDb = async () => {
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data())
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!')
      }
    }
    getDb()
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
  return (
    <div className='my-8'>
      <h1>FireStoreTest</h1>
      <p className='my-2'>{data}</p>
      <div>
        <input
          type='text'
          className='my-2 border-2 px-2'
          value={data}
          onChange={(e) => setData(e.target.value)}
        ></input>
      </div>
      <button type='submit' className='button' onClick={() => dbFunc(db)}>
        Write
      </button>
    </div>
  )
}
