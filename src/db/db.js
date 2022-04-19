import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyApsDvD8XcYi_tioNRzi5D-qTRZl581nCs",
    authDomain: "chinvoice-99af2.firebaseapp.com",
    projectId: "chinvoice-99af2",
    storageBucket: "chinvoice-99af2.appspot.com",
    messagingSenderId: "148725458225",
    appId: "1:148725458225:web:1616fc3274e876ee6afc10",
    measurementId: "G-21CLT99MVV",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
