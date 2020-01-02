import React from 'react';
import { Row, Container, Dropdown} from 'react-bootstrap';
import { Switch, BrowserRouter as  Router, Route, Link  } from "react-router-dom";

//Styling
import homeStyle from './Home.module.css';
import { styles, cardStyle } from '../../styles';

//Redux
import { connect } from "react-redux";
import { getAuthInfo } from '../reducers/login';

//Pages
import MedicalEvalAnalytics from '../pages/MedicalEval';
import EnvironHealthAnalytics  from '../pages/EnvironHealth';
import VitalsAnalytics from '../pages/Vitals';
import DemographicsAnalytics  from '../pages/Demographics';

//Components
//import DashboardManagerControls from '../components/dashboard-manager/DashboardManager';

// const styles = {
// 	container: {
// 		flexDirection: 'row',
// 		flexWrap: 'wrap',
// 		justifyContent: 'center',
// 		alignContent: 'flex-start',
// 		paddingTop: '60px'
		
		
// 	},
// 	row: {
// 		justifyContent: 'center',
// 		flex:1,
// 		marginBottom:0,
// 		paddingBottom:0
// 	}, 

// }

class HomePage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			form:"Community Health Records Forms"
		}
		console.log(this.props.authInfo.organization)
	}

	setButtonTitle = (value) =>{
		this.setState({
			form:value
		})
	}

	render() {
		return (
			<Router>
				<Container style={styles.container}>
					<h1>Welcome {this.props.authInfo.username}</h1>
					<h4 style={{color:"white"}}>Here's an automated analysis of data collected for {this.props.authInfo.organization}</h4>
					<Dropdown style={{marginBottom:"1em"}}>
						<Dropdown.Toggle style={cardStyle.card} id="dropdown-basic">
							{this.state.form}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item onClick={()=>{this.setButtonTitle("Demographics")}} as={Link} to={`/demographicanalytics`}>Demographics</Dropdown.Item>
							<Dropdown.Item onClick={()=>{this.setButtonTitle("Medical Evaluation")}} as={Link} to={`/medicalanalytics`}>Medical Evaluation</Dropdown.Item>
							<Dropdown.Item onClick={()=>{this.setButtonTitle("Environmental Health Analytics")}} as={Link} to={`/envalanalytics`}>Environmental Health Analytics</Dropdown.Item>
							<Dropdown.Item onClick={()=>{this.setButtonTitle("Vitals Analytics")}} as={Link} to={`/vitalanalytics`}>Vitals Analytics</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					
					{/*<DashboardManagerControls className={homeStyle.zIndex2} />*/}
															
					<Row style={styles.row}>
						<Switch className={homeStyle.zIndex1} >
							<Route
								path='/demographicanalytics'
								render={()=><DemographicsAnalytics organization={this.props.authInfo.organization}/>}
							/>
							<Route 
								path={`/medicalanalytics`} 
								render={()=> <MedicalEvalAnalytics organization={this.props.authInfo.organization}/>} 
							/>
							<Route 
								path="/envalanalytics" 
								render={()=> <EnvironHealthAnalytics organization={this.props.authInfo.organization}/>}
							/>
							<Route 
								path="/vitalanalytics" 
								render={()=> <VitalsAnalytics organization={this.props.authInfo.organization} />} 
							/>
							<Route render={()=><DemographicsAnalytics organization={this.props.authInfo.organization} />}/>
						</Switch>
					</Row>
					
				</Container>
			</Router>
			
		);
	}
}

const mapStateToProps = (state) => {
	return { 
		authInfo: getAuthInfo(state)
	}
};

export default connect(mapStateToProps,null)(HomePage);
