import React from 'react'
import Joi from 'joi-browser'
import Form from '../common/Form'
class DatabaseAddForm extends Form {
  state = {
    data: { category: '', model: '', count: 0, cost: 0},
    errors: {}
  }

  schema = {
    count: Joi.number().greater(-1).required(),
    category: Joi.string().min(1).required(),
    model: Joi.string().min(1).required(),
    cost : Joi.number().required()
    
  }

  doSubmit = () => {
    this.props.onSubmit(this.state.data)
  }
 

  render() {
    return (
      <React.Fragment>
     
     
         
        
            <form onSubmit={this.handleSubmit} autoComplete="off">
                {this.renderInput('category' , 'Category' , 'text')}
                {this.renderInput('model' , 'Model' , 'text')}
                {this.renderInput('count' , 'Count' , 'number')}
                {this.renderInput('cost' , 'Cost' , 'number')}
                {this.renderButton('Add')}
            </form>
    
  
      </React.Fragment>
    )
  }
}

export default DatabaseAddForm
