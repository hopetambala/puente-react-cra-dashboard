import React from 'react';

import MaterialTable from 'material-table';
import { withApollo } from 'react-apollo';
import { all_records } from '../../queries/records';

import Patient from '../Patient/Patient';

import { styles } from "../../../styles";
import { Container} from 'react-bootstrap';




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
            <Container style={styles.container} >
                <h1 style={styles.header1} >Patient List</h1>
                { this.state.results === null &&
                    <div>Loading</div>
                }
                {this.state.results && 
                <MaterialTable
                    title={""}
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
            </Container>
        )

    }
}

export default withApollo(PatientList);
