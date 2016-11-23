import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Polyline } from 'react-leaflet';

import Immutable from 'immutable';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    journey: PropTypes.object,
    fetchingJourney: PropTypes.bool,
    fetchedJourney: PropTypes.bool,
    errorJourney: PropTypes.string,
}

class ItineraryContainer extends Component {



    getLegPaths() {
        const { legs } = this.props.journey.itineraries[0]
        var data = Immutable.fromJS(legs);
        
        var reversedLegs = data.map(function(leg) {

            var newCoordinates = leg.get('geometry').get('coordinates').map(function(coordinate){
                return coordinate.reverse()
            })

            return newCoordinates
        });

        var newLegs = reversedLegs.toJS();

        return newLegs
            
    }
    

    canRenderLegs() {
        return this.props.fetchedJourney
    }

    render() {
        let itineraries = null;

        if(this.canRenderLegs())
        {
            var legs = this.getLegPaths()
            var polyLines = legs.map(function(leg) {
                return <Polyline positions={leg} />
            })
            itineraries = <Polyline positions={legs} />
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