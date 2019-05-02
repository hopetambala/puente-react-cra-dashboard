import React from 'react';
import { Row, Container } from 'react-bootstrap';
import { BrowserRouter as Route, Link } from "react-router-dom";
import styled from 'styled-components';

//Components
import { Boxx } from '../components/widget/Boxx/Boxx';
import { LeafletMap } from '../components/widget/Map/LeafletMap';

//Assets
import medical from '../../assets/medical.png';
import env from '../../assets/env.png';
import vitals from '../../assets/vitals.png';
import {HomePageText} from '../providers/Text';


//Apollo
import { Query } from 'react-apollo';
import { all_records } from '../queries/records';


const styles = {
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignContent: 'flex-start',
		paddingTop: '5%'
		
	},
	row: {
		justifyContent: 'center',
		flex:1,
		marginBottom:0,
		paddingBottom:0
	}
}

const StyledLink = styled(Link)`
    text-decoration: none;
	
	color: black;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
	}
	margin: 2%;
`;

export class HomePage extends React.Component {
	constructor(props){
		super(props)
	}

	render() {
		return (
				<Container style={styles.container}>

					<Row style={styles.row}>
						
						<StyledLink to="/medicalanalytics">
							<Boxx 
								Cardtitle={HomePageText.medical.title} 
								Cardsubtitle={HomePageText.medical.subtitle} 
								Cardtext={HomePageText.medical.text} 
								background={medical}/>
						</StyledLink>
						
						<StyledLink to="/envalanalytics" >
							<Boxx 
								Cardtitle={HomePageText.environmentalhealth.title} 
								Cardsubtitle={HomePageText.environmentalhealth.subtitle} 
								Cardtext={HomePageText.environmentalhealth.text} 
								background={env}/>
						</StyledLink>
						<StyledLink to="/vitalanalytics">
							<Boxx 
								Cardtitle={HomePageText.vitals.title} 
								Cardsubtitle={HomePageText.vitals.subtitle} 
								Cardtext={HomePageText.vitals.text} 
								background={vitals}/>
						</StyledLink>
					</Row>
					<Row style={styles.row}>
						<Query query={all_records}>
							{({ data, loading, error }) => {
								if (loading) return <p>Loading...</p>;
								if (error) return <p>Error :(</p>;
								return (
									<LeafletMap data={data}/>
								);
							}}
						</Query>
					</Row>

				</Container>		
		);
	}
}