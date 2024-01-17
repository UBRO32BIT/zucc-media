// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPk_KKa4UYaU4nQ6i0hlPqzha6Oidr_JI",
  authDomain: "zucc-media.firebaseapp.com",
  projectId: "zucc-media",
  storageBucket: "zucc-media.appspot.com",
  messagingSenderId: "719888831090",
  appId: "1:719888831090:web:af669e1ad7963efbc6e8eb",
  measurementId: "G-FC8XPXM95S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);