import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASgUkJKYsJdCt5J5GlDNhlD5LvEKN670M",
  authDomain: "letter-app-b44d7.firebaseapp.com",
  projectId: "letter-app-b44d7",
  storageBucket: "letter-app-b44d7.firebasestorage.app",
  messagingSenderId: "814655364478",
  appId: "1:814655364478:web:556389f8c4c1e3117c672f",
};

// Debugging: Check if Firebase is initialized correctly
console.log("Firebase API Key:", firebaseConfig.apiKey);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
