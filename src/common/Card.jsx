import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Card = props => {
  return (
    <div class="card mb-4">
      <div class="card-header">
        <FontAwesomeIcon icon={props.icon} /> {props.title}
      </div>
      <div class="card-body">
      <div className="row mx-2 my-2">
          
          {props.children}</div>
          </div>
    </div>
  )
}

export default Card
