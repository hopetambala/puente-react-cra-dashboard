import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { withApollo } from 'react-apollo';

import * as d3 from 'd3';

// Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LoadingDots from '../components/styles/LoadingDots';

// Styles
import { styles, cardStyle } from "../../styles";
import labelStyle from "../components/map-manager/Label.module.css";

//Charts
import { Pie180ChartComponent } from '../components/recharts/PieChart';
import { ThreeDimenEnvComponent } from '../components/recharts/Scatter_Env';

//Query
import { allEnvsByOrganization} from '../queries/records';


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
					<LoadingDots />
				}
				{ this.state.progress === 100 && this.state.data && this.state.allCounts &&
				<>
					<Row style={styles.row}>
						<Col>
							<Card style={cardStyle.card}>
							<CardContent>
								<span className={labelStyle.tag} >
									<Typography  variant="h6" component="h6"  gutterBottom>
										metrics on pop. survey
									</Typography>
								</span>
								<Typography variant="h4" component="h4">
									Environmental Health Surveys Completed: {this.state.allCounts}
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
									metrics on pop. survey
									</Typography>
								</span>
								<Typography variant="h5" component="h5">
									Average Family Size: {this.state.averageFamily}
								</Typography>
							</CardContent>
							</Card>
							<Card style={cardStyle.card}>
								<CardContent>
									<span className={labelStyle.tag} >
										<Typography  variant="h6" component="h6"  gutterBottom>
										metrics on pop. survey
										</Typography>
									</span>
									<Typography variant="h5" component="h5">
									Average Number of Children (Less than Age 5): {this.state.averageFamilyUnder5}
									</Typography>
								</CardContent>
							</Card>
						</Col>
						<Col>
							<Card style={cardStyle.card}>
							<CardContent>
								<span className={labelStyle.tag} >
									<Typography  variant="h6" component="h6"  gutterBottom>
										metrics on health access
									</Typography>
								</span>
								<Typography variant="h4" component="h4">
									Latrine/Toilet Access: {this.state.view_latrineCounts.Y}
								</Typography>
								<Typography style={cardStyle.pos} color="textSecondary">
								<Pie180ChartComponent 
									data={this.state.latrineCounts}
									valueKey="value" 
									/>
								</Typography>
							</CardContent>
							</Card>
						</Col>
					</Row>
					<Row style={styles.row}>
						<Col>
							{/* <StatsBox
								Cardsubtitle={"Accessibility: Health"}
								Cardtitle={"Clinic Access: " + this.state.view_clinicCounts.Y}
								Cardtext={""}
								height="300px"
							>
								<Pie180ChartComponent 
									data={this.state.clinicCounts}
									valueKey="value" 
									/>
							</StatsBox> */}
							<Card style={cardStyle.card}>
								<CardContent>
									<span className={labelStyle.tag} >
										<Typography  variant="h6" component="h6"  gutterBottom>
											metrics on health access
										</Typography>
									</span>
									<Typography variant="h4" component="h4">
										Clinic Access: {this.state.view_clinicCounts.Y}
									</Typography>
									<Typography style={cardStyle.pos} color="textSecondary">
										<Pie180ChartComponent 
											data={this.state.clinicCounts}
											valueKey="value" 
										/>
									</Typography>
								</CardContent>
							</Card>
						</Col>
						<Col>
							<Card style={cardStyle.card}>
								<CardContent>
									<span className={labelStyle.tag} >
										<Typography  variant="h6" component="h6"  gutterBottom>
											metrics on enviro. access
										</Typography>
									</span>
									<Typography variant="h4" component="h4">
										Highest Prevalence of Water Access: {this.state.waterCounts[0].key}
									</Typography>
									<Typography style={cardStyle.pos} color="textSecondary">
										<Pie180ChartComponent 
											data={this.state.waterCounts}
											valueKey="value" 
										/>
									</Typography>
								</CardContent>
							</Card>
						</Col>
						<Col>
							<Card style={cardStyle.card}>
								<CardContent>
									<span className={labelStyle.tag} >
										<Typography  variant="h6" component="h6"  gutterBottom>
											metrics on enviro. access
										</Typography>
									</span>
									<Typography variant="h4" component="h4">
										Highest Prevalence of Water Type: {this.state.typeofWaterCounts[0].key}
									</Typography>
									<Typography style={cardStyle.pos} color="textSecondary">
										<Pie180ChartComponent 
											data={this.state.typeofWaterCounts}
											valueKey="value" 
										/>
									</Typography>
								</CardContent>
							</Card>
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
 