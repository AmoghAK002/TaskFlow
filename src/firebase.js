import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzBTrR-pfHA782G1Hf0oNE_evVtVKjkR8",
  authDomain: "taskflowai-ad777.firebaseapp.com",
  projectId: "taskflowai-ad777",
  storageBucket: "taskflowai-ad777.firebasestorage.app",
  messagingSenderId: "239007011228",
  appId: "1:239007011228:web:b161c4219005bb873e7859",
  measurementId: "G-GBQK8XNP7Z"
};

const app = initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();