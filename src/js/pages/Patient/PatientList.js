import React from 'react';
import {ProgressBar } from 'react-bootstrap';


import MaterialTable from 'material-table';
import { withApollo } from 'react-apollo';
import { all_records } from '../../queries/records';

import Patient from '../Patient/Patient';



class PatientList extends React.Component{
    constructor(props){
        super(props);
        this.state =({
            results:null,
            progress: 0
        })

    }

    componentDidMount = async () => {
		const {client} = this.props;
	
		let res = await client.query({query: all_records});
		await this.setState({
			results: res.data.getPeople,
			progress: 100
        })
        
        //console.log(this.state.results)	
		
	}


    render() {
        return(
            <div style={{paddingTop:"60px"}}>
            { this.state.results === null &&
                <div>Loading</div>
            }

            {this.state.results && 
                <MaterialTable
                    title={"Patient List"}
                    columns={[
                        { title: 'First Name', field: 'fname' },
                        { title: 'Last Name', field: 'lname' },
                        { title: 'Nickname', field: 'nickname' },
                        { title: 'Date of Birth', field: 'dob' },
                        { title: 'Data Collector', field: 'surveyingUser' },
                    ]}

                    data={this.state.results}        
                    options={{
                        search: true,
                        searchFieldAlignment: "left"
                    }}
                    detailPanel={rowData => {
                        console.log(rowData)
                        return (
                          <div>
                            <Patient data={rowData}/>
                          </div>
                        )
                      }}
                    //onRowClick={(event, rowData, togglePanel) => togglePanel()}
                /> 
            }
            </div>
        )

    }
}

export default withApollo(PatientList);
