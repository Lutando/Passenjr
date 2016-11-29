import { Schema, arrayOf } from 'normalizr'

const journey = new Schema('journeys')
const itinerary = new Schema('itineraries')
const leg = new Schema('legs', {idAttribute: 'href'})
const line = new Schema('lines',{idAttribute: 'id'})
const waypoint = new Schema('waypoints')
const stop = new Schema('stops', {idAttribute: 'id'})
const agency = new Schema('agencies', {idAttribute: 'id'})

stop.define({
    agency,
})

leg.define({
})

itinerary.define({
    legs: arrayOf(leg)
})

journey.define({
    itineraries: arrayOf(itinerary)
})

export const journeySchema = journey;