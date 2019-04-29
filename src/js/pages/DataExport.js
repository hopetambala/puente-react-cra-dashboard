import React from 'react';
import { Button,Row,Col } from 'react-bootstrap'
import { ApolloConsumer } from 'react-apollo';
import { Form, Field } from 'react-final-form';


//Components
import { ResultsTable } from '../components/widget/Table/Table';

//Queries
import { all_records } from '../queries/records';


//Styling
import Styles from '../components/styles/Styles'
import 'bootstrap/dist/css/bootstrap.css';

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

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  const onSubmit = async values => {
	await sleep(300)
	window.alert(JSON.stringify(values, 0, 2))
  }

export class ExportPage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			type:null,
			org:null

		}
	}

	render() {
		return (
			<Styles style={styles.container}>
			<h1>🏁 Data Exporter</h1>
			<Form
				onSubmit={onSubmit}
				initialValues={{ type: 'all', organization: '' }}
				render={({ handleSubmit, form, submitting, pristine, values }) => (
				<form onSubmit={handleSubmit}>
				<div>
					<label>Record Type</label>
					<Field name="type" component="select">
						<option />
						<option value="dem">Demographics Only</option>
						<option value="med">Dem + Medical Evaluation</option>
						<option value="env">Dem + Environmental Health</option>
					</Field>
				</div>
				<div>
					<label>Toppings</label>
					<Field name="organization" component="select" >
						<option />
						<option value="Puente">Puente</option>
						<option value="One World Surgery">One World Surgery</option>
						<option value="WOF">World Outreach Foundation</option>
					</Field>
				</div>
				
				<div className="buttons">
					<button type="submit" disabled={submitting || pristine}>
						Submit
					</button>

					<button
						type="button"
						onClick={form.reset}
						disabled={submitting || pristine}>
						Reset
					</button>
				</div>
				<pre>{JSON.stringify(values, 0, 2)}</pre>
				</form>
			)}
			/>
		</Styles>
		);
	}
}