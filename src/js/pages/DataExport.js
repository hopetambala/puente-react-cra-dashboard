import React from 'react';
import { Button,Row,Col } from 'react-bootstrap'
import { Query, ApolloConsumer } from 'react-apollo';
import { Form, Field } from 'react-final-form';


//Components
import { ResultsTable } from '../components/widget/Table/Table';

//Queries
import { 
	allRecordsByOrganization,
	allEnvsByOrganization, 
	allVitalsByOrganization,
	allEvalMedicalsByOrganization} from '../queries/records';

import { CSVLink } from "react-csv";



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

  /*const onSubmit = async values => {
	await sleep(300)
	window.alert(JSON.stringify(values, 0, 2))
  }*/

const Dem = ({ organization }) => (
	<Query
		query={allRecordsByOrganization}
		variables={{ organization }}
		notifyOnNetworkStatusChange
	>
		{({ loading, error, data, refetch, networkStatus }) => {
		if (networkStatus === 4) return "Refetching!";
		if (loading) return null;
		if (error) return `Error!: ${error}`;

		return (
			<Button>
			{console.log(data)}
				<CSVLink data={data.getPeopleByOrganization}>
					Download me
				</CSVLink>
			</Button>
		);
		}}
	</Query>
);
const Vitals = ({ organization }) => (
	<Query
		query={allVitalsByOrganization}
		variables={{ organization }}
		notifyOnNetworkStatusChange
	>
		{({ loading, error, data, refetch, networkStatus }) => {
		if (networkStatus === 4) return "Refetching!";
		if (loading) return null;
		if (error) return `Error!: ${error}`;

		return (
			<Button>
			{console.log(data)}
				<CSVLink data={data.getVitalByOrganization}>
					Download me
				</CSVLink>
			</Button>
		);
		}}
	</Query>
);

const EnvHealth = ({ organization }) => (
	<Query
		query={allEnvsByOrganization}
		variables={{ organization }}
		notifyOnNetworkStatusChange
	>
		{({ loading, error, data, refetch, networkStatus }) => {
		if (networkStatus === 4) return "Refetching!";
		if (loading) return null;
		if (error) return `Error!: ${error}`;

		return (
			<Button>
			{console.log(data)}
				<CSVLink data={data.getEnvByOrganization}>
					Download me
				</CSVLink>
			</Button>
		);
		}}
	</Query>
);

const EvalMedical = ({ organization }) => (
	<Query
		query={allEvalMedicalsByOrganization}
		variables={{ organization }}
		notifyOnNetworkStatusChange
	>
		{({ loading, error, data, refetch, networkStatus }) => {
		if (networkStatus === 4) return "Refetching!";
		if (loading) return null;
		if (error) return `Error!: ${error}`;

		return (
			<Button>
			{console.log(data)}
				<CSVLink data={data.getEvalMedicalByOrganization}>
					Download me
				</CSVLink>
			</Button>
		);
		}}
	</Query>
);

export class ExportPage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			type:"dem",
			org:'Puente'
		}
	}
	
	onSubmit = async (values) => {
		await this.setState({
			type: values.type,
			org: values.organization,
		})
	}
	

	render() {
		let aThing;
		if (this.state.type === "dem") {
			aThing = <Dem organization={this.state.org} />;
		} 
		else if (this.state.type === "med") {
			aThing = <EvalMedical organization={this.state.org} />;
		}
		else if (this.state.type === "env") {
			aThing = <EnvHealth organization={this.state.org} />;
		}
		else if (this.state.type === "vitals") {
			aThing = <Vitals organization={this.state.org} />;
		}



		return (
			<Styles style={styles.container}>
			<h1>🏁 Data Exporter</h1>
			<Form
				onSubmit={this.onSubmit}
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
						<option value="vitals">Dem + Vitals</option>
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
				<div>
					{aThing}
				</div>
				{/*<Vitals organization={this.state.org} />*/}
				</form>
				
				
			)}
			
		/>
		</Styles>
		);
	}
}