import React from 'react';
import { Row, Container, Col, ProgressBar } from 'react-bootstrap';
import { withApollo } from 'react-apollo';

import * as d3 from 'd3';

//Components
import { StatsBox } from '../components/widget/StatsBox/StatsBox';

//Charts
import { Pie180ChartComponent } from '../components/recharts/PieChart';
import { ThreeDimenEnvComponent } from '../components/recharts/Scatter_Env';

//Query
import { allEnvsByOrganization} from '../queries/records';


const styles = {
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		//alignItems: 'flex-center',
		//alignContent: 'flex-start',
		alignContent: 'flex-center',
		//paddingTop: '5%'
		
	},
	row: {
		//height:'100vh',
		alignItems: 'flex-center',
		justifyContent: 'center',
		flex:1,
		marginBottom:0,
		paddingBottom:0
	}
}


class EnvironHealthAnalytics extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			data:null,
			progress: 25,
			organization:"All",
			allCounts:"null"
		}
		
	}
	/*https://github.com/apollographql/react-apollo/issues/1411*/
	componentDidMount = async () => {
		const { client, organization } = this.props;
		let res = await client.query({query: allEnvsByOrganization ,variables: {organization: organization }});
		this.setState({data: res.data.getEnvByOrganization});
		await this.dataWrangle();
		await this.setState({
			progress: 100
		});
	
	}

	componentDidUpdate = async(prevProps) => {
		if((this.props.organization !== prevProps.organization)){
			const { client, organization } = this.props;
			let res = await client.query({query: allEnvsByOrganization ,variables: {organization: organization }});
			this.setState({data: res.data.getEnvByOrganization});
			await this.dataWrangle();
			await this.setState({
				progress: 100
			});
		}
	}

	async dataWrangle(){
		var modData = await this.state.data

		//Count of All Eval Med Records
		var allEnvCounts = await d3.nest()
			.rollup(function(v) { return v.length; })
			.object(modData);

		//Average Family Size
		var averageFamily = await d3.mean(modData, function(d) { return d.numberofIndividualsLivingintheHouse; });
		averageFamily = Math.round(averageFamily * 10) / 10

		var averageFamilyUnder5 = await d3.mean(modData, function(d) { return d.numberofChildrenLivinginHouseUndertheAgeof5; });
		averageFamilyUnder5 = Math.round(averageFamilyUnder5 * 10) / 10


		/*
			Toilet/Latrine Access
		*/
		var latrineCounts = await d3.nest()
			.key(function(d) { return d.latrineAccess; })
			.rollup(function(v) { return  v.length; })
			.entries(modData);
		var latrineCountsObject = await d3.nest()
			.key(function(d) { return d.latrineAccess; })
			.rollup(function(v) { return  v.length; })
			.object(modData);

		/*
			Clinic Access
		*/
		var clinicCounts = await d3.nest()
			.key(function(d) { return d.clinicAccess; })
			.rollup(function(v) { return  v.length; })
			.entries(modData);
		var clinicCountsObject = await d3.nest()
			.key(function(d) { return d.clinicAccess; })
			.rollup(function(v) { return  v.length; })
			.object(modData);

		/*
			Water Access
		*/
		var waterCounts = await d3.nest()
			.key(function(d) { return d.waterAccess; })
			.rollup(function(v) { return  v.length; })
			.entries(modData);
		var waterCountsObject = await d3.nest()
			.key(function(d) { return d.waterAccess; })
			.rollup(function(v) { return  v.length; })
			.object(modData);

		waterCounts.sort(function(a,b) {
			return b.value - a.value;
		});	

		/*
			Water Frequency
		*/
		var typeofWaterCounts = await d3.nest()
			.key(function(d) { return d.typeofWaterdoyoudrink; })
			.rollup(function(v) { return  v.length; })
			.entries(modData);

		typeofWaterCounts.sort(function(a,b) {
			return b.value - a.value;
		});	

		var typeofWaterCountsObject = d3.nest()
			.key(function(d) { return d.typeofWaterdoyoudrink; })
			.rollup(function(v) { return  v.length; })
			.object(modData);
		
		/*
			Set State
		*/
		this.setState({
			allCounts: allEnvCounts,
			averageFamily: averageFamily,
			averageFamilyUnder5:averageFamilyUnder5,

			latrineCounts:latrineCounts,
			view_latrineCounts: latrineCountsObject,

			clinicCounts: clinicCounts,
			view_clinicCounts: clinicCountsObject,

			waterCounts: waterCounts,
			view_waterCounts: waterCountsObject,

			typeofWaterCounts: typeofWaterCounts,
			view_typeofWaterCounts: typeofWaterCountsObject,

			progress: 100
		})

	}

	render() {
		return (
			<Container style={styles.container}>
				{ this.state.progress < 95 && this.state &&
					<ProgressBar animated now={this.state.progress} />
				}
				{ this.state.progress === 100 && this.state.data && this.state.allCounts &&
				<>
					<Row style={styles.row}>
						<Col>
							<StatsBox
								Cardsubtitle={"All Population Surveys"}
								Cardtitle={" Environmental Surveys Completed: " + this.state.allCounts}
								Cardtext={""}
								height="300px"
							>
								
							</StatsBox>
						
						</Col>
						<Col>
							<StatsBox
								Cardsubtitle={"All Population Surveys"}
								Cardtitle={"Average Family Size: " + this.state.averageFamily}
								Cardtext={""}
								height="150px"
							></StatsBox>
							<StatsBox
								Cardsubtitle={"All Population Surveys"}
								Cardtitle={"Average Number of Children (Less than Age 5): " + this.state.averageFamilyUnder5}
								Cardtext={""}
								height="150px"
							></StatsBox>
						</Col>
						<Col>
							<StatsBox
								Cardsubtitle={"Accessibility: Health"}
								Cardtitle={"Latrine/Toilet Access: " + this.state.view_latrineCounts.Y}
								Cardtext={""}
								height="300px"
							>
								<Pie180ChartComponent 
									data={this.state.latrineCounts}
									valueKey="value" 
									/>
							</StatsBox>
						</Col>
					</Row>
					<Row style={styles.row}>
						<Col>
							<StatsBox
								Cardsubtitle={"Accessibility: Health"}
								Cardtitle={"Clinic Access: " + this.state.view_clinicCounts.Y}
								Cardtext={""}
								height="300px"
							>
								<Pie180ChartComponent 
									data={this.state.clinicCounts}
									valueKey="value" 
									/>
							</StatsBox>
						</Col>
						<Col>
							<StatsBox
								Cardsubtitle={"Accessibility: Enviro"}
								Cardtitle={"Highest Prevalence of Water Access: " + this.state.waterCounts[0].key}
								Cardtext={""}
								height="300px"
							>
								<Pie180ChartComponent 
									data={this.state.waterCounts}
									valueKey="value" 
									/>
							</StatsBox>
						</Col>
						<Col>
							<StatsBox
								Cardsubtitle={"Accessibility: Enviro"}
								Cardtitle={"Highest Prevalence of Water Type: " + this.state.typeofWaterCounts[0].key}
								Cardtext={""}
								height="300px"
							>
								<Pie180ChartComponent 
									data={this.state.typeofWaterCounts}
									valueKey="value" 
									/>
							</StatsBox>
						</Col>
					</Row>
					<Row style={styles.row}>
						<Col>
							<ThreeDimenEnvComponent data={this.state.data} />
						</Col>
					</Row>
					
				</>
					
				}
			</Container>
		);
	}
}

export default withApollo(EnvironHealthAnalytics);
 