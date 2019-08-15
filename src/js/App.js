//REACT + PARSE
import React from 'react';
import Parse from 'parse';
import { Route, Link, Switch} from "react-router-dom";

//REDUX
import { Provider } from "react-redux";
import configureStore from "../configure-store";

//Style
import { Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'

//Pages
import { HomePage } from "./pages/Home";
import { ExportPage } from "./pages/DataExport";
import FormCreator from './pages/FormCreator';
import { MapPage } from './pages/Map';
import PatientList from './pages/Patient/PatientList';



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

const store = configureStore();

export default class App extends React.Component {
	constructor(props){
		super(props);
		Parse.initialize(process.env.REACT_APP_parseAppId , process.env.REACT_APP_parseJavascriptKey);
        Parse.serverURL = process.env.REACT_APP_parseServerUrl;
	}
	render() {
		return (
			<Provider store={store}>
				{/*<StyledNav  className="navbar navbar-expand-lg fixed-top is-white is-dark-text bg-light">*/}
				<StyledNavBar fixed="top" collapseOnSelect expand="md" variant="dark" >
				<StyledNavBarBrand>PUENTE</StyledNavBarBrand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<StyledLink className="nav-link" to={`${this.props.routePath}/home`}>DASHBOARD</StyledLink>
							<StyledLink className="nav-link" to={`${this.props.routePath}/map`} >MAP</StyledLink>
							<StyledLink className="nav-link" to={`${this.props.routePath}/patients`}>PATIENTS</StyledLink>
							<StyledLink className="nav-link" to={`${this.props.routePath}/formcreation`} >FORM CREATOR</StyledLink>
							<StyledLink className="nav-link" to={`${this.props.routePath}/dataexport`}>EXPORT MANAGER</StyledLink>
						</Nav>
					</Navbar.Collapse>
				</StyledNavBar>

				<Switch >
					<Route path={`${this.props.routePath}/home`} component={HomePage} />
					<Route path={`${this.props.routePath}/dataexport`}  component={ExportPage} />
					<Route path={`${this.props.routePath}/map`}  component={MapPage} />
					<Route path={`${this.props.routePath}/patients`}  component={PatientList} />
					<Route path={`${this.props.routePath}/formcreation`} component={FormCreator} />
				</Switch>
				
			</Provider>
		);
	}
}