import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Polyline } from 'react-leaflet';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    journey: PropTypes.object,
    fetchingJourney: PropTypes.bool,
    fetchedJourney: PropTypes.bool,
    errorJourney: PropTypes.string,
}

class ItineraryContainer extends Component {



    getLegPaths() {

        //Redo as immutable to the props
        /*const { legs }  = this.props.journey.itineraries[0]
        console.log(legs)
        var reversedLegs = legs.map(function(leg){
            console.log('inmap')
            console.log(leg)
            var newCoordinates = leg.geometry.coordinates.map(function(coordinate){
                const newCoordinate = [coordinate[0], coordinate[1]]
                console.log('infunc')
                console.log(newCoordinate)
                //console.log([coordinate[1], coordinate[0]])
                return newCoordinate
            });
            console.log(newCoordinates)
            var editedLeg = leg
            editedLeg.geometry.coordinates = newCoordinates
            return editedLeg
            });
            console.log('here')
        console.log(reversedLegs); */
            
    }
    

    canRenderLegs() {
        if(this.props.fetchedJourney)
        {
            this.getLegPaths()
        }
        
        return 
    }

    render() {
        let itineraries = null;

        if(this.canRenderLegs())
        {

        }

        return itineraries


    }
}

ItineraryContainer.PropTypes = propTypes;

function mapStateToProps(state) {
    const { journey, fetchingJourney, fetchedJourney, errorJourney } = state.journey;

    return {
        journey,
        fetchingJourney,
        fetchedJourney,
        errorJourney
    }
}

export default connect(mapStateToProps)(ItineraryContainer);