import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Initialize Firebase
const firabaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firabaseApp);

export { db };
