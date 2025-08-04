import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBg4Skcl89HheHNkqC80Cm1bd429j7lUJw",
  authDomain: "whaaa-6f64d.firebaseapp.com",
  databaseURL: "https://whaaa-6f64d-default-rtdb.firebaseio.com",
  projectId: "whaaa-6f64d",
  storageBucket: "whaaa-6f64d.firebasestorage.app",
  messagingSenderId: "828749821160",
  appId: "1:828749821160:web:3b00b5446c8cd1722bc55d",
  measurementId: "G-M45W939MHR"
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

export default app
