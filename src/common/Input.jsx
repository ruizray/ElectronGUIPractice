import React from "react";
import {FormHelperText, FormControl, InputLabel, FilledInput } from "@material-ui/core";
const InputFrom = ({ name, label, error, variant, defaultValue, ...rest }) => {


	return (
		<React.Fragment>
			<FormControl variant={variant} fullWidth>
				<InputLabel htmlFor={name}>{label}</InputLabel>
				
				<FilledInput {...rest} defaultValue={defaultValue}  name={name} id={name} aria-describedby={name}  label={name} autoComplete='off' />
				{error && <FormHelperText>{error}</FormHelperText>}
			</FormControl>
		</React.Fragment>
	);
};

export default InputFrom;
