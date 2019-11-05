import React from 'react';
import { Row, Container, Col, ProgressBar } from 'react-bootstrap';
import { Query, withApollo } from 'react-apollo';
import * as d3 from 'd3';
import { removeBlanksByKey, get_age, sum } from '../providers/Functions';

//Components
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LoadingDots from '../components/styles/LoadingDots';


//Redux
import { connect } from "react-redux";
import { getAuthInfo } from '../reducers/login';

//Charts 
import { LineChartGeneralComponent } from '../components/recharts/LineChart_General';
import { Pie180ChartComponent } from '../components/recharts/PieChart';

//Query
import { allRecordsByOrganization, all_records} from '../queries/records';

import { styles, cardStyle } from "../../styles";
import labelStyle from "../components/map-manager/Label.module.css";



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
			ageMetrics:null,
			organizationCounts:null
		}
	}

	/*https://github.com/apollographql/react-apollo/issues/1411*/
	/*componentDidMount = async () => {
		const { client, organization } = this.props;
	
		let res = await client.query({query: allRecordsByOrganization, variables: {organization: organization }});
		this.setState({results: res.data.getPeopleByOrganization});
		//console.log(this.state.results);
		await this.dataWrangle();
		await this.setState({
			progress: 100
		});
	}*/

	componentDidUpdate = async(prevProps) => {
		if((this.props.organization !== prevProps.organization)){

			const { client, organization } = this.props;
			let res = await client.query({query: allRecordsByOrganization, variables: {organization: organization }});
			this.setState({results: res.data.getPeopleByOrganization});

			await this.dataWrangle();
			await this.setState({
				progress: 100
			});
		}
	} 

	async dataWrangle(){
		var modData = await this.state.results

		//get ages from date of births
		if(modData){
			for(let i =0; i< modData.length; i++ ){
				modData[i].age = get_age(modData[i]['dob'], new Date());
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
			
			//var sexCounts = await removeBlanksByKey(sexCounts,"key")
			
			//Count of All Records based on education
			var educationCounts = d3.nest()
				.key(function(d) { return d.educationLevel; })
				.rollup(function(v) { return  v.length; })
				.entries(modData);

			educationCounts.sort(function(a,b) {
				return b.value - a.value;
			});

			//var educationCounts = await removeBlanksByKey(educationCounts,"key")

			this.setState({
				progress:80
			});

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
			

			//Count of All Records based on Organization
			var organizationCounts = d3.nest()
				.key(function(d) { return d.surveyingOrganization; })
				.rollup(function(v) { return  v.length; })
				.entries(modData);

			organizationCounts.sort(function(a,b) {
				return b.value - a.value;
			});

			var organizationCountsCleaned = await removeBlanksByKey(organizationCounts,"key");
		
			this.setState({
				all: allCounts,
				sexes: sexCounts,
				educations: educationCounts,
				ageMetrics : [roundedNumber,ageUnder6summed],
				organizationCounts: organizationCountsCleaned,
				progress: 100
			})
		}
		/*console.log(this.state.educations)
		console.log(this.state.sexes)*/

	}

	async onSubmit(organization){
		if (organization !== "All"){
			await this.setState({
				organization: organization,
				progress:40
			})

			const { client } = this.props;

			let res = await client.query({query: allRecordsByOrganization ,variables: {organization:this.state.organization }});
			this.setState({results: res.data.getPeopleByOrganization})
			await this.dataWrangle()
		}
		else {
			await this.setState({
				organization: organization,
				progress:40
			})
			const {client} = this.props;
			let res = await client.query({query: all_records});
			this.setState({
				results: res.data.getPeople,
				progress: 65
			})
			await this.dataWrangle()
		}
		
	}

	render() {
		return (
			<Container style={styles.container}>
				{/*<Dropdown>
					<Dropdown.Toggle variant="success" id="dropdown-basic">
						{this.state.organization}
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item onClick={()=>{this.onSubmitz("All")}}>All</Dropdown.Item>
						<Dropdown.Item onClick={()=>{this.onSubmitz("Puente")}}>Puente</Dropdown.Item>
						<Dropdown.Item onClick={()=>{this.onSubmitz("One World Surgery")}}>One World Surgery</Dropdown.Item>
						<Dropdown.Item onClick={()=>{this.onSubmitz("WOF")}}>World Outreach Foundation</Dropdown.Item>
						<Dropdown.Item onClick={()=>{this.onSubmitz("Constanza Medical Mission")}}>Constanza Medical Mission</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>*/}
			{ this.state.progress < 95 && this.state &&
				<>
					<LoadingDots />
				</>
			}
			{ this.state.progress === 100 && this.state && this.state.sexes && this.state.educations &&
				<Row style={styles.row}>
					<Col>
						<Card style={cardStyle.card}>
						<CardContent>
							<span className={labelStyle.tag} >
								<Typography  variant="h6" component="h6"  gutterBottom>
									metrics on records
								</Typography>
							</span>
							<Typography variant="h4" component="h4">
								All Records: {this.state.all}
							</Typography>
							<Typography style={cardStyle.pos} color="textSecondary">
								<Pie180ChartComponent data={this.state.sexes} valueKey="value" />
							</Typography>
						</CardContent>
						</Card>	
					</Col>
				
					<Col>
						<Card style={cardStyle.card}>
						<CardContent>
							<span className={labelStyle.tag} >
								<Typography  variant="h6" component="h6"  gutterBottom>
									metrics on education
								</Typography>
							</span>
							<Typography variant="h5" component="h5">
								Highest: {this.state.educations[0].key}
							</Typography>
							<Typography variant="h4" component="h4">
								{this.state.educations[0].value}
							</Typography>
							<Typography className={cardStyle.pos} color="textSecondary">
								<Pie180ChartComponent data={this.state.educations} valueKey="value" />
							</Typography>
						</CardContent>
						</Card>
					</Col>
					<Col>
						<Card style={cardStyle.card}>
						<CardContent>
							<span className={labelStyle.tag} >
								<Typography  variant="h6" component="h6"  gutterBottom>
									metrics on age
								</Typography>
							</span>
							<Typography variant="h5" component="h5">
								Average: {this.state.ageMetrics[0]}
							</Typography>
						</CardContent>
						</Card>

						<Card style={cardStyle.card}>
						<CardContent>
							<span className={labelStyle.tag} >
								<Typography  variant="h6" component="h6"  gutterBottom>
									metrics on age
								</Typography>
							</span>
							<Typography variant="h5" component="h5">
								Less Than Age 5: {this.state.ageMetrics[1]}
							</Typography>
						</CardContent>
						</Card>
					</Col>
				</Row>	
			}
				{this.state.organization === "All" && 
				<Row style={styles.rows}>
					<Query query={all_records}>
					{({ data, loading, error }) => {
						if (loading) return null;
						if (error) return <p>Error :(</p>;
						return (
							<Col>
								<Paper style={cardStyle.card}>
									<LineChartGeneralComponent style={{padding:'5px',color:"whitesmoke"}} data={data} />
								</Paper>
							</Col>
						);
					}}
					</Query>
				</Row>}
			</Container>		
		);
	}
}

const mapStateToProps = (state) => {
	return { 
		authInfo: getAuthInfo(state)
	}
};

export default connect(mapStateToProps,null)(withApollo(DemographicsAnalytics));