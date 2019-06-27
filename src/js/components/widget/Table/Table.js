import React from 'react';
import { Table } from 'react-bootstrap'
import './Table.scss'; 

import { first_last_names as fl} from '../../../queries/records'
import { Query } from 'react-apollo';

export class ResultsTable extends React.Component{
    render(){
        return(
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    <Query query={fl}>
                        {({ data, loading, error }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;

                        return data.getPeople.map(({ fname, lname }) =>
                            <tr>
                                <td>{fname}</td>
                                <td>{lname}</td>
                            </tr>
                            );
                        }}
                    </Query>
                </tbody>
            </Table>
        )
    }
}