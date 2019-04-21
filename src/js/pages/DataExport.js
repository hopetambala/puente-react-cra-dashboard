import React from 'react';
import Form from 'react-bootstrap/Form';
import { ResultsTable } from '../components/widget/Table/Table';

import 'bootstrap/dist/css/bootstrap.css';

const styles = {
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		//alignItems: 'flex-center',
		alignContent: 'flex-start',
		paddingTop: '2.5%'
		
	},
	row: {
		//height:'100vh',	
		justifyContent: 'center',
		flex:1,
		marginBottom:0,
		paddingBottom:0
	}
  }

export class ExportPage extends React.Component {
	render() {
		return (
			<div style={styles.container}>
				<ResultsTable />
			</div>
		);
	}
}