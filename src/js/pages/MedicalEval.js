import React from 'react';
import { Row, Container } from 'react-bootstrap';
import { Query } from 'react-apollo';

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


const dataQuery = () => (
	<Query query={asc}>
		{({ data, loading, error }) => {
			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error :(</p>;
				
			return (
				console.log(data.getEvalMedicalRecords)
			);
		}}
	</Query>
)

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
					<Row style={styles.row}>
						<Boxx/>
						<Boxx/>
					</Row>
					<Row style={styles.row}>
						<BrushBarChronicComponent />
					</Row>

					<Query query={asc}>
					{({ data, loading, error }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error :(</p>;
						console.log(data.getEvalMedicalRecords);
						this.setState({
							data : data.getEvalMedicalRecords
						}) 
							
						return (
							<div></div>
						);
					}}
					</Query>

					{/* */}
					
				</Container>		
		);
	}
}