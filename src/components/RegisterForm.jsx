import React, { useState } from "react";
import Joi from "joi-browser";
import InputFrom from "../common/Input";
import { signUpWithEmailPassword } from "./../scripts/firebase";

const RegisterForm = (props) => {
	const [data, setData] = useState({ firstName: "", lastName: "", password: "", username: "", email:"", verifyPassword: "" });
	const [formErrors, setFormErrors] = useState({});

	const schema = {
		email: Joi.string().required().label("Email"),
		username: Joi.string().min(5).max(15).required().label("Username"),
		password: Joi.string().required().label("Password"),
		firstName: Joi.string().min(2).required().label("First Name"),
		lastName: Joi.string().min(2).required().label("Last Name"),
		verifyPassword: Joi.any()
			.valid(Joi.ref("password"))
			.required()
			.options({ language: { any: { allowOnly: "must match password" } } }),
	};
	const validate = () => {
		const options = { abortEarly: false, allowUnknown: true };
		const { error } = Joi.validate(data, schema, options);
		if (!error) return null;
		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;

		console.log(errors);
		return errors;
	};
	const validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const tempschema = { [name]: schema[name] };
		const { error } = Joi.validate(obj, tempschema);
		return error ? error.details[0].message : null;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e);
		const errors = validate();
		console.log(errors);
		console.log(formErrors);
		setFormErrors(errors || {});

		if (errors) return;
		console.log("Here");

	signUpWithEmailPassword(data)
	};

	const handleChange = ({ currentTarget: input }) => {
		const errors = { ...formErrors };
		const errorMessage = validateProperty(input);
		if (errorMessage) {
			errors[input.name] = errorMessage;
		} else {
			delete errors[input.name];
		}

		const tempdata = { ...data };
		tempdata[input.name] = input.value;
		setData(tempdata);
		setFormErrors(errors);
	};
	

	return (
		<React.Fragment>
			<div className='bg-primary'>
				<div id='layoutAuthentication'>
					<div id='layoutAuthentication_content'>
						<main>
							<div className='container'>
								<div className='row justify-content-center'>
									<div className='col-xxl-7 col-xl-10'>
										<div className='card card-raised shadow-10 mt-5 mt-xl-10 mb-5'>
											<div className='card-body p-5'>
												<div className='text-center'>
													<h1 className='display-5 mb-0'>Create New Account</h1>
													<div className='subheading-1 mb-5'>to continue to app</div>
												</div>

												<form onSubmit={(e) => handleSubmit(e)}>
													<div className='row'>
														<div className='col-sm-6 mb-4'>
															<InputFrom
																required
																name={"firstName"}
																label={"First Name"}
																type={"text"}
																variant={"filled"}
																onChange={handleChange}
																error={formErrors["firstName"]}
															/>
														</div>
														<div className='col-sm-6 mb-4'>
															<InputFrom
																required
																name={"lastName"}
																label={"Last Name"}
																type={"text"}
																variant={"filled"}
																onChange={handleChange}
																error={formErrors["lastName"]}
															/>
														</div>
													</div>
													<div className='mb-4'>
														<InputFrom
															required
															name={"username"}
															label={"Username"}
															type={"text"}
															variant={"filled"}
															onChange={handleChange}
															error={formErrors["username"]}
														/>
													</div>
													<div className='mb-4'>
														<InputFrom
															required
															name={"email"}
															label={"Email"}
															type={"text"}
															variant={"filled"}
															onChange={handleChange}
															error={formErrors["email"]}
														/>
													</div>
													<div className='row'>
														<div className='col-sm-6 mb-4'>
															<InputFrom
																required
																name={"password"}
																label={"Password"}
																type={"password"}
																variant={"filled"}
																onChange={handleChange}
																error={formErrors["password"]}
															/>
														</div>
														<div className='col-sm-6 mb-4'>
															<InputFrom
																required
																name={"verifyPassword"}
																label={"Verify Password"}
																type={"password"}
																variant={"filled"}
																onChange={handleChange}
																error={formErrors["verifyPassword"]}
															/>
														</div>
													</div>

													<div className='form-group d-flex align-items-center justify-content-between mt-4 mb-0'>
														<a className='small fw-500 text-decoration-none' href='app-auth-login-basic.html'>
															Sign in instead
														</a>
														<button
															disabled={validate()}
															type='submit'
															className='btn btn-primary mdc-ripple-upgraded'>
															Sign Up
														</button>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</main>
					</div>

					<div id='layoutAuthentication_footer'>
						<footer className='p-4'>
							<div className='d-flex flex-column flex-sm-row align-items-center justify-content-between small'>
								<div className='me-sm-3 mb-2 mb-sm-0'>
									<div className='fw-500 text-white'>Copyright &copy; Your Website 2021</div>
								</div>
								<div className='ms-sm-3'>
									<a className='fw-500 text-decoration-none link-white' href='#!'>
										Privacy
									</a>
									<a className='fw-500 text-decoration-none link-white mx-4' href='#!'>
										Terms
									</a>
									<a className='fw-500 text-decoration-none link-white' href='#!'>
										Help
									</a>
								</div>
							</div>
						</footer>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default RegisterForm;
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
