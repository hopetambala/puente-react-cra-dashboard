import React from 'react';
import { Row, Container } from 'react-bootstrap';
import { BrowserRouter as Route, Link } from "react-router-dom";
import styled from 'styled-components';

//Components
import { Boxx } from '../components/widget/Boxx/Boxx';
import { LeafletMap } from '../components/widget/Map/LeafletMap';

//Assets
import health from '../../assets/health.png';
import env from '../../assets/env.png'
import people from '../../assets/people.png'


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
							<Boxx background={health}/>
						</StyledLink>
						
						<StyledLink to="/evalanalytics" >
							<Boxx background={env}/>
						</StyledLink>

						<Boxx background={people}/>
					</Row>
					<Row style={styles.row}>
						<LeafletMap />
					</Row>

				</Container>		
		);
	}
}