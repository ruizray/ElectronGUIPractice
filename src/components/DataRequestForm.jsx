import React from 'react'
import Joi from 'joi-browser'
import Form from '../common/Form'
import GoogleAuth from './GoogleAuth'

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
      
      
          
            <GoogleAuth />
            <form onSubmit={this.handleSubmit} autoComplete="off">
              {this.renderInput('pagecount', 'Pagecount', 'number')}
              <div className="btn-group">
                {this.renderButton('Send Request')}
                {this.renderDownloadButton('Print Data')}
              </div>
            </form>


      </React.Fragment>
    )
  }
}

export default DataRequestForm
