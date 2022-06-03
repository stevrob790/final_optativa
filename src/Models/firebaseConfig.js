// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';  

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDA13P-PmhCSKFVewCDGqHngG8C2Rx4OWw",
    authDomain: "futbol-65f4d.firebaseapp.com",
    projectId: "futbol-65f4d",
    storageBucket: "futbol-65f4d.appspot.com",
    messagingSenderId: "543994626176",
    appId: "1:543994626176:web:b9f495fa3dfc4af596a665"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
