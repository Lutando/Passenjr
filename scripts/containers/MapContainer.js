import React, { Component, PropTypes } from 'react';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

class MapContainer extends Component {
    render() {
        return (
                <Map center={[-33.9231726,18.4217921]} zoom={13}>
                    <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={[-33.9231726,18.4217921]}>
          <Popup>
            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
          </Popup>
        </Marker>
                </Map>
        );
    }
}

export default MapContainer;