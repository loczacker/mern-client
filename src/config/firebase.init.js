// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKZ_hvXCGi3jCusX_3YsCNdcBys8jGG4Q",
  authDomain: "book-mern-stack.firebaseapp.com",
  projectId: "book-mern-stack",
  storageBucket: "book-mern-stack.appspot.com",
  messagingSenderId: "1056822241936",
  appId: "1:1056822241936:web:9550e323bf2172560a4615",
  measurementId: "G-GQGQR253HR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);