import React, { Component } from 'react'
import Joi from 'joi-browser'
import Form from '../common/Form'
import firebase from 'firebase'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {}
  }

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().min(6).required().label('Password')
  }

  doSubmit = () => {
    console.log('Submitted')
    firebase.auth().signInWithEmailAndPassword(this.state.data.username, this.state.data.password).catch((error) => {
      alert(error.message)
    });
  ;
  }

  doRegister =() =>{
    this.props.doRegister(true);
  }
  signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/analytics.readonly')
    firebase.auth()
      .signInWithPopup(provider)
      .then(result => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential
        var token = credential.accessToken
        this.props.setToken(token)
        var user = result.user

        console.log(token)
      })
      .catch(error => {
        alert(error)
      })
  }

  render() {

   const {doRegister} = this.props
    return (
      <React.Fragment>


        <div class="container h-100">
          <div class="row h-100 justify-content-center align-items-center">

            <form className="col-12" onSubmit={this.handleSubmit}>
              <h2>Login</h2>
              {this.renderInput('username', 'Username')}
              {this.renderInput('password', 'Password', 'password')}
              <div className="btn-group">
                {this.renderButton('Login')}
                {this.renderRegisterButton('Register' , "button", doRegister)}
              </div>

              <div className="row mt-4 justify-content-center">
                <div className="col-md-2 height:100px align-middle">
                  <button type="button" style={{ width: '100%' }} className="btn btn-primary align-items-center align-middle justify-content-center" onClick={this.signInWithGoogle}> <FontAwesomeIcon icon={faGoogle} color="white" size='2x' /></button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default LoginForm
