import React from 'react'
import Joi from 'joi-browser'
import Form from '../common/Form'
class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {}
  }

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')
  }

  doSubmit = () => {
    console.log('Submitted')
  }

  render() {


    return (
      <React.Fragment>
        <div class="container-fluid px-4">
          <h1 class="mt-4">Login Form</h1>
          <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item">
              <a href="index.html">Dashboard</a>
            </li>
            <li class="breadcrumb-item active">Login Form</li>
          </ol>

          <div class="card mb-4">
            <div class="card-header">
              <i class="fas fa-table me-1"></i>
              DataTable Example
            </div>
            <div className="row mx-4 my-4">
              <h1>Login</h1>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput('username', 'Username')}
                {this.renderInput('password', 'Password', 'password')}

                {this.renderButton('Login')}
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default LoginForm
