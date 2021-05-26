import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Card = props => {
    return (

        <div className="card mb-4">
            <div className="card-header">
                <FontAwesomeIcon icon={props.icon} /> {props.title}
            </div>
            <div className="card-body">
                <div className="row mx-2 my-2">
                   {props.children}
                </div>
            </div>
        </div>

    );
}

export default Card;