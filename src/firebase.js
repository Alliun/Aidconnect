import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCle4k40R8iIndJhscvNf3FbpAA3AXAQaM",
  authDomain: "iota-ngo-667ec.firebaseapp.com",
  projectId: "iota-ngo-667ec",
  storageBucket: "iota-ngo-667ec.firebasestorage.app",
  messagingSenderId: "317601984303",
  appId: "1:317601984303:web:3bd9d3df823f379c407bda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
