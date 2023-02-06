import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD295CB6b4NV6-TEFjZfC4hH5Uc4XDvq4A",
  authDomain: "oz-react.firebaseapp.com",
  projectId: "oz-react",
  storageBucket: "oz-react.appspot.com",
  messagingSenderId: "997803947268",
  appId: "1:997803947268:web:f7150ef6f8d26fe9a7cc51",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const dbFirestore = getFirestore(app);
