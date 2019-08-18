import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

export class LeafletMap extends React.Component{
  constructor(props){
    super(props)
    this.state = { 
      places: [],
    };
  }

  async componentWillMount() {
    /*
    await fetch('http://puente-api.herokuapp.com/records/')
      .then(response => response.json())
      .then(data => this.setState({ places: data.records })
      );*/
      this.setState({
        places:this.props.data.getPeople
      })
  }

  static defaultProps = {
    center: {
      //lat: 18.4861, santo domingo
      //lng: -69.9312
      lat: 18.7357,
      lng: -70.1627
    },
    zoom: 9
};

  render() {
    const { places } = this.state;
    return (
      <Map center={this.props.center} zoom={this.props.zoom} style={{ height: '100vh', width: '100%',zIndex:0 }}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup>
        {this.props.sex === "" && places.map(place => (
            <Marker position={[place.latitude,place.longitude]}>
              <Popup>
                <div>
                  <h3>{place.fname} {place.lname}</h3>
                  <h5>{place.communityname}</h5>
                  <p>{place.city}, {place.province}</p>
                </div>
              </Popup>
            </Marker>
        ))}
        {this.props.sex !== "" &&
          places.map(place => (
            place.sex === this.props.sex &&
            <Marker position={[place.latitude,place.longitude]}>
              <Popup>
                <div>
                  <h3>{place.fname} {place.lname}</h3>
                  <h5>{place.communityname}</h5>
                  <p>{place.city}, {place.province}</p>
                </div>
              </Popup>
            </Marker>
        ))}
        </MarkerClusterGroup>

        
      </Map>
    )
  }
}
