import React from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Parse from 'parse';

//Pages
import { HomePage } from "../pages/Home";
import { ExportPage } from "../pages/DataExport";
import FormCreator from '../pages/FormCreator';
import { MapPage } from '../pages/Map';
import PatientList from '../pages/Patient/PatientList';

//Styling
import styled from 'styled-components'

const StyledNavBar = styled(Navbar)`
	background: #1a2a6c !important;
	color: #f8af1e
`;

const StyledNavBarBrand = styled(Navbar.Brand)`
    //&:hover {
	//background: #1a2a6c !important;
	color: #f8af1e !important;
	//}
`;

const StyledLink = styled(Link)`
	color: white !important;
	&:hover {
		//background: #1a2a6c !important;
		color: #f8af1e !important;
	}
`;



export default class Layout extends React.Component {
	constructor(props){
		super(props);

		Parse.initialize(process.env.REACT_APP_parseAppId,process.env.REACT_APP_parseJavascriptKey);
		Parse.serverURL = process.env.REACT_APP_parseServerUrl;
	}
	static defaultProps = {
		username: "User"       
	}
	render() {
		return (
			<Router >
				{/*<StyledNav  className="navbar navbar-expand-lg fixed-top is-white is-dark-text bg-light">*/}
				<StyledNavBar fixed="top" collapseOnSelect expand="md" variant="dark" >
				<StyledNavBarBrand>PUENTE</StyledNavBarBrand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<StyledLink className="nav-link" to="/">DASHBOARD</StyledLink>
							<StyledLink className="nav-link" to="/map">MAP</StyledLink>
							<StyledLink className="nav-link" to="/patients">PATIENTS</StyledLink>
							<StyledLink className="nav-link" to="/formcreation">FORM CREATOR</StyledLink>
							<StyledLink className="nav-link" to="/dataexport">EXPORT MANAGER</StyledLink>
						</Nav>
					</Navbar.Collapse>
				</StyledNavBar>
			
				<Route exact path="/" component={HomePage} />
				<Route path="/dataexport" component={ExportPage} />
				<Route path="/map" component={MapPage} />
				<Route path="/patients" component={PatientList} />
				<Route path="/formcreation" component={FormCreator} />
			</Router>
		);
	}
}