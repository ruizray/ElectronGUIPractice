import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAU8YtFNTgL7v37WUW-ElF7VbAw0l-yOHo",
    authDomain: "react-fc0a1.firebaseapp.com",
    projectId: "react-fc0a1"
});

const db = firebaseApp.firestore();

export { db };
