// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBJZDD8UVIyu2Usvjfnbo6QBIsOmcZHSHQ",
    authDomain: "tool-pa.firebaseapp.com",
    databaseURL: "https://tool-pa-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tool-pa",
    storageBucket: "tool-pa.appspot.com",
    messagingSenderId: "897458545147",
    appId: "1:897458545147:web:7a5bd5af143c232ed92b5e",
    measurementId: "G-3BHDP2QSC3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db }