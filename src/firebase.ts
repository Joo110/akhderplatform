import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4gBthJTjI_078Zm3mm0Kc1R_NKABGQqw",
  authDomain: "akhdarplatform-e705e.firebaseapp.com",
  projectId: "akhdarplatform-e705e",
  storageBucket: "akhdarplatform-e705e.firebasestorage.app",
  messagingSenderId: "375939161880",
  appId: "1:375939161880:web:b36201f941d70d493e086d",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);