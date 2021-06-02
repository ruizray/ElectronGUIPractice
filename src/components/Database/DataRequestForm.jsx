import React, { useState } from "react";
import Joi from "joi-browser";
import GoogleAuth from "../GoogleAuth";
import { Card, CardHeader, CardContent} from "@material-ui/core";
import InputFrom from "../../common/Input";

const DataRequestForm = (props) => {
	const schema = {
		pagecount: Joi.number().greater(0).less(100).required(),
	};

	const [data, setData] = useState({ pagecount: 0 });
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

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e);
		const errors = validate();
		console.log(errors);
		console.log(formErrors);
		setFormErrors(errors || {});

		if (errors) return;
		props.onSubmit(data.pagecount);
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
			<form onSubmit={handleSubmit}>
				<Card className='h-100 '>
					<CardHeader className='card-header bg-dark text-white' title='Data Request'></CardHeader>

					<CardContent>
						<GoogleAuth />

						<div className='row gx-5 mt-5'>
							<div className='col-md-5'>
								<InputFrom
									name={"pagecount"}
									label={"Page Count"}
									type={"number"}
									variant={"filled"}
									onChange={handleChange}
									error={formErrors["pagecount"]}
									autoFocus={true}
								/>
							</div>
						</div>
					</CardContent>
					<button disabled={validate()} type='submit' className='btn btn-primary mdc-ripple-upgraded'>
						Send Request
					</button>
					<button disabled={validate()} onClick={() => props.onDownloadClick()} type='button' className='btn btn-primary mdc-ripple-upgraded'>
						Print Data
					</button>

					
				</Card>
			</form>
		</React.Fragment>
	);
};

export default DataRequestForm;
