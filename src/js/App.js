//REACT + PARSE
import React from 'react';
import Parse from 'parse';
import { Route, Link} from "react-router-dom";

//Style
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuItem from '@material-ui/core/MenuItem';

import appStyle from './App.module.css';
import { styles } from '../styles';

// import goldClear from '../assets/goldClear.png';

//Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

//Pages
import HomePage from "./pages/Home";
import { ExportPage } from "./pages/DataExport";
import FormCreator from './pages/FormCreator';
import MapPage from './pages/Map';
import PatientList from './pages/Patient/PatientList';

const useStyles = makeStyles(theme => ({
	root: {
	  flexGrow: 1,
	},
	menuButton: {
	  marginRight: theme.spacing(2),
	},
	title: {
	  flexGrow: 1,
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
		  display: 'flex',
		},
	  },
	  sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
		  display: 'none',
		},
	  },
}));

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
		
		return (
			<div className={appStyle.background}>
				<AppBar position="static" style={{ background: '#333'}}>
					<Toolbar>
						<Grid justify="flex-start">
							<Grid item>
								<Typography variant="h6" className={useStyles.title}>
									<div className={appStyle.signoutbutton}>Puente</div>
								</Typography>
							</Grid>
						</Grid>
						<Grid justify="flex-end" container spacing={24}>
							<Grid item>
								<Typography variant="h6" className={useStyles.title}>
									<Link to={`${this.props.routePath}/home`} className={appStyle.signoutbutton}>Home</Link>
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant="h6" className={useStyles.title}>
									<Link to={`${this.props.routePath}/patients`} className={appStyle.signoutbutton}>List of Records</Link>
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant="h6" className={useStyles.title}>
									<Link to={`${this.props.routePath}/map`} className={appStyle.signoutbutton}>Map</Link>
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant="h6" className={useStyles.title}>
									<Link to={`${this.props.routePath}/formcreation`} className={appStyle.signoutbutton}>Form Creator</Link>
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant="h6" className={useStyles.title}>
									<Link to={`${this.props.routePath}/dataexport`} className={appStyle.signoutbutton}>Data Exporter</Link>
								</Typography>
							</Grid>
							<Grid item>
							<Button variant="contained" style={{backgroundColor: styles.theme.lighter_darkbg}}>
								<Typography variant="h6" className={useStyles.title}>
									<Link to="/login" style={{color:"white"}} >Log out</Link>
								</Typography>
							</Button>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
				<Route 
					path={`${this.props.routePath}/home`} component={HomePage} 
					render={(props) => <HomePage {...props} routePath="/app/home" />}
				/>
				<Route path={`${this.props.routePath}/dataexport`}  component={ExportPage} />
				<Route path={`${this.props.routePath}/map`}  component={MapPage} />
				<Route path={`${this.props.routePath}/patients`}  component={PatientList} />
				<Route path={`${this.props.routePath}/formcreation`} component={FormCreator} />
			</div>
			
		);
	}
}