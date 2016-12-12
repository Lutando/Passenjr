import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { CardStack, Card } from 'react-cardstack';

import SummaryCardComponent from '../components/SummaryCardComponent'
import { setItinerary } from '../actions/journey';


const propTypes = {
    dispatch: PropTypes.func.isRequired,
    fetchingJourney: PropTypes.bool,
    fetchedJourney: PropTypes.bool,
    legs: PropTypes.object,
    itineraries: PropTypes.object,
    journeys: PropTypes.object,
    itineraryId: PropTypes.string,
    journeyId: PropTypes.string,
}

const colours = ['#162834','#3f4f67', '#3f3f3f','#5f5f5f' ]
const icons = {
    walking: 'ion-android-walk',
    bus: 'ion-android-bus',
    rail: 'ion-android-train'
}

class SideContainer extends Component {

    handleCardClick(e, i) {
        const { dispatch } = this.props;
        dispatch(setItinerary(this.props.journeys[this.props.journeyId].itineraries[i]));
    }
    getCards() { 
        if(this.props.fetchedJourney)
        {
            const cards = this.props.journeys[this.props.journeyId].itineraries.map((itinerary, i) =>  {
                const legs = this.props.itineraries[itinerary].legs.map((leg) => {
                    return this.props.legs[leg];
                })
                return (
                        <Card key={'itinerary/' + i} background={colours[i]} cardClicked={this.handleCardClick.bind(this).bind(i)} >
                            <SummaryCardComponent key={'summary/' + i} legs={legs} duration={this.props.itineraries[itinerary].duration} />
                        </Card>
                        )

            });

            return cards
        }
        
        return null;
        
    }

    render() {
        if(this.props.fetchedJourney)
        {
        var cards = this.getCards()
        return (
            <div className='side-container'>
                <CardStack className='card-stack'
                    height={500}
                    width={400}
                    hoverOffset={25}>

                   {cards}
                </CardStack>
            </div>
        );
        }
        return null;
        
    }
}

SideContainer.PropTypes = propTypes;

function mapStateToProps(state) {
  const { fetchedJourney, itineraryId, journeyId, legs, itineraries, fetchingJourney, journeys } = state.journey;
  return {
    itineraries,
    itineraryId,
    journeyId,
    journeys,
    legs,
    fetchingJourney,
    fetchedJourney,
  };
}

export default connect(mapStateToProps)(SideContainer);