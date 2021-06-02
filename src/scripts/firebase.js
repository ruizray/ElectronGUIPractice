import firebase from "firebase";
import "firebase/storage"
const firebaseAppConfig = {
	apiKey: "AIzaSyAU8YtFNTgL7v37WUW-ElF7VbAw0l-yOHo",
	authDomain: "react-fc0a1.firebaseapp.com",
	projectId: "react-fc0a1",
	storageBucket: "react-fc0a1.appspot.com",
	messagingSenderId: "525500981240",
	appId: "1:525500981240:web:84fd11f72cf7793833000d",
	measurementId: "G-HLM64JSND8",
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseAppConfig);
}
console.log("firebase script called");

export var auth = firebase.auth();
var storageRef = firebase.storage().ref()
export var twitterProvider = new firebase.auth.TwitterAuthProvider();
export var googleProvider = new firebase.auth.GoogleAuthProvider();
export var githubProvider = new firebase.auth.GithubAuthProvider();
githubProvider.addScope("repo");
export var firestore = firebase.firestore();

export function linkTwitter() {
	var uid = auth.currentUser.uid;
	firebase
		.auth()
		.currentUser.linkWithPopup(twitterProvider)
		.then((result) => {
			console.log(result);
			var newPhoto = result.additionalUserInfo.profile.profile_image_url.replace("_normal.jpg", "_400x400.jpg");
			var obj = {
				socials: {
					twitter: {
						username: "@" + result.additionalUserInfo.username,
						followersCount: result.additionalUserInfo.profile.followers_count,
						profileBanner: result.additionalUserInfo.profile.profile_banner_url,
						profilePhoto: newPhoto,
						bio: result.additionalUserInfo.profile.description,
					},
				},
			};
			firestore.collection("users").doc(uid).set(obj, { merge: true });
		})
		.catch((error) => {
			alert(error);
		});
}

export function linkGithub() {
	var uid = auth.currentUser.uid;
	firebase
		.auth()
		.currentUser.linkWithPopup(githubProvider)
		.then((result) => {
			console.log(result);

			var obj = {
				socials: {
					github: {
						username: "@" + result.additionalUserInfo.username,
						profilePhoto: result.additionalUserInfo.profile.avatar_url,
						bio: result.additionalUserInfo.profile.bio,
						html_url: result.additionalUserInfo.profile.html_url,
					},
				},
			};
			firestore.collection("users").doc(uid).set(obj, { merge: true });
		})
		.catch((error) => {
			alert(error);
		});
}

export function linkGoogle() {
	var uid = auth.currentUser.uid;
	firebase
		.auth()
		.currentUser.linkWithPopup(googleProvider)
		.then((result) => {
			var obj = {
				socials: {
					google: {
						email: result.additionalUserInfo.profile.email,
						profilePhoto: result.additionalUserInfo.profile.picture,
						firstName: result.additionalUserInfo.profile.given_name,
						lastName: result.additionalUserInfo.profile.family_name,
					},
				},
			};
			firestore.collection("users").doc(uid).set(obj, { merge: true });
		})
		.catch((error) => {
			alert(error);
		});
}

export function getProviderPhoto(newPhoto) {
	var user = firebase.auth().currentUser;

	console.log(newPhoto);
	user.updateProfile({ photoURL: newPhoto } || { photoURL: user.photoURL })
		.then(function () {
			firestore.collection("users").doc(user.uid).set({ profilePhoto: newPhoto }, { merge: true });
			alert("Successfully changed profile picture");
		})
		.catch(function (error) {
			console.log(error);
		});
}

export function enablePersistence() {
	firebase
		.firestore()
		.enablePersistence()
		.catch((err) => {
			if (err.code === "failed-precondition") {
				console.log(err.code);
			} else if (err.code === "unimplemented") {
				console.log(err.code);
				// The current browser does not support all of the
				// features required to enable persistence
				// ...
			}
		});
}

export function unlinkProvider(provider) {
	firebase
		.auth()
		.currentUser.unlink(provider)
		.then(() => {
			alert(provider + "Successfully unlinked");
		})
		.catch((error) => {
			alert(error);
		});
}

export function updateUserData(data) {
	const user = auth.currentUser;
	const uid = user.uid;
	const userRef = firestore.collection("users").doc(uid);
	const { username, email, firstname, lastname } = data;
	console.log(data);

	user.updateProfile({
		displayName: username,
	})
		.then(function () {
			var obj = {
				firstName: firstname,
				lastName: lastname,
				userName: username,
				email: email,
			};
			userRef.set(obj, { merge: true });
		})
		.catch(function (error) {
			// An error happened.
		});
}

export function signInWithGoogle() {
	auth.signInWithPopup(googleProvider)
		.then((result) => {
			var uid = result.user.uid;
			console.log(uid, result);
			var obj = {
				socials: {
					google: {
						email: result.additionalUserInfo.profile.email,
						profilePhoto: result.additionalUserInfo.profile.picture || "",
						firstName: result.additionalUserInfo.profile.given_name || "",
						lastName: result.additionalUserInfo.profile.family_name || "",
					},
				},
			};
			console.log(obj);
			firestore.collection("users").doc(uid).set(obj, { merge: true });
		})
		.catch((error) => {
			alert(error);
		});
}

export function signInWithEmailPassword(email, password) {
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((userCredential) => {})
		.catch((error) => {
			alert(error);
		});
}

export function signUpWithEmailPassword(data) {
	const { email, firstName, lastName, username, password } = data;
	console.log(data);
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then((result) => {
			var uid = result.user.uid;
			// Signed in
			var obj = {
				email: email,
				firstName: firstName,
				lastName: lastName,
				userName: username,
			};
			console.log(obj);
			firestore.collection("users").doc(uid).set(obj, { merge: true });
			// ...
		})
		.catch((error) => {
			alert(error);
		});
}

export function uploadUserPhoto(file){
	var profilePhotoRef = storageRef.child('profilePhoto.jpg')

}