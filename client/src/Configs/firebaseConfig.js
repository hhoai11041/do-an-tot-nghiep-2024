import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAtwTQ_TYHpvYYkVRa4aNpjRpy2LVjXjdg",
  authDomain: "nodejsreactjsstoreimage.firebaseapp.com",
  projectId: "nodejsreactjsstoreimage",
  storageBucket: "nodejsreactjsstoreimage.appspot.com",
  messagingSenderId: "938529563248",
  appId: "1:938529563248:web:b46a591a72514daed38ab5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
