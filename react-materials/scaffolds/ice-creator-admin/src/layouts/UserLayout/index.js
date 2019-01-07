import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import { Switch, Route, Redirect } from 'react-router-dom';
import Footer from './Footer';
import routerData from '../../routerConfig';
import './index.scss';

export default class UserLayout extends Component {
  render() {
    return (
      <Layout className="user-layout">
        <div className="layer-mask" />
        <div className="user-content">
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

        <Footer />
      </Layout>
    );
  }
}
