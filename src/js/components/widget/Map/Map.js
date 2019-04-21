import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../Marker/Marker';


// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();

  places.forEach((place) => {
    bounds.extend(new maps.LatLng(
      place.latitude,
      place.longitude,
    ));
  });
  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

 
export class Map extends Component {
    constructor(props){
        super(props)
        this.state = { 
            places: [],
        };
    }

    async componentDidMount() {
        await fetch('http://puente-api.herokuapp.com/records/organizations/WOF')
          .then(response => response.json())
          .then(data => this.setState({ places: data.records })
          );
      }
    

    static defaultProps = {
        center: {
        lat: 18.4861,
        lng: -69.9312
        },
        zoom: 8
    };
 
  render() {
    const { places } = this.state;
    return (
      // Important! Always set the container height explicitly
      
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBl0jjRObjh2orfjqFc02nZ9uO0AyB06Sg' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          //onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)} //used for getting bounds of things
        >
        {/*
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        */}
        {places.map(place => (
            <Marker
                key={place.objectId}
                text={place.fname}
                lat={place.latitude}
                lng={place.longitude}
            />
        ))}
        </GoogleMapReact>
      </div>
    );
  }
}
 
