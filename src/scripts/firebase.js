import firebase from 'firebase'

const firebaseAppConfig = {
    apiKey: 'AIzaSyAU8YtFNTgL7v37WUW-ElF7VbAw0l-yOHo',
    authDomain: 'react-fc0a1.firebaseapp.com',
    projectId: 'react-fc0a1',
    storageBucket: 'react-fc0a1.appspot.com',
    messagingSenderId: '525500981240',
    appId: '1:525500981240:web:84fd11f72cf7793833000d',
    measurementId: 'G-HLM64JSND8'
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseAppConfig)
}

export const auth = firebase.auth()
export const twitterProvider = new firebase.auth.TwitterAuthProvider()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const firestore = firebase.firestore()

export function linkTwitter() {
    firebase
        .auth()
        .currentUser.linkWithPopup(twitterProvider)
        .then(result => {
        })
        .catch(error => {
            alert(error)
        })
}

export function linkGoogle() {
    firebase
        .auth()
        .currentUser.linkWithPopup(googleProvider)
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            alert(error)
        })
}

export function getProviderPhoto(provider) {
    var user = firebase.auth().currentUser
    var newPhoto;
    if (provider.providerId === "twitter.com") {

        console.log(provider.photoURL.replace('_normal.jpg', '_400x400.jpg'))
        newPhoto = provider.photoURL.replace('_normal.jpg', '_400x400.jpg');
    }
    user
        .updateProfile({ photoURL: (newPhoto || provider.photoURL) })
        .then(function () {
            alert("Successfully changed profile picture")
        })
        .catch(function (error) {
            console.log(error)
        })
}

export function getProviderData(provider) {
    var user = firebase.auth().currentUser
    var index = user.providerData.findIndex(e => e.providerId === provider)
    if (index === -1) {
        return -1
    }
    return user.providerData[index]
}

export function enablePersistence() {
    firebase.firestore().enablePersistence()
        .catch((err) => {
            if (err.code === 'failed-precondition') {
                console.log(err.code)
            } else if (err.code === 'unimplemented') {
                console.log(err.code)
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
            }
        });
}

export function doesUserExist(userID, key, value) {
    var userDBRef = firestore.collection("users").doc(userID);
    var item = new Map()
    item.set(key, value)
    userDBRef.set({
        item
    }, { merge: true }).then(

    )

}
