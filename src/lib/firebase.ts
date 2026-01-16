import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQ8Y4RYltIkzbNj0ZU6DQWN09D-5214sA",
    authDomain: "manabiya-mom.firebaseapp.com",
    projectId: "manabiya-mom",
    storageBucket: "manabiya-mom.firebasestorage.app",
    messagingSenderId: "1060153625193",
    appId: "1:1060153625193:web:8e8bc2e1d022f92cd470f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
