// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCysUvelh9fAUUZHfogAM84es2UojyViMg",
  authDomain: "dashboard-25a9a.firebaseapp.com",
  databaseURL: "https://dashboard-25a9a-default-rtdb.firebaseio.com",
  projectId: "dashboard-25a9a",
  storageBucket: "dashboard-25a9a.appspot.com",
  messagingSenderId: "278086436788",
  appId: "1:278086436788:web:528eff405705f92fab54e1",
  measurementId: "G-D3PL9TZVCY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);