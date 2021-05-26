import React from 'react'
import Joi from 'joi-browser'
import Form from '../common/Form'
import * as fa from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class DatabaseAddForm extends Form {
  state = {
    data: { category: '', model: '', count: 0, cost: 0},
    errors: {}
  }

  schema = {
    count: Joi.number().greater(-1).required(),
    category: Joi.required(),
    model: Joi.required(),
    cost : Joi.number().required()
    
  }

  doSubmit = () => {
    this.props.onSubmit(this.state.data)
  }
 

  render() {
    return (
      <React.Fragment>
        <div className="card mb-4">
          <div className="card-header">
            <FontAwesomeIcon icon={fa.faTable} /> Add Data
          </div>
          <div className="row mx-4 my-4">
        
            <form onSubmit={this.handleSubmit} autoComplete="off">
                {this.renderInput('category' , 'Category' , 'text')}
                {this.renderInput('model' , 'Model' , 'text')}
                {this.renderInput('count' , 'Count' , 'number')}
                {this.renderInput('cost' , 'Cost' , 'number')}
                {this.renderButton('Add')}
            </form>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default DatabaseAddForm
