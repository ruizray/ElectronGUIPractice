import React, { Component } from 'react';
import  Joi from 'joi-browser';
import Input from './Input'
class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options)
        if (!error) return null;
        const errors = {}
        for (let item of error.details)
            errors[item.path[0]] = item.message;

            console.log(errors)
        return errors;
    };
    validateProperty = ({ name, value }) => {
        const obj = { [name]: value }
        const schema = { [name]: this.schema[name] }
        const { error } = Joi.validate(obj, schema)
        return error ? error.details[0].message : null
    }

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} })
        if (errors) return;
        this.doSubmit();
    }

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input)
        if (errorMessage) {
            errors[input.name] = errorMessage
        } else {
            delete errors[input.name]
        }

        const data = { ...this.state.data }
        data[input.name] = input.value;
        this.setState({ data, errors })
    };


    renderButton(label){
        return <button disabled={this.validate()} className="btn btn-primary mt-2">{label}</button>
    }

    renderDownloadButton(label, type="button"){
        return <button type={type} disabled={this.validate()} onClick={this.handleDownload} className="btn btn-primary mt-2">{label}</button>
    }

    renderInput(name, label, type){
        const {data, errors} = this.state;
        return <Input name={name} label={label} type={type} value={data[name]}  onChange={this.handleChange} error={errors[name]} />
    }
}

export default Form;