import { Schema, arrayOf } from 'normalizr'

const journey = new Schema('journeys')
//const geometry = new Schema('geometries')
const itinerary = new Schema('itineraries')
const leg = new Schema('legs', {idAttribute: 'href'})
//const distance = new Schema('distances')
const line = new Schema('lines',{idAttribute: 'id'})
//const vehicle = new Schema('vehicles')
//const fare = new Schema('fares')
//const direction = new Schema('directions')
const waypoint = new Schema('waypoints')
const stop = new Schema('stops', {idAttribute: 'id'})
//const location = new Schema('location')
const agency = new Schema('agencies', {idAttribute: 'id'})
//const mode = new Schema('modes')

//location.define({
    //geometry
//})

stop.define({
    agency,
    //geometry,
    //mode: arrayOf(mode)
})

//waypoint.define({
//    stop,
    //location,
//})

//direction.define({
    //distance
//})

leg.define({
    //distance,
    //line,
    //vehicle,
    //fare,
    //waypoints: arrayOf(waypoint),
    //directions: arrayOf(direction),
    //geometry
})

itinerary.define({
    legs: arrayOf(leg)
})

journey.define({
    //geometry,
    itineraries: arrayOf(itinerary)
})

export const journeySchema = journey;