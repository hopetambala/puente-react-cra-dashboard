import React from 'react';

//Redux
import { connect } from "react-redux";
import { getAuthInfo } from '../../reducers/login';

import MaterialTable from 'material-table';
import { withApollo } from 'react-apollo';
import { allRecordsByOrganization } from '../../queries/records';

import Patient from '../Patient/Patient';

import { styles } from "../../../styles";
import LoadingDots  from '../../components/styles/LoadingDots';
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
		const {client, authInfo} = this.props;
	
		let res = await client.query({query: allRecordsByOrganization, variables: {organization: authInfo.organization }});
		await this.setState({
			results: res.data.getPeopleByOrganization,
			progress: 100
        })
        
        //console.log(this.state.results)	
		
	}


    render() {
        return(
            <Container style={styles.container} >
                <h1 style={styles.header1} >Patient List</h1>
                { this.state.results === null &&
                    <LoadingDots /> 
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
                /> 
                }
            </Container>
        )

    }
}

// export default withApollo(PatientList);
const mapStateToProps = (state) => {
	return { 
		authInfo: getAuthInfo(state)
	}
};

export default connect(mapStateToProps,null)(withApollo(PatientList));
