// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkI4ML-RwWjlqcTbYerP6ziJyTWzAOjWM",
  authDomain: "react-subin.firebaseapp.com",
  projectId: "react-subin",
  storageBucket: "react-subin.appspot.com",
  messagingSenderId: "370295924196",
  appId: "1:370295924196:web:4ca9feec2e07d3b5aed3f1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
