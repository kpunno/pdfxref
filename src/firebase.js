// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup,
    signOut,
    onAuthStateChanged 
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMj13sS8WjqJdIvUSLBfHov19r2DXhLGI",
  authDomain: "pdfxref.firebaseapp.com",
  projectId: "pdfxref",
  storageBucket: "pdfxref.firebasestorage.app",
  messagingSenderId: "820330861874",
  appId: "1:820330861874:web:60bb163206e66257bbb32b",
  measurementId: "G-WS4S2QE4GC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider;


// onAuthStateChanged() is a callback action when user signs in / out
export { 
    auth,
    provider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
}