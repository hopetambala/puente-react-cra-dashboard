import React from 'react';
import { Row, Container } from 'react-bootstrap';

//Components
import { LeafletMap } from '../components/widget/Map/LeafletMap';

//Apollo
import { Query } from 'react-apollo';
import { all_records } from '../queries/records';


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


export class MapPage extends React.Component {
	render() {
		return (
				<Container style={styles.container}>
					<h1>Map</h1>
					<Row style={styles.row}>
						<Query query={all_records}>
							{({ data, loading, error }) => {
								if (loading) return <p>Loading...</p>;
								if (error) return <p>Error :(</p>;
								return (
									<LeafletMap data={data}/>
								);
							}}
						</Query>
					</Row>

				</Container>		
		);
	}
}