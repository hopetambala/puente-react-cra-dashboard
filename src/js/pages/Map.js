
import React from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from "react-redux";
import { getMapQueryInfo } from '../reducers/mapControls';
import { getAuthInfo } from '../reducers/login';

// Apollo
import { Query } from 'react-apollo';

// Components
import MapManagerControls from '../components/map-manager/MapManager';
import { Container } from 'react-bootstrap';
import LoadingDots from '../components/styles/LoadingDots'


// //Style 
import mapStyles from './Map.module.css';
import { styles } from '../../styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Deck.gl
import { StaticMap } from 'react-map-gl';
import { PhongMaterial } from '@luma.gl/core';
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import {IconLayer} from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';

const MAPBOX_TOKEN = "pk.eyJ1IjoiaHBiYWxhIiwiYSI6ImNrMXZyNWFscjB2N2szY3FmMHdodXZ2NjMifQ.PZQEuVD4WAHGTPd4yT5YFQ"; // eslint-disable-line

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000]
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000]
});

const lightingEffect = new LightingEffect({
	ambientLight, pointLight1, pointLight2
});

const material = new PhongMaterial({
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51]
});

const INITIAL_VIEW_STATE = {
  longitude: -70.1627,
  latitude: 18.7357,
  zoom: 7,
  minZoom: 0,
  maxZoom: 25,
  pitch: 40.5,
  bearing: -27.396674584323023
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const elevationScale = {min: 1, max: 50};

class MapPage extends React.Component {
	static get defaultColorRange() {
		return colorRange;
	}

	constructor(props) {
		super(props);
		this.state = {
			organization:"Puente",
			data:null,
			elevationScale: elevationScale.min
		};
	}

	// _renderTooltip() {
	// 	const { hoveredObject, pointerX, pointerY } = this.state || {};
	// 	console.log(hoveredObject, pointerX, pointerY)
	// 	return hoveredObject && (
	// 		<div style={{position: 'absolute', zIndex: 1, pointerEvents: 'none', left: pointerX, top: pointerY}}>
	// 		{ hoveredObject.message }
	// 		</div>
	// 	);
	// }

	_renderLayers(data) {
		//const data = this.state.data;
		const {radius = 1000, upperPercentile = 100, coverage = 1} = this.props;

		return [
			new HexagonLayer({
			id: 'heatmap',
			colorRange,
			coverage,
			data,
			elevationRange: [0, 3000],
			elevationScale: data && data.length ? 50 : 0,
			extruded: true,
			getPosition: d => [parseFloat(d.longitude),parseFloat(d.latitude)],
			onHover: this.props.onHover,
			opacity: 1,
			pickable: Boolean(this.props.onHover),
			radius,
			upperPercentile,
			material,

			transitions: {
				elevationScale: 3000
			}
			})
		];
	}

	_renderScatterLayers(data) {
		return [
			new IconLayer({
				id: 'icon-layer',
				data,
				getIcon: d => ({
					url: "https://raw.githubusercontent.com/hopetambala/puente-react-dashboard/master/src/assets/man.png",
					width: 90,
					height: 90,
					anchorY: 128,
					mask: true
				}),
				sizeScale: 7,
				getPosition: d => [ parseFloat(d.longitude), parseFloat(d.latitude), 0],
				getSize: d => 5,
				// getColor: d => [Math.sqrt(d.exits), 140, 0],
				getColor: d => [200, 140, 0],
				pickable: true,
    			onHover: (info, event) => {
					console.log('Hovered:', info, event);
				}
			})
		];
	}

	conditionalRendering(data,mapType){
		if (mapType === "scatter"){
			return this._renderScatterLayers(data)
		}
		else if (mapType === "hex"){
			return this._renderLayers(data)
		}
	}

	render() {
		const {mapStyle = 'mapbox://styles/mapbox/dark-v9'} = this.props;
		console.log(this.props.query)

		return (
			<Container style={styles.container}>
				<Query
					query={this.props.query}
					variables={{organization:this.props.userInfo.organization}}
					notifyOnNetworkStatusChange
				>
				{({ loading, error, data, refetch, networkStatus }) => {
					if (networkStatus === 4) return "Refetching!";
					if (loading) return <LoadingDots />;
					if (error) return `Error!: ${error}`;

					return (
					<>
					{/* {console.log(Object.values(data)[0])} */}
						<DeckGL
							// layers={this._renderLayers(Object.values(data)[0])}
							
							layers={this.conditionalRendering(Object.values(data)[0], this.props.mapType)}
							effects={[lightingEffect]}
							initialViewState={INITIAL_VIEW_STATE}
							controller={true}
							onHover={this._onHover}>
							<StaticMap
								
								reuseMaps
								mapStyle={mapStyle}
								preventStyleDiffing={true}
								mapboxApiAccessToken={MAPBOX_TOKEN}
							/>
							
						</DeckGL>
						<MapManagerControls className={mapStyles.mapcontrols}/>
						<Button variant="contained" style={{backgroundColor: styles.theme.lighter_darkbg}} className={mapStyles.backbutton}>
							<Typography variant="h4" >
								<Link to="/app/home" style={{color: styles.theme.primaryAppColor}}>Back</Link>
							</Typography>
						</Button>
					</>
					);
				}}
				</Query>
			{/* <MapManagerControls className={mapStyles.mapcontrols}/>
			<Button variant="contained" style={{backgroundColor: styles.theme.lighter_darkbg}} className={mapStyles.backbutton}>
				<Typography variant="h4" >
					<Link to="/app/home" style={{color: styles.theme.primaryAppColor}}>Back</Link>
				</Typography>
			</Button> */}
			</Container>

		);
	}
}

const mapStateToProps = (state) => {
	return {
	  query: getMapQueryInfo(state).query,
	  mapType: getMapQueryInfo(state).mapType,
	  userInfo: getAuthInfo(state)
	};
  };
  
  export default connect(mapStateToProps,null)(MapPage);
	
// 	componentDidUpdate = (prevProps) => {
// 		if (prevProps.filters !== this.props.filters) {
// 			console.log(this.props.filters)
// 		} 
// 	}
// 	render() {
// 		console.log(this.props.filters)
// 		return (
// 				// <Container style={styles.container}>
// 				// 	<h1 style={styles.header1}>Map</h1>

// 				// 	<MapManagerControls className={mapStyles.mapcontrols}/>

// 				// 	<Row style={styles.row} >
// 				// 		<Query query={all_records}>
// 				// 			{({ data, loading, error }) => {
// 				// 				if (loading) return <p>Loading...</p>;
// 				// 				if (error) return <p>Error :(</p>;
// 				// 				return (
// 				// 					<LeafletMap data={data} sex={this.props.filters.sex} education={this.props.filters.education} className={mapStyles.map}/>
// 				// 				);
// 				// 			}}
// 				// 		</Query>
// 				// 	</Row>

// 				// </Container>	

// 		);
// 	}
// }

// const mapStateToProps = (state) => {
// 	return {
// 	  /*position: getPosition(state),
// 	  data: getSelectedDatum(state),
// 	  notes: getNotesIndexedByHash(state),*/
// 	  filters: getMapFiltersInfo(state)
// 	};
//   };
  
//   /*const mapDispatchToProps = {
// 	setSex
//   };*/
  
//   export default connect(mapStateToProps,null)(MapPage);