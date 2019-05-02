import React from 'react';
import { Nav } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//Pages
import { HomePage } from "../pages/Home";
import { ExportPage } from "../pages/DataExport";
import { MedicalEvalAnalytics} from '../pages/MedicalEval';
import { EnvironHealthAnalytics } from '../pages/EnvironHealth';
import { VitalsAnalytics } from '../pages/Vitals';

//Styling
import styled from 'styled-components'

const StyledNav = styled(Nav)`
    //&:hover {
	//background: #1a2a6c !important;
	color: #f8af1e
	//}
`;

export default class Layout extends React.Component {
	render() {
		return (
				<Router>
					<StyledNav  className="navbar navbar-expand-lg fixed-top is-white is-dark-text bg-light">
						<div className="navbar-brand h1 mb-0 text-large font-medium">
							PUENTE
						</div>
						<div className="navbar-nav ml-auto">
							<span className="pr-2"><Link to="/">DASHBOARD</Link></span>
							<span className="pr-2">MAPS</span>
							<span className="pr-2"><Link to="/dataexport">EXPORT MANAGER</Link></span>
							<span className="pr-2">Hi, {this.props.username}</span>
							<span className="img-container">
								{/*<img src={myMan} className="rounded-circle" alt="user" /> */}
							</span>
						</div>	
					</StyledNav>
					
					<Route exact path="/" component={HomePage} />
					<Route path="/dataexport" component={ExportPage} />
					<Route path="/medicalanalytics" component={MedicalEvalAnalytics} />
					<Route path="/envalanalytics" component={EnvironHealthAnalytics} />
					<Route path="/vitalanalytics" component={VitalsAnalytics} />
				</Router>
			
		);
	}
}