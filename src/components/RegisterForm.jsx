import React from 'react'
import Joi from 'joi-browser'
import Form from '../common/Form'
import firebase from 'firebase'

class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', displayName: '', verifyPassword: '' },
    errors: {}
  }

  schema = {
    email: Joi.string().required().label('Email'),
    password: Joi.string().required().label('Password'),
    displayName: Joi.string().min(6).required().label('Display Name'),
    verifyPassword:Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
  }

  doSubmit = () => {
    console.log('Submitted')

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.state.data.email,
        this.state.data.password
      )
      .then(userCredential => {
        const user = userCredential.user
        user.updateProfile({
          displayName: this.state.data.displayName,
          photoURL:
            'https://pyxis.nymag.com/v1/imgs/3f0/aa0/221d958335e2f9fd068c976dba7d1280a0-03-alex-jones-supplements.rsquare.w700.jpg'
        })
      })
      .catch(error => {
        alert(error.message)
      })
  }

  doRegister = () => {
    this.props.doRegister(true)
  }

  render() {
    return (
      <React.Fragment>
        <div class="container h-100">
          <div class="row h-100 justify-content-center align-items-center">
            <form className="col-12" onSubmit={this.handleSubmit}>
              <h2>Registration</h2>
              <div className="row">
                <div class="col-md-6">{this.renderInput('email', 'Email' , <span style={{color:'red'}}>*</span>)}</div>
                <div class="col-md-6">
                  {this.renderInput('displayName', 'Display Name*', 'text')}
                </div>
                <div class="col-md-6">
                  {this.renderInput('password', 'Password*', 'password')}
                </div>
                <div class="col-md-6">
                  {this.renderInput('verifyPassword', 'Verify Password*', 'password')}
                </div>
                <div className="row">
                    <div class="col-md-12">
                       {this.renderButton('Sign Up')} 
                    </div>
                    
                </div>
                
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default RegisterForm
