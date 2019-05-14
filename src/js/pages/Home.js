import React from 'react';
import { Row, Container, Button } from 'react-bootstrap';
import { Form, Field } from 'react-final-form';
import { BrowserRouter as  Router, Route, Link  } from "react-router-dom";
import styled from 'styled-components';

//Components
import { DemographicsAnalytics} from '../pages/Demographics';
import { MedicalEvalAnalytics} from '../pages/MedicalEval';
import { EnvironHealthAnalytics } from '../pages/EnvironHealth';
import { VitalsAnalytics } from '../pages/Vitals';
import { LineChart_GeneralComponent } from '../components/recharts/LineChart_General';
import { Selector } from '../components/Selector';

//Assets
import medical from '../../assets/medical.png';
import env from '../../assets/env.png';
import vitals from '../../assets/vitals.png';
import {HomePageText} from '../providers/Text';


//Apollo
import { Query } from 'react-apollo';
import { all_records } from '../queries/records';


const styles = {
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignContent: 'flex-start',
		paddingTop: '5%'
		
	},
	row: {
		justifyContent: 'center',
		flex:1,
		marginBottom:0,
		paddingBottom:0
	}
}

const StyledLink = styled(Link)`
    text-decoration: none;
	
	color: black;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
	}
	margin: 2%;
`;



export class HomePage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			topMargin: "0%",
			organization:null,
			form:null
		}
		
	}
	
	componentDidMount() {
		//window.addEventListener("resize", this.resize.bind(this));
		//this.resize();
	}
	  
	resize() {
		if (window.innerWidth <= 760){
			this.setState({
				topMargin:"15%"
			})
		}
	}

	onSubmit = async (values) => {
		await this.setState({
			form: values.form,
			org: values.organization,
		})

	}

	render() {
		return (
		<Router style={{marginTop:this.state.topMargin}}>
			<Container style={styles.container}>
				<Row styles={styles.row}>
					{/*<Selector ></Selector>*/}
					<Form
						onSubmit={this.onSubmit}
						initialValues={{ form:"", organization: 'all' }}
						render={({ handleSubmit, form, submitting, pristine, values }) => (
						<form onSubmit={handleSubmit} class="form-group">
							<div class="row">
								<div>
									<label>Form Select</label>
									<Field name="form" component="select" class="form-control" >
										<option></option>
										<option value="/demographicanalytics">Demographics</option>
										<option value="medicalanalytics">Medical Evaluation</option>
									
									</Field>
								</div>
								<div>
									<label>Organization Select</label>
									<Field name="organization" component="select" class="form-control">
										<option value="all"></option>
										<option value="Puente">Puente</option>
										<option value="One World Surgery">One World Surgery</option>
										<option value="WOF">World Outreach Foundation</option>
										<option value="Constanza Medical Mission">Constanza Medical Mission</option>
									</Field>
								</div>
								<div>
									<Button type="submit" disabled={submitting || pristine} style={{marginTop:"35%"}}>
										Submit
									</Button>
								</div>
							</div>	
						</form>	
					)}
					/>
				</Row>
				
			{/**/}
				
				<Row style={styles.row}>
					<Route 
						exact path="/demographicanalytics" 
						render={(props) => <DemographicsAnalytics {...props} isAuthed={true} />} />
					<Route exact path="/medicalanalytics" component={MedicalEvalAnalytics} />
					<Route path="/envalanalytics" component={EnvironHealthAnalytics} />
					<Route path="/vitalanalytics" component={VitalsAnalytics} />
				</Row>
				
			</Container>
		</Router>
		);
	}
}

function GeneralAnalytics() {
	return (
		<div>
			{/*<Row style={styles.row}>
				<StyledLink to="/medicalanalytics">
					<Boxx 
						Cardtitle={HomePageText.medical.title} 
						Cardsubtitle={HomePageText.medical.subtitle} 
						Cardtext={HomePageText.medical.text}
						height="200px"
						background={medical}/>
				</StyledLink>
				
				<StyledLink to="/envalanalytics" >
					<Boxx 
						Cardtitle={HomePageText.environmentalhealth.title} 
						Cardsubtitle={HomePageText.environmentalhealth.subtitle} 
						Cardtext={HomePageText.environmentalhealth.text} 
						height="200px"
						background={env}/>
				</StyledLink>
				<StyledLink to="/vitalanalytics">
					<Boxx 
						Cardtitle={HomePageText.vitals.title} 
						Cardsubtitle={HomePageText.vitals.subtitle} 
						Cardtext={HomePageText.vitals.text} 
						height="200px"
						background={vitals}/>
				</StyledLink>
			</Row> */}
			<Row style={styles.rows}>
				<Query query={all_records}>
				{({ data, loading, error }) => {
					if (loading) return <p>Loading...</p>;
					if (error) return <p>Error :(</p>;
					//console.log(data.getEvalMedicalRecords);
					return (
						<LineChart_GeneralComponent data={data} />
					);
				}}
				</Query>
			</Row>
		</div>
	);
}

