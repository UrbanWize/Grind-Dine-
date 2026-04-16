import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDsDa1zWOIr0VnnrjTx0JdpwHMHbp210QA",
  authDomain: "grind-dine.firebaseapp.com",
  projectId: "grind-dine",
  storageBucket: "grind-dine.firebasestorage.app",
  messagingSenderId: "990966883220",
  appId: "1:990966883220:web:a4de09714cf7fc15b82581",
  measurementId: "G-LK9WQ1LK8H"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
