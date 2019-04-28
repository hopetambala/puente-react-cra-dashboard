import React from 'react';
import { Nav } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//Pages
import { HomePage } from "../pages/Home";
import { ExportPage } from "../pages/DataExport";
import { MedicalEvalAnalytics} from '../pages/MedicalEval';
import { EnvironHealthAnalytics } from '../pages/EnvironHealth';


export default class Layout extends React.Component {
	render() {
		return (
				<Router>
					<Nav style={{background:'white'}} className="navbar navbar-expand-lg fixed-top is-white is-dark-text">
						<div className="navbar-brand h1 mb-0 text-large font-medium">
							Puente
						</div>
						<div className="navbar-nav ml-auto">
							<span className="pr-2"><Link to="/">Dashboard</Link></span>
							<span className="pr-2">Maps</span>
							<span className="pr-2"><Link to="/dataexport">Export Manager</Link></span>
							<span className="pr-2">Hi, {this.props.username}</span>
							<span className="img-container">
								{/*<img src={myMan} className="rounded-circle" alt="user" /> */}
							</span>
						</div>	
					</Nav>
					
					<Route exact path="/" component={HomePage} />
					<Route path="/dataexport" component={ExportPage} />
					<Route path="/medicalanalytics" component={MedicalEvalAnalytics} />
					<Route path="/envalanalytics" component={EnvironHealthAnalytics} />
				</Router>
			
		);
	}
}