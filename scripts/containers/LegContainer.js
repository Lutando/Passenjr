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

class LegContainer extends Component {

    getPolyLine() {

    }

    getLineColour() {
        let defaultColor = '#162834'
        const { data } = this.props
        if(data.type === 'Transit')
        {
            defaultColor = '#' + data.line.colour.substring(3);
        }

        return defaultColor;
    }

    render() {
        const color = this.getLineColour()
        return (
            <Polyline positions={this.props.data.geometry.coordinates} color={color} />
        ) 
    }

}

LegContainer.PropTypes = propTypes;

function mapStateToProps(state) {
    const { journey, fetchingJourney, fetchedJourney, errorJourney } = state.journey;

    return {
        journey,
        fetchingJourney,
        fetchedJourney,
        errorJourney
    }
}

export default connect(mapStateToProps)(LegContainer);