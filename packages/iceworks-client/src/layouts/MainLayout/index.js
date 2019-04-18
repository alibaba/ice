import React, { Component } from 'react';
import socket from '@utils/socket';
import NavigationBar from '@components/NavigationBar';
import RouteRender from '@components/RouteRender';
import ConnectionBar from '@components/ConnectionBar';
import GlobalBar from '@components/GlobalBar';
import menuConfig from '../../menuConfig';
import routerConfig from '../../routerConfig';
import styles from './index.module.scss';

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
      <div className={styles.container}>
        {connect ? null : <ConnectionBar connect={connect} />}

        <div className={styles.content}>
          <NavigationBar menuData={menuConfig} />

          <div className={styles.main}>
            {routerConfig.map((route, index) => (
              <RouteRender key={index} {...route} />
            ))}
          </div>
        </div>

        <GlobalBar />
      </div>
    );
  }
}

export default MainLayout;
