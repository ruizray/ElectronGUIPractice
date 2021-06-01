import React, { useState } from "react";
import Joi from "joi-browser";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputFrom from "../common/Input";
import { signInWithGoogle, signInWithEmailPassword } from "../scripts/firebase";
import { NavLink } from "react-router-dom";

const Login = (props) => {
  const schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
  };

  const [data, setData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});

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
  const doRegister = () => {
    props.doRegister(true);
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
      <div className="bg-primary">
        <div id="layoutAuthentication">
          <div id="layoutAuthentication_content">
            <main>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-8">
                    <div className="card card-raised shadow-10 mt-5 mt-xl-10 mb-4">
                      <div className="card-body p-5">
                        <div className="text-center">
                          <h1 className="display-5 mb-0">Login</h1>
                          <div className="subheading-1 mb-5">
                            to continue to app
                          </div>
                        </div>
                        <form
                          onSubmit={() =>
                            signInWithEmailPassword(data.email, data.password)
                          }
                        >
                          <div className="mb-4">
                            <InputFrom
                              name={"email"}
                              label={"Email"}
                              type={"text"}
                              variant={"filled"}
                              onChange={handleChange}
                              error={formErrors["email"]}
                              autoFocus={true}
                            />
                          </div>
                          <div className="mb-4">
                            <InputFrom
                              name={"password"}
                              label={"Password"}
                              type={"password"}
                              variant={"filled"}
                              onChange={handleChange}
                              error={formErrors["password"]}
                              autoFocus={true}
                            />
                          </div>
                          <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-4">
                            <NavLink
                              to="/analytics"
                              className="small fw-500 text-decoration-none"
                            >
                              Forgot Password?
                            </NavLink>
                            <button
                              type="submit"
                              disabled={validate()}
                              className="btn btn-primary"
                            >
                              Login
                            </button>
                          </div>
                        </form>
                        <div className="row">
                          <div className="text-center">
                            <button
                              type="button"
                              style={{ backgroundColor: "white" }}
                              className="btn btn-primary align-items-center align-middle justify-content-center"
                              onClick={signInWithGoogle}
                            >
                              <FontAwesomeIcon
                                icon={faGoogle}
                                color="black"
                                size="2x"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mb-5">
                      <button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        className="small fw-500 text-decoration-none link-white"
                        onClick={() => doRegister()}
                      >
                        Need an account? Sign up!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>

          <div id="layoutAuthentication_footer">
            <footer className="p-4">
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between small">
                <div className="me-sm-3 mb-2 mb-sm-0">
                  <div className="fw-500 text-white">
                    Copyright &copy; Your Website 2021
                  </div>
                </div>
                <div className="ms-sm-3">
                  <NavLink
                    to="/analytics"
                    className="fw-500 text-decoration-none link-white"
                  >
                    Privacy
                  </NavLink>
                  <NavLink
                    to="/analytics"
                    className="fw-500 text-decoration-none link-white mx-4"
                  >
                    Terms
                  </NavLink>
                  <NavLink
                    to="/analytics"
                    className="fw-500 text-decoration-none link-white"
                  >
                    Help
                  </NavLink>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
