// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage
import { getDatabase } from "firebase/database"; // Import Firebase Realtime Database

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZcbnOjWAPW_OCFUlQ9JjpVzvbWycpOAo",
  authDomain: "nextgennodes-d184b.firebaseapp.com",
  projectId: "nextgennodes-d184b",
  storageBucket: "nextgennodes-d184b.appspot.com", // Corrected for Firebase Storage
  messagingSenderId: "588671439534",
  appId: "1:588671439534:web:a4a5d46e3889f6bf82933f",
  databaseURL: "https://nextgennodes-d184b-default-rtdb.firebaseio.com", // Add Realtime Database URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Initialize Firebase Storage
export const realtimeDb = getDatabase(app); // Initialize Firebase Realtime Database
