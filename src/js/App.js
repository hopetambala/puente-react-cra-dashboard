//REACT + PARSE
import React from 'react';
import Parse from 'parse';
import { Route, Link} from "react-router-dom";

//Style
import { Nav, Navbar} from 'react-bootstrap';
import { Image, Menu, Sidebar } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faMap, faClipboardList, faFileExport, faSignOutAlt, faUserFriends} from '@fortawesome/free-solid-svg-icons';

import goldClear from '../assets/goldClear.png';
import appStyle from './App.module.css';

//Pages
import HomePage from "./pages/Home";
import { ExportPage } from "./pages/DataExport";
import FormCreator from './pages/FormCreator';
import MapPage from './pages/Map';
import PatientList from './pages/Patient/PatientList';

export default class App extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			visible: false 
		}
		Parse.initialize(process.env.REACT_APP_parseAppId , process.env.REACT_APP_parseJavascriptKey);
        Parse.serverURL = process.env.REACT_APP_parseServerUrl;
	}
	  
	handleHideClick = () => this.setState({ visible: !this.state.visible })
	
	render() {
		const { visible } = this.state

		return (
			<div className={appStyle.background}>
				{/*<StyledNav  className="navbar navbar-expand-lg fixed-top is-white is-dark-text bg-light">*/}
				<Navbar className={appStyle.navbar} fixed="top" collapseOnSelect expand="md" variant="dark" >
					<Nav className="mr-auto">
					<Menu.Item onClick={this.handleHideClick}>
						<Image src={goldClear} size='medium' circular className={appStyle.image} />
					</Menu.Item>
					</Nav>
					<Nav>
						<Link to="/login" className={appStyle.signoutbutton}><FontAwesomeIcon icon={faSignOutAlt} /></Link>
					</Nav>
				</Navbar>
				<Sidebar.Pushable>
				<Sidebar
					as={Menu}
					animation='push'
					className={appStyle.sidebar}
					icon='labeled'
					inverted
					vertical
					borderless
					visible={visible}>
					<Menu.Item>
						<Link to={`${this.props.routePath}/home`} className={appStyle.navbutton}><FontAwesomeIcon icon={faChartLine} /></Link>
					</Menu.Item>
					<Menu.Item>
						<Link to={`${this.props.routePath}/patients`} className={appStyle.navbutton}><FontAwesomeIcon icon={faUserFriends} /></Link>
					</Menu.Item>
					<Menu.Item>
						<Link to={`${this.props.routePath}/map`} className={appStyle.navbutton}><FontAwesomeIcon icon={faMap} /></Link>
					</Menu.Item>
					<Menu.Item>
						<Link to={`${this.props.routePath}/formcreation`} className={appStyle.navbutton}><FontAwesomeIcon icon={faClipboardList} /></Link>
					</Menu.Item>
					<Menu.Item>
						<Link to={`${this.props.routePath}/dataexport`} className={appStyle.navbutton}><FontAwesomeIcon icon={faFileExport} /></Link>
					</Menu.Item>
				</Sidebar>
				<Sidebar.Pusher>
					<Route 
						path={`${this.props.routePath}/home`} component={HomePage} 
						render={(props) => <HomePage {...props} routePath="/app/home" />}
					/>
					<Route path={`${this.props.routePath}/dataexport`}  component={ExportPage} />
					<Route path={`${this.props.routePath}/map`}  component={MapPage} />
					<Route path={`${this.props.routePath}/patients`}  component={PatientList} />
					<Route path={`${this.props.routePath}/formcreation`} component={FormCreator} />
				</Sidebar.Pusher>
				</Sidebar.Pushable>
			</div>
		);
	}
}