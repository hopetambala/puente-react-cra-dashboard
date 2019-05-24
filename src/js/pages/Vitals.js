import React from 'react';
import { Row, Container } from 'react-bootstrap';
import { Query, withApollo } from 'react-apollo';

//Components
import { Boxx } from '../components/widget/Boxx/Boxx';
import { PivotTableComponent } from '../components/pivottable/PivotTable';

//Query
import { vitals as vits} from '../queries/records';


const styles = {
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignContent: 'flex-start',
		paddingTop: '5%'
		
	},
	row: {
		justifyContent: 'center',
		flex:1,
		marginBottom:0,
		paddingBottom:0
	}
}


export class VitalsAnalytics extends React.Component {
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
						<Query query={vits}>
							{({ data, loading, error }) => {
								if (loading) return <p>Loading...</p>;
								if (error) return <p>Error :(</p>;
								//console.log(data.getVitals);
								return (
									<PivotTableComponent data={data} />
								);
							}}
						</Query>
					</Row>
				</Container>		
		);
	}
}