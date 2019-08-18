import React from 'react';
import { Row, Container, Col, ProgressBar } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import * as d3 from 'd3';
import * as _ from "underscore";

//Components
import { BrushBarChronicComponent } from '../components/recharts/BrushBar_Chronic';
import { StatsBox } from '../components/widget/StatsBox/StatsBox';

//Charts
import { Pie180ChartComponent } from '../components/recharts/PieChart';

//Query
import { allEvalMedicalsByOrganization } from '../queries/records';

const styles = {
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignContent: 'flex-start',
		
	},
	row: {
		alignItems: 'flex-center',
		justifyContent: 'center',
		flex:1,
		marginBottom:0,
		paddingBottom:0
	}
}


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
				<ProgressBar animated now={this.state.progress} />
			}
			{ this.state.progress === 100 && this.state && this.state.medicalFollowupcounts && this.state.allCounts &&
			<>
				<Row style={styles.row}>
					<Col>
						<StatsBox
							Cardsubtitle={"All Evaluations"}
							Cardtitle={" All Evaluations Completed: " + this.state.allCounts}
							Cardtext={""}
							height="150px"
						>
							{/*<Pie180ChartComponent 
								data={this.state.sexes}
								valueKey="value" 
							/>*/}
						</StatsBox>
						<StatsBox
							Cardsubtitle={"Patients"}
							Cardtitle={"Patients Identified: " + this.state.allUniqueCounts}
							Cardtext={""}
							height="150px"
						>
							{/*<Pie180ChartComponent 
								data={this.state.sexes}
								valueKey="value" 
							/>*/}
						</StatsBox>
							
					</Col>
					<Col>
						<StatsBox
							Cardsubtitle={"All Evaluations: Doctor Visits"}
							Cardtitle={"Seen Doctor Regarding Issue: " + this.state.view_seendoctorcounts.Yes}
							Cardtext={""}
							height="300px"
						>
							<Pie180ChartComponent 
							data={this.state.seendoctorcounts}
							valueKey="value" />
						</StatsBox>
					</Col>
					<Col>
						<StatsBox
							Cardsubtitle={"All Evaluations: Parts of Body"}
							Cardtitle={"Biggest Problem: " + this.state.partofbodycounts[0].key}
							Cardtext={this.state.partofbodycounts[0].value}
							height="300px"
						>
							<Pie180ChartComponent 
							data={this.state.partofbodycounts}
							valueKey="value" />
						</StatsBox>
					</Col>
				</Row>
				<Row style={styles.row}>
					<Col>
						<StatsBox
							Cardsubtitle={"All Evaluations: Assessments"}
							Cardtitle={"Medical Follow-Up Requested : " + this.state.view_medicalFollowupcounts.Yes}
							Cardtext={""}
							height="300px"
						>
							<Pie180ChartComponent 
							data={this.state.medicalFollowupcounts}
							valueKey="value" />
						</StatsBox>
					</Col>
					<Col>
						<StatsBox
							Cardsubtitle={"All Evaluations: Assessments"}
							Cardtitle={"Surgical Follow-Up Requested : " + this.state.view_surgicalFollowupcounts.Yes}
							Cardtext={""}
							height="300px"
						>
							<Pie180ChartComponent 
							data={this.state.surgicalFollowupcounts}
							valueKey="value" />
						</StatsBox>
					</Col>
					<Col>
						<StatsBox
							Cardsubtitle={"All Evaluations: Assessments"}
							Cardtitle={"Immediate Follow-Up Requested : " + this.state.view_immediateFollowupcounts.Yes}
							Cardtext={""}
							height="300px"
						>
							<Pie180ChartComponent 
							data={this.state.immediateFollowupcounts}
							valueKey="value" />
						</StatsBox>
					</Col>
				</Row>
			</>
				
			}
				<Row style={styles.row}>
					{ this.state.data !== null &&
					<Col>
						<BrushBarChronicComponent data={this.state.data} />
					</Col>
					}
				</Row>
			</Container>		
		);
	}
}

export default withApollo(MedicalEvalAnalytics);
