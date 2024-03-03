import React from 'react';
import { Table } from 'react-bootstrap';
import { format } from 'date-fns';

function CustomerTable({ customers }) {
    return (
        <Table striped bordered hover className="customer-table"> 
            <thead>
                <tr>
                    <th>Sno</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Date</th> 
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer) => (
                    <tr key={customer.sno}>
                        <td>{customer.sno}</td>
                        <td>{customer.customer_name}</td>
                        <td>{customer.age}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.location}</td>
                        <td>{format(new Date(customer.created_at), 'yyyy-MM-dd')}</td> 
                        <td>{format(new Date(customer.created_at), 'HH:mm:ss')}</td> 
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default CustomerTable;
