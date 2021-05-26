import React, { useState } from 'react'
import {
  useAuthState,
  useSignInWithEmailAndPassword
} from 'react-firebase-hooks/auth'
import firebase from 'firebase'

const Login = props => {
  const provider = new firebase.auth.GoogleAuthProvider()
  provider.addScope('https://www.googleapis.com/auth/analytics.readonly')
  const auth = firebase.auth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [credential , setCredential] = useState('')
  const [signInWithEmailAndPassword, loading, error] =
    useSignInWithEmailAndPassword(auth, email, password)

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then(result => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential
        var token = credential.accessToken
        var user = result.user
        setCredential(token)
        console.log(token)
      })
      .catch(error => {
        alert(error)
      })
  }
  return (
    <React.Fragment>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          ></input>
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          ></input>
        </div>

        <button
          onClick={() => signInWithEmailAndPassword(email, password)}
          type="submit"
          class="btn btn-primary"
        >
          Login
        </button>
        <button
          onClick={signInWithGoogle}
          type="submit"
          class="btn btn-primary"
        >
          Login With Google
        </button>
      </form>
    </React.Fragment>
  )
}

export default Login
