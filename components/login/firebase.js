import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1jP6FmlVggqMzTJb-t8uYN4JFmMko1U8",
  authDomain: "myblog-cc063.firebaseapp.com",
  projectId: "myblog-cc063",
  storageBucket: "myblog-cc063.firebasestorage.app",
  messagingSenderId: "330228350346",
  appId: "1:330228350346:web:d3599fe4316dfd98c05c73",
  measurementId: "G-VJRTR9L2CH",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export let currentUser = null;

async function saveUserToFirebase(user) {
  await set(ref(db, "users/" + user.uid), {
    email: user.email,
    created_at: new Date().toISOString(),
  });
}
