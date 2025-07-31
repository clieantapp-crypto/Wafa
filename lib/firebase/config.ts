import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDJ-0cptQFiTZNKOD3YrHmHIjVN9Rk1jSs",
  authDomain: "clinte-25027.firebaseapp.com",
  databaseURL: "https://clinte-25027-default-rtdb.firebaseio.com",
  projectId: "clinte-25027",
  storageBucket: "clinte-25027.firebasestorage.app",
  messagingSenderId: "164388154350",
  appId: "1:164388154350:web:33d2bc724edfe4e0dc3cff",
  measurementId: "G-XJVRTMJHEV"
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

export default app
