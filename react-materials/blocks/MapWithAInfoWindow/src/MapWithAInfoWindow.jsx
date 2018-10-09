import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Map, InfoWindow } from 'react-amap';

// https://elemefe.github.io/react-amap/components/infowindow
export default class MapWithAInfoWindow extends Component {
  state = {
    value: '飞冰 - 让前端开发简单而友好',
  };
  render() {
    const position = {
      longitude: 120.026208,
      latitude: 30.279212,
    };

    const html = `<div>
      <p>${this.state.value}</p>
    </div>`;

    return (
      <IceContainer style={{ height: 400 }}>
        <Map plugins={['ToolBar']} center={position} zoom={15}>
          <InfoWindow position={position} visible content={html} />
        </Map>
      </IceContainer>
    );
  }
}
