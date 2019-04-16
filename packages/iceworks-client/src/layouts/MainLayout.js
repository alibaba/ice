import React, { Component } from 'react';
import socket from '@utils/socket';
import Aside from '@components/Aside';
import RouteRender from '@components/RouteRender';
import ConnectionBar from '@components/ConnectionBar';
import menuConfig from '../menuConfig';
import routerConfig from '../routerConfig';

class MainLayout extends Component {
  state = {
    connect: false,
  };

  componentDidMount() {
    socket.on('connect', () => {
      this.setState({
        connect: true,
      });
    });

    socket.on('disconnect', () => {
      this.setState({
        connect: false,
      });
    });
  }

  render() {
    const { connect } = this.state;
    return (
      <div className="mainLayout">
        <ConnectionBar connect={connect} />

        <Aside menuData={menuConfig} />

        {routerConfig.map((route, index) => (
          <RouteRender key={index} {...route} />
        ))}
      </div>
    );
  }
}

export default MainLayout;
