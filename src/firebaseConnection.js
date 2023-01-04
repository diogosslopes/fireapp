import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBfOfgjPsufghLodWouJYvTteazL8yQAx8",
    authDomain: "curso-5d7b4.firebaseapp.com",
    projectId: "curso-5d7b4",
    storageBucket: "curso-5d7b4.appspot.com",
    messagingSenderId: "891114444950",
    appId: "1:891114444950:web:e6c540d10f99f210f38ab7",
    measurementId: "G-G2TR63XJLD"
  };

  const firebaseApp = initializeApp(firebaseConfig)
  const db = getFirestore(firebaseApp)
  const auth = getAuth(firebaseApp)

  export { db, auth }