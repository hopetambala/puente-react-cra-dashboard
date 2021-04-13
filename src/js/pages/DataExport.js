import React from 'react';
import { Query, withApollo} from 'react-apollo';
import { Form, Field } from 'react-final-form';

//Redux
import { connect } from "react-redux";
import { getAuthInfo } from '../reducers/login';

// Styles
import Button from '@material-ui/core/Button';
import {  styles } from '../../styles';

//Components
import { DataTable } from '../components/widget/Table/DataTable';
import LoadingDots from '../components/styles/LoadingDots';

//Queries
import { 
	allRecordsByOrganization,
	allEnvsByOrganization, 
	allVitalsByOrganization,
	allEvalMedicalsByOrganization,
	allHistoryMedicalsByOrganization,
	allCustomSpecs,
	allCustomResultsByFormId,
	allAssetResultsByOrganization
} from '../queries/records';

import { CSVLink } from "react-csv";

//Styling
import Styles from '../components/styles/Styles'
import 'bootstrap/dist/css/bootstrap.css';

const Dem = ({ organization }) => (
	<Query
		query={allRecordsByOrganization}
		variables={{ organization }}
		notifyOnNetworkStatusChange
	>
		{({ loading, error, data, refetch, networkStatus }) => {
		if (networkStatus === 4) return "Refetching!";
		if (loading) return <LoadingDots />;
		if (error) return `Error!: ${error}`;

		return (
			<>
				<Button variant="contained" style={{backgroundColor: styles.theme.lighter_darkbg}}>
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
		if (loading) return <LoadingDots />;
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
		if (loading) return <LoadingDots />;
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
		if (loading) return <LoadingDots />;
		if (error) return `Error!: ${error}`;

		return (
			<>
				<Button variant="contained" style={{backgroundColor: styles.theme.lighter_darkbg}}>
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

const HistoryMedical = ({ organization }) => (
	<Query
		query={allHistoryMedicalsByOrganization}
		variables={{ organization }}
		notifyOnNetworkStatusChange
	>
		{({ loading, error, data, refetch, networkStatus }) => {
		if (networkStatus === 4) return "Refetching!";
		if (loading) return <LoadingDots />;
		if (error) return `Error!: ${error}`;

		return (
			<>
				<Button style={styles.button}>
				{console.log(data)}
					<CSVLink data={data.getMedHistoryByOrganization}>
						Download
					</CSVLink>
				</Button>
				<DataTable data={data.getMedHistoryByOrganization} />
			</>
		);
		}}
	</Query>
);

const AssetData = ({ organization }) => (
	<Query
		query={allAssetResultsByOrganization}
		variables={{ organization }}
		notifyOnNetworkStatusChange
	>
		{({ loading, error, data, refetch, networkStatus }) => {
		if (networkStatus === 4) return "Refetching!";
		if (loading) return <LoadingDots />;
		if (error) return `Error!: ${error}`;

		return (
			<>
				<Button style={styles.button}>
				{console.log(data)}
					<CSVLink data={data.getAssetRecordsByOrganization}>
						Download
					</CSVLink>
				</Button>
				<DataTable data={data.getAssetRecordsByOrganization} />
			</>
		);
		}}
	</Query>
);

class CustomData extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			data: null 
		};
	}

	async clean_data(data){
		var cleaned_data = await data;
		for (let i = 0; i < cleaned_data['getCustomFormResultsbyId'].length; i++) {
			for (let j = 0; j < cleaned_data['getCustomFormResultsbyId'][i]['fields'].length; j++){
				var punctRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.:;<=>?@_`{|}~]/g;

				var question = String(cleaned_data['getCustomFormResultsbyId'][i]['fields'][j].title)
				question = question.replace(punctRE, '');
				var answer = String(cleaned_data['getCustomFormResultsbyId'][i]['fields'][j].answer)
				answer = answer.replace(punctRE, '');

				cleaned_data['getCustomFormResultsbyId'][i][question] = answer
			}
				delete cleaned_data['getCustomFormResultsbyId'][i]['fields']
		}
		this.setState({
			data:cleaned_data
		})
	}

	// async clean_data(data){
	// 	var cleaned_data = await data;
	// 	cleaned_data['getCustomFormResultsbyId'].map((results)=>{
	// 		results['fields'].map((fields)=>{
	// 			var punctRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.:;<=>?@_`{|}~]/g;

	// 			var question = String(fields.title)
	// 			question = question.replace(punctRE, '');
	// 			var answer = String(fields.answer)
	// 			answer = answer.replace(punctRE, '');

	// 			results[question] = answer
	// 		})	
	// 		delete cleaned_data['getCustomFormResultsbyId'].results['fields']
	// 	})
	// 	console.log(cleaned_data)
	// 	this.setState({
	// 		data:cleaned_data
	// 	})
	// }

	componentDidMount = async() => {
		const { client } = this.props;
		let res = await client.query({query: allCustomResultsByFormId, variables: {id: this.props.id }});
		await this.clean_data(res.data);
	}

	render() {
		return(
			<>
			{this.state.data !== null &&
			<>
			<Button style={styles.button}>
				<CSVLink data={this.state.data['getCustomFormResultsbyId']}>
					Download
				</CSVLink>
			</Button>
			<DataTable data={this.state.data['getCustomFormResultsbyId']} />
			</>
			}
			</>);
		
	}
}

class ExportPage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			type:"Demographics",
			org:'Puente',
		}
	}
	
	onSubmit = async (values) => {
		await this.setState({
			type: values.type,
			org: values.organization,
			objectId: values.objectId
		})
	}

	render() {
		let aThing;
		if (this.state.type === "Demographics") {
			aThing = <Dem organization={this.props.authInfo.organization} />;
		} 
		else if (this.state.type === "Medical Evaluation") {
			aThing = <EvalMedical organization={this.props.authInfo.organization} />;
		}
		else if (this.state.type === "Environmental Health") {
			aThing = <EnvHealth organization={this.props.authInfo.organization} />;
		}
		else if (this.state.type === "Vitals") {
			aThing = <Vitals organization={this.props.authInfo.organization} />;
		}
		else if (this.state.type === "Medical History") {
			aThing = <HistoryMedical organization={this.props.authInfo.organization} />;
		}
		else if (this.state.type === "Custom") {
			const CustomWithApollo = withApollo(CustomData);
			aThing = <CustomWithApollo id={this.state.objectId} />;
		}
		else if (this.state.props === "Asset") {
			// const AssetWithApollo = withApollo(AssetData)
			aThing = <AssetData organization={this.props.authInfo.organization} />;
		}

		return (
			<>
			<Styles style={styles.container}>
			<h1>Data Exporter</h1>
			<Form
				onSubmit={this.onSubmit}
				initialValues={{ type: 'Demographics', organization: this.props.authInfo.organization }}
				render={({ handleSubmit, form, submitting, pristine, values }) => (
				<form onSubmit={handleSubmit} style={{backgroundColor: styles.theme.lighter_darkbg}} >
				<div>
					<label>Record Type</label>
					<Field name="type" component="select">
						<option value="Demographics">Demographics Only</option>
						<option value="Medical Evaluation">Dem + Medical Evaluation</option>
						<option value="Environmental Health">Dem + Environmental Health</option>
						<option value="Vitals">Dem + Vitals</option>
						<option value="Medical History">Dem + Medical History</option>
						<option value="Custom">Custom Forms</option>
						<option value="Asset">Asset Forms</option>
					</Field>
				</div>
				{values.type === 'Custom' &&
					<div>
					<label>Forms</label>
					<Field name="objectId" component="select" >
						<Query
							query={allCustomSpecs}
							// variables={{ organization }}
							notifyOnNetworkStatusChange
						>
							{({ loading, error, data, networkStatus }) => {
							if (networkStatus === 4) return "Refetching!";
							if (loading) return <LoadingDots />;
							if (error) return `Error!: ${error}`;

							return (
								<>
								{loading && <LoadingDots />}
								<option></option>
									{data.getCustomFormSpec.map((opt) => {
										return <option key={opt.objectId} value={opt.objectId}>{opt.name}</option>
									})} 
								</>
							);
							}}
						</Query>
					</Field>
					</div>
				}
				
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
				<div style={{margin:"20px"}}>
					{aThing}
				</div>
			</>

		);
	}
}

const mapStateToProps = (state) => {
	return { 
		authInfo: getAuthInfo(state)
	}
};

export default connect(mapStateToProps,null)(ExportPage);
