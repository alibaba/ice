import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RouteRender from '@components/RouteRender';

export default class Work extends Component {
  static defaultProps = {
    routes: [],
  };

  static propTypes = {
    routes: PropTypes.array,
  };

  state = {};

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
