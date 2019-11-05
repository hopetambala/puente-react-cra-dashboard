
import React from 'react';

// Redux
import { connect } from "react-redux";
import { getMapQueryInfo } from '../reducers/mapControls';

// Apollo
import { Query } from 'react-apollo';

// Components
import MapManagerControls from '../components/map-manager/MapManager';
import { Container } from 'react-bootstrap';


// //Style 
import mapStyles from './Map.module.css';
import { styles } from '../../styles';

// Deck.gl
import { StaticMap } from 'react-map-gl';
import { PhongMaterial } from '@luma.gl/core';
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import {ScatterplotLayer} from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';

const MAPBOX_TOKEN = "pk.eyJ1IjoiaHBiYWxhIiwiYSI6ImNrMXZyNWFscjB2N2szY3FmMHdodXZ2NjMifQ.PZQEuVD4WAHGTPd4yT5YFQ"; // eslint-disable-line

// Source data CSV
const REST_URL = "https://puente-api.herokuapp.com/records/"

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
  zoom: 6.6,
  minZoom: 1,
  maxZoom: 15,
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
		//const data = this.state.data;
		const {radius = 30} = this.props;

		return [
			new ScatterplotLayer({
				id: 'scatterplot-layer',
				data,
				pickable: true,
				opacity: 0.8,
				stroked: true,
				filled: true,
				radiusScale: 6,
				radiusMinPixels: 1,
				radiusMaxPixels: 100,
				lineWidthMinPixels: 1,
				getPosition: d => [ parseFloat(d.longitude), parseFloat(d.latitude), 0],
				// getRadius: d => Math.sqrt(d.exits),
				getFillColor: d => [255, 140, 0],
				getLineColor: d => [0, 0, 0],
				// onHover: ({object, x, y}) => {
				// const tooltip = `${object.fname}\n${object.lname}`;
				// /* Update tooltip
				// 	http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
				// */
				// }
				
				
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
					variables={{organization:this.state.organization}}
					notifyOnNetworkStatusChange
				>
				{({ loading, error, data, refetch, networkStatus }) => {
					if (networkStatus === 4) return "Refetching!";
					if (loading) return null;
					if (error) return `Error!: ${error}`;

					return (
					<>
					{console.log(Object.values(data)[0])}
						<DeckGL
							// layers={this._renderLayers(Object.values(data)[0])}
							layers={this.conditionalRendering(Object.values(data)[0], "scatter")}
							effects={[lightingEffect]}
							initialViewState={INITIAL_VIEW_STATE}
							controller={true}>
							<StaticMap
								reuseMaps
								mapStyle={mapStyle}
								preventStyleDiffing={true}
								mapboxApiAccessToken={MAPBOX_TOKEN}
							/>
						</DeckGL>
					</>
					);
				}}
				</Query>
			<MapManagerControls className={mapStyles.mapcontrols}/>
			</Container>

		);
	}
}

const mapStateToProps = (state) => {
	return {
	  /*position: getPosition(state),
	  data: getSelectedDatum(state),
	  notes: getNotesIndexedByHash(state),*/
	  query: getMapQueryInfo(state).query
	};
  };
  
  /*const mapDispatchToProps = {
	setSex
  };*/
  
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