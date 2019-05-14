import React from 'react';
import { Row, Container } from 'react-bootstrap';
import { Query, withApollo } from 'react-apollo';

//Components
import { StatsBox } from '../components/widget/StatsBox/StatsBox';

//Charts 
import { LineChart_GeneralComponent } from '../components/recharts/LineChart_General';

//Query
import { allRecordsByOrganization as allOrg, all_records as all} from '../queries/records';


const styles = {
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		//alignItems: 'flex-center',
		alignContent: 'flex-start',
		paddingTop: '5%'
		
	},
	row: {
		//height:'100vh',	
		justifyContent: 'center',
		flex:1,
		marginBottom:0,
		paddingBottom:0
	}
}


export class DemographicsAnalytics extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			data:null
		}
	}

	render() {
		return (
				<Container style={styles.container}>
					<Row style={styles.row}>
						<StatsBox/>
						<StatsBox/>
						StatsBox
					</Row>
					<Row style={styles.rows}>
						<Query query={all}>
						{({ data, loading, error }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return <p>Error :(</p>;
							//console.log(data.getEvalMedicalRecords);
							return (
								<LineChart_GeneralComponent data={data} />
							);
						}}
						</Query>
					</Row>
				</Container>		
		);
	}
}