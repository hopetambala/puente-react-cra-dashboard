import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { Row, Container, Button, Dropdown } from 'react-bootstrap';
import { Form, Field } from 'react-final-form';
import { Switch, BrowserRouter as  Router, Route, Link  } from "react-router-dom";
import styled from 'styled-components';

//Pages
import { MedicalEvalAnalytics} from '../pages/MedicalEval';
import EnvironHealthAnalytics  from '../pages/EnvironHealth';
import { VitalsAnalytics } from '../pages/Vitals';
import DemographicsAnalytics  from '../pages/Demographics';

//Componenents
import { Selector } from '../components/Selector';

//Assets
import medical from '../../assets/medical.png';
import env from '../../assets/env.png';
import vitals from '../../assets/vitals.png';
import {HomePageText} from '../providers/Text';


//Apollo
import { Query } from 'react-apollo';
import { all_records, allRecordsByOrganization } from '../queries/records';


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
	
	color: white;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
	}
	margin: 0%;
`;
const StyledButton = styled(Button)`
	margin: .1%;
`;



export class HomePage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			url: this.props.match.url,
			topMargin: "0%",
			organization:null
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
			org: values.organization,
		})
	}

	render() {
		return (
			
			<Router style={{marginTop:this.state.topMargin}}>
				<Container style={styles.container}>
					<Row styles={styles.row}>
						<StyledButton>
							<StyledLink to={`/demographicanalytics`}>General</StyledLink>
						</StyledButton>
						<StyledButton>
							<StyledLink to={`/medicalanalytics`}>Medical Evaluation</StyledLink>
						</StyledButton>
						<StyledButton>
							<StyledLink to="/vitalanalytics">Vitals</StyledLink>
						</StyledButton>
						<StyledButton>
							<StyledLink to="/envalanalytics">Environmental Analytics</StyledLink>
						</StyledButton>
							{/*<Form
								onSubmit={this.onSubmit}
								initialValues={{ organization: '' }}
								render={({ handleSubmit, form, submitting, pristine, values }) => (
								<form onSubmit={handleSubmit}>
									<Row>
										<div style={{paddingLeft:"5%"}}>
											<Field name="organization" component="select" class="form-control">
												<option ></option>
												<option value="Puente">Puente</option>
												<option value="One World Surgery">One World Surgery</option>
												<option value="WOF">World Outreach Foundation</option>
												<option value="Constanza Medical Mission">Constanza Medical Mission</option>
											</Field>
										</div>
										<div>
											<Button type="submit" disabled={submitting || pristine}>
												Submit
											</Button>
										</div>
									</Row>
								</form>	
							)}
								/>*/}
					</Row>
									
					<Row style={styles.row}>
						{/*<Query
								query={allRecordsByOrganization}
								variables={{ organization }}
								notifyOnNetworkStatusChange>
							{({ loading, error, data, refetch, networkStatus }) => {
							//if (networkStatus === 4) return "Refetching!";
							if (loading) return <p>Loading...</p>;
							if (error) return `Error!: ${error}`;
							return (
								<>
									{console.log(data)}
									<Route 
									path="/demographicanalytics" 
									render={(props) => <DemographicsAnalytics {...props} data={data.getPeopleByOrganization} />} />
								</>
							);
							}}
						</Query>*/}
						{/*<Route path={`/demographicanalytics`} component={DemographicsAnalytics} />*/}
						<Switch>
							<Route path={`/demographicanalytics`} component={DemographicsAnalytics} />
							<Route path={`/medicalanalytics`} component={MedicalEvalAnalytics} />
							<Route path="/envalanalytics" component={EnvironHealthAnalytics} />
							<Route path="/vitalanalytics" component={VitalsAnalytics} />
							<Route component={DemographicsAnalytics}/>
						</Switch>
					</Row>
					
				</Container>
			</Router>
			
		);
	}
}