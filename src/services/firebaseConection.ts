import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpkqdqwRqNp-FutuabW8EIvOBijrCVaow",
  authDomain: "tarefas-82a1c.firebaseapp.com",
  projectId: "tarefas-82a1c",
  storageBucket: "tarefas-82a1c.firebasestorage.app",
  messagingSenderId: "737180347064",
  appId: "1:737180347064:web:632d592eeb23e97871a24d"
};

// Initialize Firebase
const firabaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firabaseApp);

export { db };