import React from "react";
import Joi from "joi-browser";
import Form from "../common/Form";
import firebase from "firebase";
import "@material/mwc-textfield";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LoginForm extends Form {
	state = {
		data: { username: "", password: "" },
		errors: {},
	};

	schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().min(6).required().label("Password"),
	};

	doSubmit = () => {
		console.log("Submitted");
		firebase
			.auth()
			.signInWithEmailAndPassword(this.state.data.username, this.state.data.password)
			.catch((error) => {
				alert(error.message);
			});
	};

	doRegister = () => {
		this.props.doRegister(true);
	};
	signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope("https://www.googleapis.com/auth/analytics.readonly");
		firebase
			.auth()
			.signInWithPopup(provider)
			.then((result) => {
				/** @type {firebase.auth.OAuthCredential} */
				var credential = result.credential;
				var token = credential.accessToken;
				this.props.setToken(token);
			})
			.catch((error) => {
				alert(error);
			});
	};

	render() {
		const { doRegister } = this.props;
		return (
			<React.Fragment>
				<div className='bg-primary'>
					<div id='layoutAuthentication'>
						<div id='layoutAuthentication_content'>
							<main>
								<div className='container'>
									<div className='row justify-content-center'>
										<div className='col-xxl-4 col-xl-5 col-lg-6 col-md-8'>
											<div className='card card-raised shadow-10 mt-5 mt-xl-10 mb-4'>
												<div className='card-body p-5'>
													<div className='text-center'>
														<h1 className='display-5 mb-0'>Login</h1>
														<div className='subheading-1 mb-5'>to continue to app</div>
													</div>

													<form>
														<div className='mb-4'>{this.renderInput("username", "Username", "text", "filled")}</div>
														<div className='mb-4'>
															{this.renderInput("password", "Password", "password", "filled")}
														</div>

														<div className='form-group d-flex align-items-center justify-content-between mt-4 mb-0'>
															<a className='small fw-500 text-decoration-none'>Forgot Password?</a>
															<button className='btn btn-primary'>Login</button>
														</div>
														<div className='text-center mt-5'>
															<button
																type='button'
																style={{ backgroundColor: "white" }}
																className='btn btn-primary align-items-center align-middle justify-content-center'
																onClick={this.signInWithGoogle}>
																{" "}
																<FontAwesomeIcon icon={faGoogle} color='black' size='2x' />
															</button>
														</div>
													</form>
												</div>
											</div>

											<div className='text-center mb-5'>
												<a className='small fw-500 text-decoration-none link-white' onClick={() => this.doRegister()}>
													Need an account? Sign up!
												</a>
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

				{/* <div className="container h-100">
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
        </div> */}
			</React.Fragment>
		);
	}
}

export default LoginForm;
