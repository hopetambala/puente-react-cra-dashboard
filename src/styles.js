//import { makeStyles } from '@material-ui/core/styles'; 


export const styles = {
	/*
		Theming
	*/
    theme: {
		primaryAppColor: "#FDD00C",
		primaryDashboardColor : "rgb(255, 209, 3)",
		lighter_darkbg: "rgba(255, 255, 255, 0.15)",
		light_darkbg: "#333",
		// darkBg : "#222B3C"
		darkBg : "#121212"

	},
	/*
		Inline Styles
	*/
    container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignContent: 'flex-start',
		paddingLeft:0,
		paddingRight:0,
		// marginLeft:0,
		// marginRight:0,
		paddingTop: '20px',
	},
	row: {
		justifyContent: 'center',
		flex:1,
		marginBottom:0,
		paddingBottom:0
	},
}

export const cardStyle = {
	/*
		Inline Styles
	*/
	card: {
		minWidth: 275,
		margin: 10,
		color: "whitesmoke",
		backgroundColor: styles.theme.light_darkbg
	},
	cardmini: {
		minWidth: 150,
		margin: 10
	},
	bullet: {
	  display: 'inline-block',
	  margin: '0 2px',
	  transform: 'scale(0.8)',
	},
	title: {
	  fontSize: 20,
	},
	pos: {
	  margin: 2,
	},
  };