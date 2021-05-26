import React, { useRef } from 'react';
import { Card, Button, Form } from 'react-bootstrap'


import firebase from 'firebase';
import "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollectionData } from 'react-firebase-hooks/firestore'




firebase.initializeApp({
    apiKey: "AIzaSyAU8YtFNTgL7v37WUW-ElF7VbAw0l-yOHo",
    authDomain: "react-fc0a1.firebaseapp.com",
    projectId: "react-fc0a1",
    storageBucket: "react-fc0a1.appspot.com",
    messagingSenderId: "525500981240",
    appId: "1:525500981240:web:84fd11f72cf7793833000d",
    measurementId: "G-HLM64JSND8"
})

const Signup = () => {


    const auth = firebase.auth()

    const firestore = firebase.firestore();
    const [user] = useAuthState(auth)
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider
        auth.signInWithPopup(provider)
    }

    return (<React.Fragment>
        <button onClick={signInWithGoogle}> Sign in with google</button>
    </React.Fragment>);
}


export default Signup;

