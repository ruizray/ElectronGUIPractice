import React, { Component } from 'react';
import Table from '../../common/Table/Table'


class DatabaseTable extends Component {
    columns = [{ path: 'model', label: 'Model' },
    { path: 'category', label: 'Category' },
    { path: 'count', label: 'Stock' },
    { path: 'cost', label: 'Cost' },

    {
        key: 'delete', content: movie => (<button onClick={() => this.props.onDelete(movie)} className="demo-button">
            Delete
        </button>)
    }
    ];


    render() {
        console.log(this.props)
        const { posts, sortColumn, onSort } = this.props;

        return (
            <Table columns={this.columns} data={posts} sortColumn={sortColumn} onSort={onSort} />
        )
    }
}






export default DatabaseTable