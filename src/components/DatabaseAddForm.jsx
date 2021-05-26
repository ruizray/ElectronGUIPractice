import React from 'react'
import Joi from 'joi-browser'
import Form from '../common/Form'

class DatabaseAddForm extends Form {
  state = {
    data: { category: '', model: '', count: 0, cost: 0 },
    errors: {}
  }

  schema = {
    count: Joi.number().greater(-1).required(),
    category: Joi.required(),
    model: Joi.required(),
    cost: Joi.number().required()

  }

  doSubmit = () => {
    this.props.onSubmit(this.state.data)
  }


  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="form-group">
            <div className="row">
              <div className="col-md-auto">
                {this.renderInput('category', 'Category', 'text')}
              </div>
              <div className="col-md-auto">
                {this.renderInput('model', 'Model', 'text')}
              </div>

              <div className="col-md-auto">
                {this.renderInput('count', 'Count', 'number')}
              </div>
              <div className="col-md-auto">
                {this.renderInput('cost', 'Cost', 'number')}
              </div>
            </div>

            {this.renderButton('Add')}
          </div>
        </form>
      </React.Fragment>
    )
  }
}

export default DatabaseAddForm
