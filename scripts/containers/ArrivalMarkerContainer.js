import React, { Component, PropTypes } from 'react';

import { Marker, Popup } from 'react-leaflet';

import { connect } from 'react-redux';

import { setArrivalLocation } from '../actions/location';
import { fetchJourney } from '../actions/journey';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  arrivalLocation: PropTypes.array,
  departureLocation: PropTypes.array,
  errorLocation: PropTypes.string,
};

class ArrivalMarkerContainer extends Component {  

    handleMarkerDragged(e) {
      const { dispatch } = this.props;  

      const newLocation = [e.target._latlng.lat, e.target._latlng.lng]
    
      dispatch(setArrivalLocation(newLocation))

      if(this.props.departureLocation.length == 2)
      {
          var query = {departureLocation: this.props.departureLocation, arrivalLocation: newLocation}
          dispatch(fetchJourney(query))
      }
      
    }

    isArrivalLocation() {
      return this.props.arrivalLocation.length == 2;
    }

    renderMarker() {
            return <Marker position={this.props.arrivalLocation} draggable={true} onDragend={this.handleMarkerDragged.bind(this)}>
                    <Popup className={'map-span'}>
                      <span>Arrival: {this.props.arrivalLocation[1].toFixed(5)} , {this.props.arrivalLocation[0].toFixed(5)} </span>
                    </Popup>
                  </Marker>       
    }

    render() {
        let renderMarker = null;
        if(this.isArrivalLocation())
        {
          renderMarker = this.renderMarker();
        }
        
        return (renderMarker)  
        
    }
    
}

ArrivalMarkerContainer.PropTypes = propTypes;

function mapStateToProps(state) {
  const {arrivalLocation, departureLocation, errorLocation } = state.location;

  return {
    arrivalLocation,
    departureLocation,
    errorLocation,
  };
}

export default connect(mapStateToProps)(ArrivalMarkerContainer);