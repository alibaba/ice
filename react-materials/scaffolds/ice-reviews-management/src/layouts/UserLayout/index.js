import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Grid } from '@alifd/next';
import Footer from './components/Footer';
import Intro from './components/Intro';
import routerData from '../../routerConfig';

const { Row, Col } = Grid;

export default class UserLayout extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.mask} />
        <Row wrap style={styles.row}>
          <Col l="12">
            <Intro />
          </Col>
          <Col l="12">
            <div style={styles.form}>
              <Switch>
                {routerData.map((item, index) => {
                  return item.component ? (
                    <Route
                      key={index}
                      path={item.path}
                      component={item.component}
                      exact={item.exact}
                    />
                  ) : null;
                })}

                <Redirect exact from="/user" to="/user/login" />
              </Switch>
            </div>
          </Col>
        </Row>
        <Footer />
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    width: '100wh',
    minWidth: '1200px',
    height: '100vh',
    backgroundImage:
      'url(https://img.alicdn.com/tfs/TB1QZgkBHvpK1RjSZPiXXbmwXXa-1950-1300.jpg)',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
  },
  mask: {
    position: 'absolute',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    background: '#000',
    opacity: '0.4',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
