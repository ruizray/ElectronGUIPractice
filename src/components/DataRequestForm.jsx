import React from 'react'
import Joi from 'joi-browser'
import Form from '../common/Form'
import GoogleAuth from './GoogleAuth'
import * as fa from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class DataRequestForm extends Form {
  state = {
    data: { pagecount: '' },
    errors: {}
  }

  schema = {
    pagecount: Joi.number().greater(0).less(100).required()
  }

  doSubmit = () => {
    this.props.onSubmit(this.state.data.pagecount)
  }
  handleDownload = () => {
    this.props.onDownloadClick()
  }

  render() {
    return (
      <React.Fragment>
        <div className="card mb-4">
          <div className="card-header">
            <FontAwesomeIcon icon={fa.faTable} /> Request Form
          </div>
          <div className="row mx-4 my-4">
            <GoogleAuth />
            <form onSubmit={this.handleSubmit} autoComplete="off">
              {this.renderInput('pagecount', 'Pagecount', 'number')}
              <div className="btn-group">
                {this.renderButton('Send Request')}
                {this.renderDownloadButton('Print Data')}
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default DataRequestForm
