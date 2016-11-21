import React, { Component, PropTypes } from 'react';

import { Marker, Popup } from 'react-leaflet';

import { connect } from 'react-redux';

import { setArrivalLocation } from '../actions/location';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  arrivalLocation: PropTypes.array,
  errorLocation: PropTypes.string,
};

class ArrivalMarkerContainer extends Component {  

    handleMarkerDragged(e) {
      const { dispatch } = this.props;  

      const newLocation = [e.target._latlng.lng,e.target._latlng.lat]
    
      dispatch(setArrivalLocation(newLocation))
    }

    isArrivalLocation() {
      return this.props.arrivalLocation.length == 2;
    }

    renderMarker() {
            return <Marker position={[this.props.arrivalLocation[1],this.props.arrivalLocation[0]]} draggable={true} onDragend={this.handleMarkerDragged.bind(this)}>
                    <Popup>
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
  const {arrivalLocation, errorLocation } = state.location;

  return {
    arrivalLocation,
    errorLocation,
  };
}

export default connect(mapStateToProps)(ArrivalMarkerContainer);