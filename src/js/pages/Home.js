import React from 'react';
import { Row, Container } from 'react-bootstrap';

//Components
import { Boxx } from '../components/widget/Boxx/Boxx';
import { Map } from '../components/widget/Map/Map';

import { BarChart } from '../components/d3/barchart/BarChart';


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

export class HomePage extends React.Component {
	render() {
		return (
				<Container style={styles.container}>
					<BarChart data={[5,10,1,3,10,20,30]} size={[500,500]}></BarChart>

					<Row style={styles.row}>
						<Boxx/>
						<Boxx/>
						<Boxx/>
						<Boxx/>
					</Row>
					<Row style={styles.row}>
						<Map/>
					</Row>
					<Row>
						{/*<Query query={fl}>
							{({ data, loading, error }) => {
								if (loading) return <p>Loading...</p>;
								if (error) return <p>Error :(</p>;
								return data.getPeople.map(({ fname, lname }) =>
									//<div key={fname}>
									//	<h1>{fname}: {lname}</h1>
									//</div>
									console.log(fname,lname)
								);
							}}
						</Query> */}
					</Row>
				</Container>		
		);
	}
}