import React from "react";
import Joi from "joi-browser";
import { useState, useEffect } from "react";
import InputFrom from "../common/Input";
import { updateUserData } from "./../scripts/firebase";

const UserInfoForm = props => {
	const schema = {
		username: Joi.string().min(4).required().label("Username"),
		firstname: Joi.string().min(3).required().label("First Name"),
		lastname: Joi.string().min(2).required().label("Last Name"),
		email: Joi.string().required().label("Email"),
	};

	const [data, setData] = useState({username:""});
	const [formErrors, setFormErrors] = useState({});

	useEffect(() => {
    console.log("Getting")
		setData(props.userData)
	},[props.userData]);

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
		updateUserData(data);
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
		<>
			<div className='mb-4'>
				{" "}
				<div key={data.username}>
					<InputFrom
						name={"username"}
						label={"Username"}
						type={"text"}
						variant={"filled"}
						onChange={handleChange}
						error={formErrors["username"]}
						autoFocus={true}
						defaultValue={data.username || ""}
					/>
				</div>
			</div>
			<div className='row mb-4'>
				<div className='col-md-12'>
					<div key={data.email}>
						<InputFrom
							name={"email"}
							label={"Email"}
							type={"text"}
							variant={"filled"}
							onChange={handleChange}
							error={formErrors["email"]}
							autoFocus={true}
							defaultValue={data.email || ""}
						/>
					</div>
				</div>
			</div>
			<div className='row mb-4'>
				<div className='col-md-6'>
					<div key={data.firstname}>
						<InputFrom
							name={"firstname"}
							label={"First Name"}
							type={"text"}
							variant={"filled"}
							onChange={handleChange}
							error={formErrors["firstname"]}
							autoFocus={true}
							defaultValue={data.firstname || ""}
						/>
					</div>
				</div>

				<div className='col-md-6'>
					<div key={data.lastname}>
						<InputFrom
							name={"lastname"}
							label={"Last Name"}
							type={"text"}
							variant={"filled"}
							onChange={handleChange}
							error={formErrors["lastname"]}
							autoFocus={true}
							defaultValue={data.lastname || ""}
						/>
					</div>
				</div>
			</div>

			<div className='text-end'>
				<button disabled={validate()} onClick={(e) => handleSubmit(e)} className='btn btn-primary mdc-ripple-upgraded'>
					Save changes
				</button>
			</div>
		</>
	);
};

export default UserInfoForm;

