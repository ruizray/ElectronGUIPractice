import React from 'react';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

const Table = ({columns , sortColumn, onSort , data}) => {

    return (
        <table className="table">
            <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />

            <TableBody data={data} columns={columns} />

        </table>); 
}


Table.defaultProps={
    columns: [{ path: 'item1', label: 'Column1'}, { path: 'item2', label: 'Column2'}],
 
}


export default Table;