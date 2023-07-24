import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCD8KzTX6UAnTUqnDVGbuVbg8FLD6uE4M4",
  authDomain: "netflix-ui-c4999.firebaseapp.com",
  projectId: "netflix-ui-c4999",
  storageBucket: "netflix-ui-c4999.appspot.com",
  messagingSenderId: "207824950386",
  appId: "1:207824950386:web:e813a3928cb182e7eadeeb",
  measurementId: "G-VS2D7J4PSZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
