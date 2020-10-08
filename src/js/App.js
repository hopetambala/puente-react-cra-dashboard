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
// import Button from '@material-ui/core/Button';
import { Icon, Dropdown, Image, Button } from 'semantic-ui-react'
import appStyle from './App.module.css';
import { styles } from '../styles';
import landingStyle from '../landing-page/landing.module.css';

import logo from '../assets/goldClear.png';


//Pages
import HomePage from "./pages/Home";
import ExportPage from "./pages/DataExport";
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

const trigger = (
	<Button  style={{backgroundColor: styles.theme.light_darkbg}}>
		<Typography variant="h6" className={useStyles.title} >
			<div style={{color:"white"}}>
				<Icon name='user circle' style={{margin:"0"}}/>
				<h6>Me <Icon name="angle down"/></h6>
			</div>
		</Typography>
	</Button>
  )

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
				<AppBar position="relative" style={{ background: '#333',zIndex:'100'}}>
					<Toolbar >
						<Grid container
								direction="row"
								justify="flex-start"
								alignItems="center" >
							<Grid item>
								<Image verticalAlign='middle' className={landingStyle.logopic} src={logo}/>
							</Grid>
						
						</Grid>
						<Grid container
								direction="row"
								justify="flex-end"
								alignItems="center" >
							{/* <Grid item>
								<Button as={ Link } to={`${this.props.routePath}/home`} style={{backgroundColor: styles.theme.light_darkbg, color:styles.theme.primaryAppColor}}>
									<Typography variant="h6" className={useStyles.title} >
										<div style={{color:styles.theme.primaryAppColor}}>
											<Icon  name='home' style={{margin:"0"}}/>
											<h6>Home</h6>
										</div>
									</Typography>
								</Button>
							</Grid>
							<Grid item>
								<Button as={ Link } to={`${this.props.routePath}/patients`} style={{backgroundColor: styles.theme.light_darkbg}}>
									<Typography variant="h6" className={useStyles.title} >
										<div style={{color:styles.theme.primaryAppColor}}>
											<Icon name='book' style={{margin:"0"}}/>
											<h6>Records List</h6>
										</div>
									</Typography>
								</Button>
							</Grid>
							<Grid item>
								<Button as={ Link } to={`${this.props.routePath}/map`} style={{backgroundColor: styles.theme.light_darkbg}}>
									<Typography variant="h6" className={useStyles.title} >
										<div style={{color:styles.theme.primaryAppColor}}>
											<Icon name='map' style={{margin:"0"}}/>
											<h6>Map</h6>
										</div>
									</Typography>
								</Button>
							</Grid> */}
							<Grid item>
								<Button as={ Link } to={`${this.props.routePath}/formcreation`} style={{backgroundColor: styles.theme.light_darkbg}}>
									<Typography variant="h6" className={useStyles.title} >
										<div style={{color:styles.theme.primaryAppColor}}>
											<Icon name='clipboard list' style={{margin:"0"}}/>
											<h6>Form Creator</h6>
										</div>
									</Typography>
								</Button>
							</Grid>
							<Grid item>
								<Button as={ Link } to={`${this.props.routePath}/dataexport`} style={{backgroundColor: styles.theme.light_darkbg}}>
									<Typography variant="h6" className={useStyles.title} >
										<div style={{color:styles.theme.primaryAppColor}}>
											<Icon name='database' style={{margin:"0"}}/>
											<h6>Data Exporter</h6>
										</div>
									</Typography>
								</Button>
							</Grid>
							<Grid item>
							<Dropdown item trigger={trigger} icon={null}>
								<Dropdown.Menu direction="left">
									<Dropdown.Item disabled className={useStyles.title} icon='user' text={this.props.authInfo.username} />
									<Dropdown.Header content='Account' />
									<Dropdown.Item>Settings and privacy</Dropdown.Item>
									<Dropdown.Header content='Need Help?' />
									<Dropdown.Item target="_blank" href={'https://puente-dr.com/'}>Open Puente website</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item><Link to="/login" >Log out</Link></Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							{/* <Button variant="contained" style={{backgroundColor: styles.theme.lighter_darkbg}}>
								<Typography variant="h6" className={useStyles.title}>
									<Link to="/login" style={{color:"white"}}>Log out <Icon name="sign-out alternate" /></Link>
								</Typography>
							</Button> */}
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>

				<>
					{/* <Route 
						path={`${this.props.routePath}/home`} component={HomePage} 
						render={(props) => <HomePage {...props} routePath="/app/home" />}
					/> */}
					<Route path={`${this.props.routePath}/dataexport`}  component={ExportPage} />
					{/* <Route path={`${this.props.routePath}/map`}  component={MapPage} /> */}
					{/* <Route path={`${this.props.routePath}/patients`}  component={PatientList} /> */}
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