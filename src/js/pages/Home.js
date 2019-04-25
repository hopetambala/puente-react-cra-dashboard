import React from 'react';
import { Row, Container } from 'react-bootstrap';
import { BrowserRouter as Route, Link } from "react-router-dom";

//Components
import { Boxx } from '../components/widget/Boxx/Boxx';
import { LeafletMap } from '../components/widget/Map/LeafletMap';

import { BarChart } from '../components/d3/barchart/BarChart';

//Pages
import {MedicalEvalAnalytics} from '../pages/MedicalEval';


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
					{/*<BarChart data={[5,10,1,3,10,20,30]} size={[500,500]}></BarChart>*/}

					<Row style={styles.row}>
						
						<Link to="/medicalanalytics" ><Boxx/></Link>
						
						<Boxx/>
						<Boxx/>
					</Row>
					<Row style={styles.row}>
						<LeafletMap />
					</Row>

					

				</Container>		
		);
	}
}