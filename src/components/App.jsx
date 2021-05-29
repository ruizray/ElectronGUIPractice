import React from 'react'
import Dashboard from './Dashboard'
import { Redirect } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase'
import LoginForm from './LoginForm'
import { UserProvider } from './../contexts/UserContext'
import RegisterForm from './RegisterForm'



const App = () => {
  const [toggled, handleNavtoggled] = React.useState(false)
  const handleNavToggle = () => {
    handleNavtoggled(!toggled)
  }
  
  const [token, setToken] = React.useState('')
  const [register, setRegister] = React.useState(false)
  const [user, loading, error] = useAuthState(firebase.auth())

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
      <UserProvider value={{ user: user, token: token, }}>
        <React.Fragment>
          
            <Dashboard onToggle={handleNavToggle} />
            <Redirect to="/" />
       
        </React.Fragment>
      </UserProvider>
    )
  }
  if (register) {
    return <RegisterForm />
  }
  return <LoginForm setToken={setToken} doRegister={setRegister} />
}

export default App
