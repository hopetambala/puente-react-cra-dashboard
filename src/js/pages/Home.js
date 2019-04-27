import React from 'react';
import { Row, Container } from 'react-bootstrap';
import { BrowserRouter as Route, Link } from "react-router-dom";

//Components
import { Boxx } from '../components/widget/Boxx/Boxx';
import { LeafletMap } from '../components/widget/Map/LeafletMap';

import { BarChart } from '../components/d3/barchart/BarChart';

//Pages
import {MedicalEvalAnalytics} from '../pages/MedicalEval';

//Assets
import health from '../../assets/health.png';
import env from '../../assets/env.png'
import people from '../../assets/people.png'


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
	constructor(props){
		super(props)
	}

	render() {
		return (
				<Container style={styles.container}>

					<Row style={styles.row}>
						
						<Link to="/medicalanalytics" ><Boxx background={health}/></Link>
						
						<Boxx background={env}/>
						<Boxx background={people}/>
					</Row>
					<Row style={styles.row}>
						<LeafletMap />
					</Row>

					

				</Container>		
		);
	}
}