// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpGqA2RkkF84Zb-GIZFEKAmh9cKUCfFeY",
  authDomain: "gharkharch-2b899.firebaseapp.com",
  databaseURL: "https://gharkharch-2b899-default-rtdb.firebaseio.com",
  projectId: "gharkharch-2b899",
  storageBucket: "gharkharch-2b899.firebasestorage.app",
  messagingSenderId: "119424327039",
  appId: "1:119424327039:web:e3e99ab6e47110dd9fce4a",
  measurementId: "G-PZVERLEWLL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
//const analytics = getAnalytics(app);