import React from 'react';
import { Row, Container, Button, Nav, Navbar } from 'react-bootstrap';
import { Switch, BrowserRouter as  Router, Route, Link  } from "react-router-dom";
import styled from 'styled-components';

//Pages
import MedicalEvalAnalytics from '../pages/MedicalEval';
import EnvironHealthAnalytics  from '../pages/EnvironHealth';
import { VitalsAnalytics } from '../pages/Vitals';
import DemographicsAnalytics  from '../pages/Demographics';

const styles = {
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignContent: 'flex-start',
		paddingTop: '60px'
		
	},
	row: {
		justifyContent: 'center',
		flex:1,
		marginBottom:0,
		paddingBottom:0
	}, 

}

const StyledLink = styled(Link)`
    text-decoration: none;
	
	color: #1a2a6c !important;
    &:focus, &:hover, &:visited, &:link, &:active {
        &:hover {
			//background: #1a2a6c !important;
			color: #f8af1e !important;
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
			organization:"All"
		}
		
	}


	async onSubmit(value){
		await this.setState({
			organization: value
		})
		console.log(this.state.organization)
	}

	render() {
		return (
			<Router>
				<Container style={styles.container}>
					<h1>Dashboard</h1>
					<Navbar style={{padding:"0"}} collapseOnSelect expand="sm">
						<Navbar.Brand>Analytics ></Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="mr-auto">
								<StyledLink className="nav-link" to={`/demographicanalytics`}>
									General
								</StyledLink>
								<StyledLink className="nav-link" to={`/medicalanalytics`}>
									Medical Evaluation
								</StyledLink>
								<StyledLink className="nav-link" to="/vitalanalytics">
									Vitals
								</StyledLink>
								<StyledLink className="nav-link" to="/envalanalytics">
									Environmental Analytics
								</StyledLink>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
															
					<Row style={styles.row}>
						<Switch>
							<Route
								path='/demographicanalytics'
								render={()=><DemographicsAnalytics/>}
							/>
							<Route path={`/medicalanalytics`} component={MedicalEvalAnalytics} />
							<Route path="/envalanalytics" component={EnvironHealthAnalytics} />
							<Route path="/vitalanalytics" component={VitalsAnalytics} />
							<Route render={()=><DemographicsAnalytics />}/>
						</Switch>
					</Row>
					
				</Container>
			</Router>
			
		);
	}
}