import React from 'react';

const ListGroup = props => {

    const { items, textProperty, valueProperty, onItemSelect, selectedItem } = props;
    console.log(textProperty, valueProperty)
    return (
    <ul className="list-group mb-4">
        {items.map(item =>
            <li
                key={item[valueProperty]}
                onClick={() => onItemSelect(item)}

                className={item === selectedItem ? "list-group-item active" : "list-group-item"} >
                {item[textProperty]}

            </li>)}

    </ul>);
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id',
    key: '_id'
}
export default ListGroup;