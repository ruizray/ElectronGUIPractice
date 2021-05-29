import React from 'react'
import Joi from 'joi-browser'
import Form from '../common/Form'
import firebase from 'firebase'

class RegisterForm extends Form {
  state = {
    data: {
      firstName: '',
      lastName: '',
      password: '',
      displayName: '',
      verifyPassword: ''
    },
    errors: {}
  }

  schema = {
    email: Joi.string().required().label('Email'),
    password: Joi.string().required().label('Password'),
    firstName: Joi.string().min(2).required().label('First Name'),
    lastName: Joi.string().min(2).required().label('Last Name'),
    verifyPassword: Joi.any()
      .valid(Joi.ref('password'))
      .required()
      .options({ language: { any: { allowOnly: 'must match password' } } })
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
          displayName: this.state.data.firstName + this.state.data.lastName,
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
        <div className="bg-primary">
          <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
              <main>
                <div class="container">
                  <div class="row justify-content-center">
                    <div class="col-xxl-7 col-xl-10">
                      <div class="card card-raised shadow-10 mt-5 mt-xl-10 mb-5">
                        <div class="card-body p-5">
                          <div class="text-center">
                            <h1 class="display-5 mb-0">Create New Account</h1>
                            <div class="subheading-1 mb-5">
                              to continue to app
                            </div>
                          </div>

                          <form>
                            <div class="row">
                              <div class="col-sm-6 mb-4">
                                {this.renderInput(
                                  'firstName',
                                  'First Name',
                                  'text',
                                  <span style={{ color: 'red' }}>*</span>
                                )}
                              </div>
                              <div class="col-sm-6 mb-4">
                                {this.renderInput(
                                  'lastName',
                                  'Last Name',
                                  'text',
                                  <span style={{ color: 'red' }}>*</span>
                                )}
                              </div>
                            </div>
                            <div class="mb-4">
                              {this.renderInput(
                                'email',
                                'Email',
                                'text',
                                <span style={{ color: 'red' }}>*</span>
                              )}
                            </div>
                            <div class="row">
                              <div class="col-sm-6 mb-4">
                                {this.renderInput(
                                  'password',
                                  'Password',
                                  'password',
                                  <span style={{ color: 'red' }}>*</span>
                                )}
                              </div>
                              <div class="col-sm-6 mb-4">
                                {this.renderInput(
                                  'verifyPassword',
                                  'Verify Password*',
                                  'password',
                                  <span style={{ color: 'red' }}>*</span>
                                )}
                              </div>
                            </div>

                            <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                              <a
                                class="small fw-500 text-decoration-none"
                                href="app-auth-login-basic.html"
                              >
                                Sign in instead
                              </a>
                              {this.renderButton('Sign Up')}
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>

            <div id="layoutAuthentication_footer">
              <footer class="p-4">
                <div class="d-flex flex-column flex-sm-row align-items-center justify-content-between small">
                  <div class="me-sm-3 mb-2 mb-sm-0">
                    <div class="fw-500 text-white">
                      Copyright &copy; Your Website 2021
                    </div>
                  </div>
                  <div class="ms-sm-3">
                    <a class="fw-500 text-decoration-none link-white" href="#!">
                      Privacy
                    </a>
                    <a
                      class="fw-500 text-decoration-none link-white mx-4"
                      href="#!"
                    >
                      Terms
                    </a>
                    <a class="fw-500 text-decoration-none link-white" href="#!">
                      Help
                    </a>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default RegisterForm
// <React.Fragment>
// <div class="container h-100">
//   <div class="row h-100 justify-content-center align-items-center">
//     <form className="col-12" onSubmit={this.handleSubmit}>
//       <h2>Registration</h2>
//       <div className="row">
//         <div class="col-md-6">{this.renderInput('email', 'Email' , <span style={{color:'red'}}>*</span>)}</div>
//         <div class="col-md-6">
//           {this.renderInput('displayName', 'Display Name*', 'text')}
//         </div>
//         <div class="col-md-6">
//           {this.renderInput('password', 'Password*', 'password')}
//         </div>
//         <div class="col-md-6">
//           {this.renderInput('verifyPassword', 'Verify Password*', 'password')}
//         </div>
//         <div className="row">
//             <div class="col-md-12">
//                {this.renderButton('Sign Up')}
//             </div>

//         </div>

//       </div>
//     </form>
//   </div>
// </div>
// </React.Fragment>
