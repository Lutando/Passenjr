import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Polyline } from 'react-leaflet';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    fetchingJourney: PropTypes.bool,
    fetchedJourney: PropTypes.bool,
    legs: PropTypes.object,
    errorJourney: PropTypes.string,
}

class LegContainer extends Component {

    getLineProperties() {
        let colour = '#162834'
        let dashArray = "5, 12"
        const lineData = this.props.legs[this.props.legId]
        if(lineData.type === 'Transit')
        {
            colour = '#' + lineData.line.colour.substring(3);
            dashArray = ""
        }

        return {colour: colour, dashArray: dashArray};
    }

    handleMouseOver(e) {

    }

    handleMouseOut(e) {
        
    }

    render() {
        const positions = this.props.legs[this.props.legId].geometry.coordinates
        const lineProps = this.getLineProperties()
        return (
            <Polyline positions={positions}  color={lineProps.colour} weight={5} dashArray={lineProps.dashArray} 
                opacity={0.8} onMouseover={this.handleMouseOver.bind(this)} onMouseout={this.handleMouseOut.bind(this)}   />
        )
    }

}

LegContainer.PropTypes = propTypes;

function mapStateToProps(state) {
    const { fetchingJourney, fetchedJourney, errorJourney, legs } = state.journey;

    return {
        legs,
        fetchingJourney,
        fetchedJourney,
        errorJourney
    }
}

export default connect(mapStateToProps)(LegContainer);