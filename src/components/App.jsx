import React, { useState } from 'react'
import Sidenav from './Sidenav'
import { useHistory , Redirect} from "react-router-dom";

import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth'
import firebase from 'firebase'
import Login from './Login'


firebase.initializeApp({
    apiKey: 'AIzaSyAU8YtFNTgL7v37WUW-ElF7VbAw0l-yOHo',
    authDomain: 'react-fc0a1.firebaseapp.com',
    projectId: 'react-fc0a1',
    storageBucket: 'react-fc0a1.appspot.com',
    messagingSenderId: '525500981240',
    appId: '1:525500981240:web:84fd11f72cf7793833000d',
    measurementId: 'G-HLM64JSND8'
  })


const App = () => {
    const history = useHistory();
  const [toggled, handleNavtoggled] = React.useState(false)
  const handleNavToggle = () => {
    handleNavtoggled(!toggled)
  }

  const[user, loading, error] = useAuthState(firebase.auth())



  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    )
  }
  if (error) {
    console.log(error)
    return (
      <>
        <div>
          <p>Error: {error}</p>
        </div>
      </>
    )
  }
  if (user) {
      
    return (
      <React.Fragment>
        <div
          className={
            toggled === true
              ? 'sb-nav-fixed sb-sidenav-toggled'
              : 'sb-nav-fixed'
          }
        >
          <Sidenav user={user} onToggle={handleNavToggle} />
          <Redirect to="/" />
        </div>
      </React.Fragment>
    )
  }
  return (
    <Login />
  )


  

  // const [toggled, handleNavtoggled] = React.useState(false)

  //   const handleNavToggle = () => {
  //     handleNavtoggled(!toggled)
  //   }

  //   return (
  //     <React.Fragment>
  //       <div
  //         className={
  //           toggled === true ? 'sb-nav-fixed sb-sidenav-toggled' : 'sb-nav-fixed'
  //         }
  //       >
  //         <Sidenav onToggle={handleNavToggle} />
  //       </div>
  //     </React.Fragment>
  //   )
}

export default App
