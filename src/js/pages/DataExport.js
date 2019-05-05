import React from 'react';
import { Button,Row,Col } from 'react-bootstrap'
import { Query, ApolloConsumer } from 'react-apollo';
import { Form, Field } from 'react-final-form';


//Components
import { DataTable } from '../components/widget/Table/DataTable';
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
	},
	button: {
		backgroundColor:'white'
	}
  }

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
			<>
				<Button style={styles.button}>
				{console.log(data)}
					<CSVLink data={data.getPeopleByOrganization}>
						Download
					</CSVLink>
				</Button>
				<DataTable data={data.getPeopleByOrganization} />
			</>
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
			<>
				<Button style={styles.button}>
				{console.log(data)}
					<CSVLink data={data.getVitalByOrganization}>
						Download
					</CSVLink>
				</Button>
				<DataTable data={data.getVitalByOrganization} />
			</>
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
			<>
			<Button style={styles.button}>
				{console.log(data)}
					<CSVLink data={data.getEnvByOrganization}>
						Download
					</CSVLink>
				</Button>
				<DataTable data={data.getEnvByOrganization} />
			</>
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
			<>
				<Button style={styles.button}>
				{console.log(data)}
					<CSVLink data={data.getEvalMedicalByOrganization}>
						Download
					</CSVLink>
				</Button>
				<DataTable data={data.getEvalMedicalByOrganization} />
			</>
		);
		}}
	</Query>
);

export class ExportPage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			type:"Demographics",
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
		if (this.state.type === "Demographics") {
			aThing = <Dem organization={this.state.org} />;
		} 
		else if (this.state.type === "Medical Evaluation") {
			aThing = <EvalMedical organization={this.state.org} />;
		}
		else if (this.state.type === "Environmental Health") {
			aThing = <EnvHealth organization={this.state.org} />;
		}
		else if (this.state.type === "Vitals") {
			aThing = <Vitals organization={this.state.org} />;
		}



		return (
			<>
			<Styles style={styles.container}>
			<h1>🏁 Data Exporter</h1>
			<Form
				onSubmit={this.onSubmit}
				initialValues={{ type: 'Demographics', organization: 'Puente' }}
				render={({ handleSubmit, form, submitting, pristine, values }) => (
				<form onSubmit={handleSubmit}>
				<div>
					<label>Record Type</label>
					<Field name="type" component="select">
						<option value="Demographics">Demographics Only</option>
						<option value="Medical Evaluation">Dem + Medical Evaluation</option>
						<option value="Environmental Health">Dem + Environmental Health</option>
						<option value="Vitals">Dem + Vitals</option>
					</Field>
				</div>
				<div>
					<label>Organizations</label>
					<Field name="organization" component="select" >
						<option value="Puente">Puente</option>
						<option value="One World Surgery">One World Surgery</option>
						<option value="WOF">World Outreach Foundation</option>
						<option value="Constanza Medical Mission">Constanza Medical Mission</option>
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
				<div>
					{aThing}
				</div>
			</>

		);
	}
}