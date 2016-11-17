import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Map, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';

import { setDepartureLocation, setArrivalLocation } from '../actions/location';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  departureLocation: PropTypes.array,
  arrivalLocation: PropTypes.array,
  errorLocation: PropTypes.string,
};

class MapContainer extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        console.log('MOUNT')
        console.log(dispatch)
    }

    handleContextMenu(e) {
      console.log(this.props)
      const { dispatch } = this.props;

      const location = [e.latlng.lng, e.latlng.lat];

      const prevlocation = this.props.departureLocation

      console.log(location)
      console.log(prevlocation)

    }

    render() {
        return (
                <Map center={[-33.9231726,18.4217921]} zoom={13} zoomControl={false} onContextmenu={this.handleContextMenu.bind(this)}>
                  <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                    url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
                  />
                  <Marker position={[-33.9231726,18.4217921]}>
                    <Popup>
                      <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                    </Popup>
                  </Marker>
                </Map>
        );
    }
}

MapContainer.PropTypes = propTypes;

function mapStateToProps(state) {
  const {departureLocation, arrivalLocation, errorLocation } = state.location;
  console.log(`STATE`)
  console.log(state)
  return {
    departureLocation,
    arrivalLocation,
    errorLocation,
  };
}

export default connect(mapStateToProps)(MapContainer);