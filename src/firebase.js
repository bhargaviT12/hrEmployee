import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCriUGo1KitxrotnNYKXtL-WvsEly1-Hko",
  authDomain: [],
  projectId: "websiteinternal",
  storageBucket: "websiteinternal.firebasestorage.app",
  messagingSenderId: "981565424313",
  appId: "1:981565424313:android:c51ff2be02eef5f5d39168",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
