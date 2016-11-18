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

    }

    handleContextMenu(e) {
      console.log(this.props)
      const { dispatch } = this.props;

      const location = [e.latlng.lng, e.latlng.lat];

      const prevlocation = this.props.departureLocation

      dispatch(setDepartureLocation(location));
      dispatch(setArrivalLocation(prevlocation));

    }

    renderDepartureMarker() {

      if(this.props.departureLocation.length == 2)
      {
        return <Marker position={[this.props.departureLocation[1],this.props.departureLocation[0]]}>
                    <Popup>
                      <span>Departure: {this.props.departureLocation[1].toFixed(5)} , {this.props.departureLocation[0].toFixed(5)} </span>
                    </Popup>
                  </Marker>   
      }
    }

    renderArrivalMarker() {

      if(this.props.arrivalLocation.length == 2)
      {
        return <Marker position={[this.props.arrivalLocation[1],this.props.arrivalLocation[0]]}>
                    <Popup>
                      <span>Arrival: {this.props.arrivalLocation[1].toFixed(5)} ,{this.props.arrivalLocation[0].toFixed(5)}</span>
                    </Popup>
                  </Marker>   
      }
    }

    componentWillUpdate() {
      console.log('willupdate')
    }

    render() {
        const departureMarker = this.renderDepartureMarker()
        const arrivalMarker = this.renderArrivalMarker()

        return (
          <div className="leaflet-map">
                <Map center={[-33.9231726,18.4217921]} zoom={13} zoomControl={false} onContextmenu={this.handleContextMenu.bind(this)}>
                  <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                    url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
                  />

                  {departureMarker}
                  {arrivalMarker}
                </Map>
            </div>
        );
    }
}

MapContainer.PropTypes = propTypes;

function mapStateToProps(state) {
  const {departureLocation, arrivalLocation, errorLocation } = state.location;

  return {
    departureLocation,
    arrivalLocation,
    errorLocation,
  };
}

export default connect(mapStateToProps)(MapContainer);