import React, { Component, PropTypes } from 'react';

import { Map, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';

import Nav from '../components/Nav';

class MapContainer extends Component {

    handleContextMenu(e) {
      console.log(e)
    }

    render() {
        return (
                <Map center={[-33.9231726,18.4217921]} zoom={13} zoomControl={false} onContextmenu={this.handleContextMenu}>
                  <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                    url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
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