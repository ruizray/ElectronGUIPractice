import firebase from "firebase";

import 'firebase/firestore';
import "firebase/auth";
import "firebase/functions";


const app = firebase.initializeApp({
    apiKey: "AIzaSyAU8YtFNTgL7v37WUW-ElF7VbAw0l-yOHo",
    authDomain: "react-fc0a1.firebaseapp.com",
    projectId: "react-fc0a1"
});

const db = app.firestore();

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.addScope("https://www.googleapis.com/auth/analytics.readonly")
export const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then((res) => {
      console.log(res.user)
    }).catch((error) => {
      console.log(error.message)
    })
  }
export { db, app };

