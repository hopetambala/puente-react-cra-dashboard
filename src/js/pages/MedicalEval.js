import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import * as d3 from 'd3';
import * as _ from "underscore";

// Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LoadingDots from '../components/styles/LoadingDots';
// import { BrushBarChronicComponent } from '../components/recharts/BrushBar_Chronic';

// Styles
import { styles, cardStyle } from "../../styles";
import labelStyle from "../components/map-manager/Label.module.css";


//Charts
import { Pie180ChartComponent } from '../components/recharts/PieChart';

//Query
import { allEvalMedicalsByOrganization } from '../queries/records';

class MedicalEvalAnalytics extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			data:null,
			progress: 25,
			organization:"All",
			allCounts:"null"
		}
	}

	componentDidMount = async () => {
		const { client, organization } = this.props;
		let res = await client.query({query: allEvalMedicalsByOrganization ,variables: {organization: organization }});
		this.setState({data: res.data.getEvalMedicalByOrganization});
		await this.dataWrangle();
		await this.setState({
			progress: 100
		});
	
	}

	componentDidUpdate = async(prevProps) => {
		if((this.props.organization !== prevProps.organization)){
			const { client, organization } = this.props;
			let res = await client.query({query: allEvalMedicalsByOrganization ,variables: {organization: organization }});
			this.setState({data: res.data.getEvalMedicalByOrganization});
			await this.dataWrangle();
			await this.setState({
				progress: 100
			});
		}
	}

	async dataWrangle(){
		var modData = await this.state.data

		//Count of All Eval Med Records
		var allEvalMedCounts = d3.nest()
			.rollup(function(v) { return v.length; })
			.object(modData);

		let uniqmodData = _.uniq(modData, function(x){
			return x.objectId;
		});

		var allEvalMedPatientCounts = d3.nest()
			.rollup(function(v) { return v.length; })
			.object(uniqmodData); //unique values only

		
		/*
			Medical
		*/
		var AssessmentandEvaluationCounts = await d3.nest()
			.key(function(d) { return d.AssessmentandEvaluation; })
			.rollup(function(v) { return  v.length; })
			.entries(modData);
		var AssessmentandEvaluationCountsObject = await d3.nest()
			.key(function(d) { return d.AssessmentandEvaluation; })
			.rollup(function(v) { return  v.length; })
			.object(modData);
		
		var	AssessmentandEvaluationCounts_cleaned = [];
		
		for (let i=0; i < AssessmentandEvaluationCounts.length; i++){
			if (AssessmentandEvaluationCounts[i].key === "Yes" || AssessmentandEvaluationCounts[i].key === "No"){
				AssessmentandEvaluationCounts_cleaned.push(AssessmentandEvaluationCounts[i])
			}
		}
		/*
			Surgical
		*/
		var AssessmentandEvaluation_SurgicalCounts = d3.nest()
			.key(function(d) { if("Yes" || "No") return d.AssessmentandEvaluation_Surgical; })
			.rollup(function(v) { return  v.length; })
			.entries(modData);
		var AssessmentandEvaluation_SurgicalCountsObject = d3.nest()
			.key(function(d) { if("Yes" || "No") return d.AssessmentandEvaluation_Surgical; })
			.rollup(function(v) { return  v.length; })
			.object(modData);
		
		console.log(AssessmentandEvaluation_SurgicalCountsObject)

		/*
			Immediate
		*/
		var immediate_follow_upCounts = d3.nest()
			.key(function(d) { return d.immediate_follow_up; })
			.rollup(function(v) { return  v.length; })
			.entries(modData);
		var immediate_follow_upCountsObject = d3.nest()
			.key(function(d) { return d.immediate_follow_up; })
			.rollup(function(v) { return  v.length; })
			.object(modData);

		/*
			Seen Doctor
		*/
		var seenDoctorCounts = await d3.nest()
			.key(function(d) { return d.seen_doctor; })
			.rollup(function(v) { return  v.length; })
			.entries(modData);
		var seenDoctorCountsObject = d3.nest()
			.key(function(d) { return d.seen_doctor; })
			.rollup(function(v) { return  v.length; })
			.object(modData);

		/*
			Part Of Body
		*/
		var part_of_bodyCounts = await d3.nest()
			.key(function(d) { return d.part_of_body; })
			.rollup(function(v) { return  v.length; })
			.entries(modData);

		part_of_bodyCounts.sort(function(a,b) {
			return b.value - a.value;
		});	
		var part_of_bodyCountsObject = d3.nest()
			.key(function(d) { return d.part_of_body; })
			.rollup(function(v) { return  v.length; })
			.object(modData);

	
		/*
			Set State
		*/
		this.setState({
			allCounts: allEvalMedCounts,
			allUniqueCounts: allEvalMedPatientCounts,
			medicalFollowupcounts:AssessmentandEvaluationCounts_cleaned,
			surgicalFollowupcounts:AssessmentandEvaluation_SurgicalCounts,
			immediateFollowupcounts:immediate_follow_upCounts,
			seendoctorcounts:seenDoctorCounts,
			partofbodycounts: part_of_bodyCounts,

			view_medicalFollowupcounts: AssessmentandEvaluationCountsObject,
			view_surgicalFollowupcounts: AssessmentandEvaluation_SurgicalCountsObject,
			view_immediateFollowupcounts:immediate_follow_upCountsObject,
			view_seendoctorcounts:seenDoctorCountsObject,
			view_part_of_bodyCountsObject:part_of_bodyCountsObject,

			progress: 100
		})

	}

	render() {
		return (
			<Container style={styles.container}>
			{ this.state.progress < 95 && this.state &&
				<LoadingDots />
			}
			{ this.state.progress === 100 && this.state && this.state.medicalFollowupcounts && this.state.allCounts &&
			<>
				<Row style={styles.row}>
					<Col>
				
						<Card style={cardStyle.card}>
						<CardContent>
							<span className={labelStyle.tag} >
								<Typography  variant="h6" component="h6"  gutterBottom>
								metrics on all evaluations
								</Typography>
							</span>
							<Typography variant="h5" component="h5">
								All Evaluations Completed: {this.state.allCounts}
							</Typography>
						</CardContent>
						</Card>
						<Card style={cardStyle.card}>
						<CardContent>
							<span className={labelStyle.tag} >
								<Typography  variant="h6" component="h6"  gutterBottom>
								metrics on all patients
								</Typography>
							</span>
							<Typography variant="h5" component="h5">
								Patients Identified: {this.state.allUniqueCounts}
							</Typography>
						</CardContent>
						</Card>
							
					</Col>
					<Col>
						{/* <StatsBox
							Cardsubtitle={"All Evaluations: Doctor Visits"}
							Cardtitle={"Seen Doctor Regarding Issue: " + this.state.view_seendoctorcounts.Yes}
							Cardtext={""}
							height="300px"
						>
							<Pie180ChartComponent 
							data={this.state.seendoctorcounts}
							valueKey="value" />
						</StatsBox> */}
						<Card style={cardStyle.card}>
							<CardContent>
								<span className={labelStyle.tag} >
									<Typography  variant="h6" component="h6"  gutterBottom>
										metrics on doctor visits
									</Typography>
								</span>
								<Typography variant="h4" component="h4">
									Seen Doctor Regarding Issue:: {this.state.view_seendoctorcounts.Yes}
								</Typography>
								<Pie180ChartComponent 
								data={this.state.seendoctorcounts}
								valueKey="value" />
							</CardContent>
						</Card>
					</Col>
					<Col>
						<Card style={cardStyle.card}>
							<CardContent>
								<span className={labelStyle.tag} >
									<Typography  variant="h6" component="h6"  gutterBottom>
										metrics on problem areas
									</Typography>
								</span>
								<Typography variant="h4" component="h4">
									Biggest Problem: {this.state.partofbodycounts[0].key}
								</Typography>
								<Typography variant="h6" component="h6">
									{this.state.partofbodycounts[0].value}
								</Typography>
								<Pie180ChartComponent 
									data={this.state.partofbodycounts}
									valueKey="value" 
								/>
							</CardContent>
						</Card>
					</Col>
				</Row>
				<Row style={styles.row}>
					<Col>
						<Card style={cardStyle.card}>
							<CardContent>
								<span className={labelStyle.tag} >
									<Typography  variant="h6" component="h6"  gutterBottom>
										metrics on assessments
									</Typography>
								</span>
								<Typography variant="h4" component="h4">
									Medical Follow-Up Requested: {this.state.view_medicalFollowupcounts.Yes}
								</Typography>
								<Pie180ChartComponent 
								data={this.state.medicalFollowupcounts}
								valueKey="value" />
							</CardContent>
						</Card>
					</Col>
					<Col>
						<Card style={cardStyle.card}>
							<CardContent>
								<span className={labelStyle.tag} >
									<Typography  variant="h6" component="h6"  gutterBottom>
										metrics on assessments
									</Typography>
								</span>
								<Typography variant="h4" component="h4">
									Surgical Follow-Up Requested: {this.state.view_surgicalFollowupcounts.Yes}
								</Typography>
								<Pie180ChartComponent 
								data={this.state.surgicalFollowupcounts}
								valueKey="value" />
							</CardContent>
						</Card>
					</Col>
					<Col>
						<Card style={cardStyle.card}>
							<CardContent>
								<span className={labelStyle.tag} >
									<Typography  variant="h6" component="h6"  gutterBottom>
										metrics on assessments
									</Typography>
								</span>
								<Typography variant="h4" component="h4">
									Surgical Follow-Up Requested: {this.state.view_immediateFollowupcounts.Yes}
								</Typography>
								<Pie180ChartComponent 
								data={this.state.immediateFollowupcounts}
								valueKey="value" />
							</CardContent>
						</Card>
					</Col>
				</Row>
			</>
				
			}
				{/* <Row style={styles.row}>
					{ this.state.data !== null &&
					<Col>
						<BrushBarChronicComponent data={this.state.data} />
					</Col>
					}
				</Row> */}
			</Container>		
		);
	}
}

export default withApollo(MedicalEvalAnalytics);
