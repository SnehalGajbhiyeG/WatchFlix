// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCVYwZy6rVCAfhIbc9ITd07zk0nKhuBzCc",
    authDomain: "watchflix-6dfc6.firebaseapp.com",
    projectId: "watchflix-6dfc6",
    storageBucket: "watchflix-6dfc6.appspot.com",
    messagingSenderId: "40698838134",
    appId: "1:40698838134:web:a32e71714eeea962e8f357",
    measurementId: "G-7FZWFTTHPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 

export const auth = getAuth();