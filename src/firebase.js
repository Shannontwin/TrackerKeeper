// src/firebase.js
        import { initializeApp } from 'firebase/app';
        import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

        const firebaseConfig = {
  apiKey: "AIzaSyD2PbAu3KYJHeqUdoCujmbzG5rcUMH0pys",
  authDomain: "trackerkeeper-app.firebaseapp.com",
  projectId: "trackerkeeper-app",
  storageBucket: "trackerkeeper-app.firebasestorage.app",
  messagingSenderId: "1066028973792",
  appId: "1:1066028973792:web:eacdab5776d72b2bab1a85",
  measurementId: "G-ELXBVQ2MVY"
        };

        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        export const db = getFirestore(app);



