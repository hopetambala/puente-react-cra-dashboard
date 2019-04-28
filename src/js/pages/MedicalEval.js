import React from 'react';
import { Row, Container } from 'react-bootstrap';
import { Query, withApollo } from 'react-apollo';

//Components
import { Boxx } from '../components/widget/Boxx/Boxx';
import { BrushBarChronicComponent } from '../components/recharts/BrushBar_Chronic';

//Query
import { age_sex_chronic as asc} from '../queries/records'


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


export class MedicalEvalAnalytics extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			data:null
		}
	}

	


	render() {
		return (
				<Container style={styles.container}>
					{/*<Row style={styles.row}>
						<Boxx/>
						<Boxx/>
					</Row>*/}
					<Row style={styles.row}>
						<Query query={asc}>
							{({ data, loading, error }) => {
								if (loading) return <p>Loading...</p>;
								if (error) return <p>Error :(</p>;
								//console.log(data.getEvalMedicalRecords);
								return (
									<BrushBarChronicComponent data={data} />
								);
							}}
						</Query>
					</Row>
				</Container>		
		);
	}
}