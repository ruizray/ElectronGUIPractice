import React from 'react';

const Input = ({ name , label , error , required, ...rest}) => {
    return (
        <React.Fragment>
            <label htmlFor={name}>{label}</label>{required}
            <input {...rest} name={name} id={name}  className="form-control" />
            {error && <div className="alert alert-danger">{error}</div>}
     </React.Fragment>
    );
}

export default Input