import React from 'react';
import { Row, Container, Col, ProgressBar, Dropdown, Form as BSForm, Button, ButtonToolbar } from 'react-bootstrap';
import { Form, Field } from 'react-final-form';
import { Query, withApollo } from 'react-apollo';
import * as d3 from 'd3';
import { removeBlanksByKey, get_age, sum } from '../providers/Functions';

//Components
import { StatsBox } from '../components/widget/StatsBox/StatsBox';

//Charts 
import { LineChart_GeneralComponent } from '../components/recharts/LineChart_General';
import { Pie180ChartComponent } from '../components/recharts/PieChart';

//Query
import { allRecordsByOrganization, all_records} from '../queries/records';


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


class DemographicsAnalytics extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			progress: 25,
			organization:"All",
			results:null,
			all: null,
			sexes: null,
			educations:null,
			ageMetrics:null
		}
	}

	/*https://github.com/apollographql/react-apollo/issues/1411*/
	componentDidMount = async () => {
		const {client} = this.props;
	
		let res = await client.query({query: all_records});
		this.setState({
			results: res.data.getPeople,
			progress: 100
		})
		//console.log(this.state.results);
		await this.dataWrangle()
	
		
	}

	async dataWrangle(){
		var modData = this.state.results

		//get ages from date of births
		for(let i =0; i< modData.length; i++ ){
			modData[i].age = get_age(modData[i]['dob']);
		}

		//Count of All Records
		var allCounts = d3.nest()
			.rollup(function(v) { return v.length; })
			.object(modData);

		//Count of Records based on sex
		var sexCounts = d3.nest()
			.key(function(d) { return d.sex; })
			.rollup(function(v) { return  v.length; })
			.entries(modData);
		
		var sexCounts = await removeBlanksByKey(sexCounts,"key")
		
		//Count of All Records based on education
		var educationCounts = d3.nest()
			.key(function(d) { return d.educationLevel; })
			.rollup(function(v) { return  v.length; })
			.entries(modData);

		educationCounts.sort(function(a,b) {
			return b.value - a.value;
		});

		this.setState({
			progress:80
		})

		var educationCounts = await removeBlanksByKey(educationCounts,"key")

		//Average of ages
		var ageAverage = d3.nest()
			.rollup(function(v) { return d3.mean(v, function(d) { return d.age; }); })
			.object(modData);

		var roundedNumber = Math.round(ageAverage * 10) / 10	

		//Count of All recors based on age
		var ageCounts = d3.nest()
			.key(function(d) { return d.age; })
			.rollup(function(v) { return  v.length })
			.entries(modData);

		ageCounts.sort(function(a,b) {
			return b.value - a.value;
		});

		//Count of All records under the age of 6
		var ageUnder6 = d3.nest()
			.key(function(d) { 
				if(d.age < 6) 
					return d.age; 
			})
			.rollup(function(v) { 
				return v.length; 
			})
			.object(modData);
		
		if (undefined in ageUnder6){
			delete ageUnder6.undefined
		}

		var ageUnder6summed = sum(ageUnder6)
		
	
		this.setState({
			all: allCounts,
			sexes: sexCounts,
			educations: educationCounts,
			ageMetrics : [roundedNumber,ageUnder6summed],
			progress: 100
		})

		//console.log(this.state)

	}
	
	onSubmit = async values => {
		if (values.organization != "All"){
			await this.setState({
				organization: values.organization,
				progress:40
			})

			const {client} = this.props;

			let res = await client.query({query: allRecordsByOrganization ,variables: {organization:this.state.organization }});
			this.setState({results: res.data.getPeopleByOrganization})
			//console.log(this.state.results);
			await this.dataWrangle()
		}
		else{
			await this.setState({
				organization: values.organization,
				progress:40
			})
			const {client} = this.props;
			let res = await client.query({query: all_records});
			this.setState({
				results: res.data.getPeople,
				progress: 65
			})
			//console.log(this.state.results);
			await this.dataWrangle()
		}
		
	}

	render() {
		return (
				<Container style={styles.container}>
					<Form
						onSubmit={this.onSubmit}
						initialValues={{ organization: '' }}
						render={({ handleSubmit, form, submitting, pristine, values }) => (
						<BSForm onSubmit={handleSubmit}>
							<Dropdown>
								<label>Organizations</label>
								<Field name="organization" component="select" >
									<option value="All">All</option>
									<option value="Puente">Puente</option>
									<option value="One World Surgery">One World Surgery</option>
									<option value="WOF">World Outreach Foundation</option>
									<option value="Constanza Medical Mission">Constanza Medical Mission</option>
								</Field>
							</Dropdown>
								<Button variant="success" type="submit" disabled={submitting || pristine}>
									Submit
								</Button>
							</BSForm>
							)}
					/>
				{ this.state.progress < 95 && this.state &&
					<>
						<ProgressBar animated now={this.state.progress} />
					</>
				}
				{ this.state.progress == 100 && this.state && this.state.sexes && this.state.educations &&
					<Row style={styles.row}>
					
						<Col>
							<StatsBox
								Cardsubtitle={"Metrics on Records"}
								Cardtitle={" All Records: " + this.state.all}
								Cardtext={""}
								height="300px"
							>
								<Pie180ChartComponent 
									data={this.state.sexes}
									valueKey="value" 
									/>
							</StatsBox>
								
						</Col>
					
						<Col>
							<StatsBox
								Cardsubtitle={"Metrics on Education"}
								Cardtitle={"Highest: " + this.state.educations[0].key}
								Cardtext={this.state.educations[0].value}
								height="300px"
							>
								<Pie180ChartComponent 
								data={this.state.educations}
								valueKey="value" />
							</StatsBox>
						</Col>
						<Col>
						<StatsBox
								Cardsubtitle={"Metrics on Age"}
								Cardtitle={" Average: " + this.state.ageMetrics[0]}
								Cardtext={""}
								height="150px"
							>
								{/*<Pie180ChartComponent 
								data={this.state.ageMetrics[1]}
								valueKey="value" /> */}
							</StatsBox>
							<StatsBox
								Cardsubtitle={"Metrics on Age"}
								Cardtitle={"Less Than Age 5: " + this.state.ageMetrics[1]}
								Cardtext={""}
								height="150px"
							>
								{/*<Pie180ChartComponent 
								data={this.state.ageMetrics[1]}
								valueKey="value" /> */}
							</StatsBox>
						</Col>
							
					</Row>
					}
					{this.state.organization =="All" && 
					<Row style={styles.rows}>
						<Query query={all_records}>
						{({ data, loading, error }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return <p>Error :(</p>;
							return (
								<LineChart_GeneralComponent data={data} />
							);
						}}
						</Query>
					</Row>}
				</Container>		
		);
	}
}


export default withApollo(DemographicsAnalytics);
