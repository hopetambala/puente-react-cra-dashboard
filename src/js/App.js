//REACT + PARSE
import React from 'react';
import Parse from 'parse';
import { Route, Link, Switch} from "react-router-dom";

//Style
import { Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faMap, faClipboardList, faFileExport, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';
import appStyle from './App.module.css';

//Pages
import HomePage from "./pages/Home";
import { ExportPage } from "./pages/DataExport";
import FormCreator from './pages/FormCreator';
import { MapPage } from './pages/Map';
import PatientList from './pages/Patient/PatientList';

const StyledNavBarBrand = styled(Navbar.Brand)`
    //&:hover {
	//background: #1a2a6c !important;
	color: #f8af1e !important;
	//}
`;


export default class App extends React.Component {
	constructor(props){
		super(props);
		Parse.initialize(process.env.REACT_APP_parseAppId , process.env.REACT_APP_parseJavascriptKey);
        Parse.serverURL = process.env.REACT_APP_parseServerUrl;
	}
	render() {
		return (
			<div>
				{/*<StyledNav  className="navbar navbar-expand-lg fixed-top is-white is-dark-text bg-light">*/}
				<Navbar className={appStyle.navbar} fixed="top" collapseOnSelect expand="md" variant="dark" >
					<StyledNavBarBrand>PUENTE</StyledNavBarBrand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Link to={`${this.props.routePath}/home`} className={appStyle.navbutton}><FontAwesomeIcon icon={faChartLine} /></Link>
							<Link to={`${this.props.routePath}/map`} className={appStyle.navbutton}><FontAwesomeIcon icon={faMap} /></Link>
							<Link to={`${this.props.routePath}/formcreation`} className={appStyle.navbutton}><FontAwesomeIcon icon={faClipboardList} /></Link>
							<Link to={`${this.props.routePath}/dataexport`} className={appStyle.navbutton}><FontAwesomeIcon icon={faFileExport} /></Link>
						</Nav>
						<Nav>
							<Link to="/login" className={appStyle.signoutbutton}><FontAwesomeIcon icon={faSignOutAlt} /></Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>

				<Switch >
					<Route path={`${this.props.routePath}/home`} component={HomePage} />
					<Route path={`${this.props.routePath}/dataexport`}  component={ExportPage} />
					<Route path={`${this.props.routePath}/map`}  component={MapPage} />
					<Route path={`${this.props.routePath}/patients`}  component={PatientList} />
					<Route path={`${this.props.routePath}/formcreation`} component={FormCreator} />
				</Switch>
				
			</div>
		);
	}
}