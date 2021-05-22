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
        const result = Joi.validate(this.state.account, this.schema, {abortEarly : false})
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
                <section id="windows-section" className="section js-section u-category-windows">
                    <header className="section-header">
                        <div className="section-wrapper">
                            <h1>Movies App</h1>
                        </div>
                    </header>

                    <div className="demo">
                        <div className="demo-wrapper is-open">
                            <button id="new-graph-toggle" onClick={() => this.isOpen} className="js-container-target demo-toggle-button" >
                                Just Testing
                    <div className="demo-meta u-avoid-clicks">
                                    Supports: Win, macOS, Linux{' '}
                                    <span className="demo-meta-divider">|</span>
                      Process: Main
                    </div>
                            </button>
                            <p>
                                In this demo we create a new Graph (via the{' '}
                                <code>renderChart.js</code> script) and provide a source file
                                <code>input.txt</code> that will generate the graph
                  </p>
                            <h1>Login</h1>
                            <form onSubmit={this.handleSubmit} >

                                <Input name="username" value={account.username} label="Username" onChange={this.handleChange} error={errors.username} />
                                <Input name="password" value={account.password} label="Password" onChange={this.handleChange} error={errors.password} />

                                <button className="demo-button">Login</button>
                            </form>
                        </div>
                    </div>
                </section>


            </React.Fragment>


        );
    }
}

export default LoginForm;