import React from 'react';
import { Row, Container } from 'react-bootstrap';

//Components
import { LeafletMap } from '../components/widget/Map/LeafletMap';
import MapManagerControls from '../components/map-manager/MapManager';

//Apollo
import { Query } from 'react-apollo';
import { all_records } from '../queries/records';

//Redux
import { connect } from "react-redux";
import { getMapFiltersInfo } from '../reducers/mapControls';

//Style 
import mapStyles from './Map.module.css';

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


class MapPage extends React.Component {
	componentDidUpdate = (prevProps) => {
		if (prevProps.filters !== this.props.filters) {
			console.log(this.props.filters)
		} 
	}
	render() {
		console.log(this.props.filters)
		return (
				<Container style={styles.container}>
					<h1 className={mapStyles.header1}>Map</h1>

					<MapManagerControls className={mapStyles.mapcontrols}/>

					<Row style={styles.row} >
						<Query query={all_records}>
							{({ data, loading, error }) => {
								if (loading) return <p>Loading...</p>;
								if (error) return <p>Error :(</p>;
								return (
									<LeafletMap data={data} sex={this.props.filters.sex} education={this.props.filters.education} className={mapStyles.map}/>
								);
							}}
						</Query>
					</Row>

				</Container>		
		);
	}
}

const mapStateToProps = (state) => {
	return {
	  /*position: getPosition(state),
	  data: getSelectedDatum(state),
	  notes: getNotesIndexedByHash(state),*/
	  filters: getMapFiltersInfo(state)
	};
  };
  
  /*const mapDispatchToProps = {
	setSex
  };*/
  
  export default connect(mapStateToProps,null)(MapPage);