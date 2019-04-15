import React, { Component } from 'react';
import RouteRender from '@components/RouteRender';

export default class Work extends Component {
  render() {
    return (
      <div>
        {this.props.routes.map((route, i) => (
          <RouteRender key={i} {...route} />
        ))}
      </div>
    );
  }
}
