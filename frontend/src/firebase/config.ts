// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuU6FdWRCFTxHL-Rl-6NkiE7HPb3BvFUo",
  authDomain: "blog-fcb54.firebaseapp.com",
  projectId: "blog-fcb54",
  storageBucket: "blog-fcb54.appspot.com",
  messagingSenderId: "721132102333",
  appId: "1:721132102333:web:b586a522febe55276fcdd4",
  measurementId: "G-D4RLXCNML5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics };
