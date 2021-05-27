import firebase from 'firebase'
import "firebase"


const firebaseAppConfig = {
    apiKey: 'AIzaSyAU8YtFNTgL7v37WUW-ElF7VbAw0l-yOHo',
    authDomain: 'react-fc0a1.firebaseapp.com',
    projectId: 'react-fc0a1',
    storageBucket: 'react-fc0a1.appspot.com',
    messagingSenderId: '525500981240',
    appId: '1:525500981240:web:84fd11f72cf7793833000d',
    measurementId: 'G-HLM64JSND8'
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseAppConfig)
};

export const auth = firebase.auth()
export const firestore = firebase.firestore()