import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzFVwtx9J8qkjo9pUQv6LDPeS0lV5p1Oo",
  authDomain: "whatsappwithreact-eb803.firebaseapp.com",
  projectId: "whatsappwithreact-eb803",
  storageBucket: "whatsappwithreact-eb803.appspot.com",
  messagingSenderId: "415672905604",
  appId: "1:415672905604:web:487796c8827675010a77d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db;