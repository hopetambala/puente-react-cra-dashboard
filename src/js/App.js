//REACT + PARSE
import React from 'react';
import Parse from 'parse';
import { Route, Link, Redirect} from "react-router-dom";

//REDUX
import { getAuthInfo} from './reducers/login';
import { connect } from "react-redux";

//Style
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import appStyle from './App.module.css';
import { styles } from '../styles';

// import goldClear from '../assets/goldClear.png';

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

class App extends React.Component {
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
		if(this.props.authInfo.isAuthenticated === false){
			return <Redirect to='/login' />
		}
		return (
			<div className={appStyle.background}>
				<AppBar position="static" style={{ background: '#333'}}>
					<Toolbar >
						<Grid>
							<Grid item>
								<Typography variant="h6" className={useStyles.title}>
									<div className={appStyle.signoutbutton}>Puente</div>
								</Typography>
							</Grid>
						</Grid>
						<Grid container
								direction="row"
								justify="flex-end"
								alignItems="center" >
							<Grid item>
								{/* <Typography variant="h6" className={useStyles.title}>
									<Link to={`${this.props.routePath}/home`} className={appStyle.signoutbutton}>Home</Link>
								</Typography> */}
								<Button  style={{backgroundColor: styles.theme.light_darkbg}}>
									<Typography variant="h6" className={useStyles.title} >
										<Link to={`${this.props.routePath}/home`} style={{color:styles.theme.primaryAppColor}}>Home</Link>
									</Typography>
								</Button>
							</Grid>
							<Grid item>
								{/* <Typography variant="h6" className={useStyles.title}>
									<Link to={`${this.props.routePath}/patients`} className={appStyle.signoutbutton}>List of Records</Link>
								</Typography> */}
								<Button  style={{backgroundColor: styles.theme.light_darkbg}}>
									<Typography variant="h6" className={useStyles.title} >
										<Link to={`${this.props.routePath}/patients`} style={{color:styles.theme.primaryAppColor}}>Records List</Link>
									</Typography>
								</Button>
							</Grid>
							<Grid item>
								{/* <Typography variant="h6" className={useStyles.title}>
									<Link to={`${this.props.routePath}/map`} className={appStyle.signoutbutton}>Map</Link>
								</Typography> */}
								<Button  style={{backgroundColor: styles.theme.light_darkbg}}>
									<Typography variant="h6" className={useStyles.title} >
										<Link to={`${this.props.routePath}/map`} style={{color:styles.theme.primaryAppColor}}>Map</Link>
									</Typography>
								</Button>
							</Grid>
							<Grid item>
								<Button  style={{backgroundColor: styles.theme.light_darkbg}}>
									<Typography variant="h6" className={useStyles.title} >
										<Link to={`${this.props.routePath}/formcreation`} style={{color:styles.theme.primaryAppColor}}>Form Creator</Link>
									</Typography>
								</Button>
							</Grid>
							<Grid item>
								<Button  style={{backgroundColor: styles.theme.light_darkbg}}>
									<Typography variant="h6" className={useStyles.title} >
										<Link to={`${this.props.routePath}/dataexport`} style={{color:styles.theme.primaryAppColor}}>Data Exporter</Link>
									</Typography>
								</Button>
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

				<>
				<Route 
					path={`${this.props.routePath}/home`} component={HomePage} 
					render={(props) => <HomePage {...props} routePath="/app/home" />}
				/>
				<Route path={`${this.props.routePath}/dataexport`}  component={ExportPage} />
				<Route path={`${this.props.routePath}/map`}  component={MapPage} />
				<Route path={`${this.props.routePath}/patients`}  component={PatientList} />
				<Route path={`${this.props.routePath}/formcreation`} component={FormCreator} />
				</>
			
			</div>
			
		);
	}
}

const mapStateToProps = (state) => {
	return { 
		authInfo: getAuthInfo(state)
	}
};

export default connect(mapStateToProps,null)(App);