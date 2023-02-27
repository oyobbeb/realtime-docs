import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQQt9sa3OXmqwO0OvfPgJlB7hz4RUuR0c",
  authDomain: "react-docs-app.firebaseapp.com",
  projectId: "react-docs-app",
  storageBucket: "react-docs-app.appspot.com",
  messagingSenderId: "577223001100",
  appId: "1:577223001100:web:2fb9744405ae34513b9a29"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
