import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Map, Marker } from 'react-amap';

// https://elemefe.github.io/react-amap/components/marker
export default class MapWithAMarker extends Component {
  render() {
    const position = {
      longitude: 120.026208,
      latitude: 30.279212,
    };

    return (
      <IceContainer style={{ height: 400 }}>
        <Map plugins={['ToolBar']} center={position} zoom={15}>
          <Marker position={position} />
        </Map>
      </IceContainer>
    );
  }
}
