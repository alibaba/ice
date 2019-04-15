import React, { Component } from 'react';
import io from 'socket.io-client';
import menuConfig from '../menuConfig';
import routerConfig from '../routerConfig';
import Aside from '../components/Aside';
import RouteRender from '../components/RouteRender';

const endpoint = 'http://127.0.0.1:7001';
const socket = io(endpoint);

class MainLayout extends Component {
  state = {
    connect: false,
  };

  componentDidMount() {
    socket.on('connect', () => {
      this.setState({
        connect: true,
      });
      socket.emit('chat', 'Hello World!!!');
    });

    socket.on('disconnect', () => {
      this.setState({
        connect: false,
      });
    });

    socket.on('res', (msg) => {
      console.log('res from server: %s!', msg);
    });
  }

  render() {
    const { connect } = this.state;
    return (
      <div className="main-layout">
        <div
          style={{
            background: '#e83030',
            color: '#fff',
            padding: '10px 0',
            textAlign: 'center',
          }}
        >
          {connect ? '已连接' : '连接中断'}
        </div>
        <Aside menuData={menuConfig} />

        {routerConfig.map((route, index) => (
          <RouteRender key={index} {...route} />
        ))}
      </div>
    );
  }
}

export default MainLayout;
