import React, { Component } from 'react';
import Joi from 'joi-browser'
import Form from '../common/Form'
import GoogleAuth from './GoogleAuth';
class DataRequestForm extends Form {
    state = {
        data: { pagecount: '' },
        errors: {

        }
    }

    schema = {
        pagecount: Joi.number().greater(0).less(100).required(),
    }

    doSubmit = () => {
        this.props.onSubmit(this.state.data.pagecount)
    }
    handleDownload= () => {
        this.props.onDownloadClick()
    }
    
    render() {
        const { data, errors } = this.state

        return (

            <React.Fragment>
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table me-1"></i>
                      Request Form
                  </div>
                    <div className="row mx-4 my-4">
                        <GoogleAuth />
                        <form onSubmit={this.handleSubmit} autoComplete="off" >
                            {this.renderInput('pagecount', 'Pagecount', "number")}
                            {this.renderButton("Send Request")}
                            {this.renderDownloadButton("Print Data")}
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default DataRequestForm;