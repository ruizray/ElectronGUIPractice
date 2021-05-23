import React, { Component } from 'react';
import Input from '../common/Input'
import Joi from 'joi-browser'

class LoginForm extends Component {
    state = {
        account: { username: '', password: '' },
        errors: {

        }
    }

    schema = {
        username: Joi.string().required(),
        password: Joi.string().required()
    }
    validateProperty = ({ name, value }) => {
        if (name === 'username') {
            if (value.trim() === '') {
                return 'Username is required.'
            }
        }
        if (name === 'password') {
            if (value.trim() === '') {
                return 'Password is required.'
            }
        }
    }
    validate = () => {
        const result = Joi.validate(this.state.account, this.schema, { abortEarly: false })
        console.log(result);
        const errors = {};
        const { account } = this.state;
        if (account.username.trim() === '') {
            errors.username = 'Username is required'
        }
        if (account.password.trim() === '') {
            errors.password = 'Password is required'
        }
        return Object.keys(errors).length === 0 ? null : errors;
    };
    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} })
        if (errors) return;


        console.log('Submitted')
    }

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input)
        if (errorMessage) {
            errors[input.name] = errorMessage
        } else {
            delete errors[input.name]
        }

        const account = { ...this.state.account }
        account[input.name] = input.value;
        this.setState({ account, errors })
    };
    render() {
        const { account, errors } = this.state

        return (

            <React.Fragment>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">Login Form</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li class="breadcrumb-item active">Login Form</li>
                    </ol>

                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table me-1"></i>
                      DataTable Example
                  </div>
                        <div className="row mx-4 my-4">

                            <h1>Login</h1>
                            <form onSubmit={this.handleSubmit} >

                                <Input name="username" value={account.username} label="Username" onChange={this.handleChange} error={errors.username} />
                                <Input name="password" value={account.password} label="Password" onChange={this.handleChange} error={errors.password} />

                                <button className="btn btn-primary mt-2">Login</button>
                            </form>
                        </div>
                    </div>
                </div>

            </React.Fragment>


        );
    }
}

export default LoginForm;