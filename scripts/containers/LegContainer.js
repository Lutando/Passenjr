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

    getLineProperties() {
        let colour = '#162834'
        let dashArray = "5, 12"
        const { data } = this.props
        if(data.type === 'Transit')
        {
            colour = '#' + data.line.colour.substring(3);
            dashArray = ""
        }

        return {colour: colour, dashArray: dashArray};
    }

    render() {
        const lineProps = this.getLineProperties()
        return (
            <Polyline positions={this.props.data.geometry.coordinates} color={lineProps.colour} weight={5}
                dashArray={lineProps.dashArray} opacity={0.8} onMouseover/>
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