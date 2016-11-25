import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Circle } from 'react-leaflet';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    journey: PropTypes.object,
    fetchingJourney: PropTypes.bool,
    fetchedJourney: PropTypes.bool,
    errorJourney: PropTypes.string,
}

class StopContainer extends Component {
    
    getStopColor() {
        var colour = '#' + this.props.data.colour.substring(3)
        return colour
    }

    render() {
        var colour = this.getStopColor()
        return (
            <Circle center={this.props.data.stop.geometry.coordinates} radius={50} 
                color={colour} fill={true} fillOpacity={0.9} />
        );
    }
}

StopContainer.PropTypes = propTypes;

function mapStateToProps(state) {
    const { journey, fetchingJourney, fetchedJourney, errorJourney } = state.journey;

    return {
        journey,
        fetchingJourney,
        fetchedJourney,
        errorJourney
    }
}

export default connect(mapStateToProps)(StopContainer);