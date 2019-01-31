import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from '@icedesign/layout';
import routerData from '../../routerConfig';
import NotFound from '../../components/NotFound';

export default class BlankLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }} className="ice-blank-layout">
        <Switch>
          {routerData.map((item, index) => {
            return item.component ? (
              <Route
                key={index}
                path={item.path}
                component={item.component}
              />
            ) : null;
          })}

          {/* 未匹配到的路由重定向到 NotFound */}
          <Route component={NotFound} />
        </Switch>
      </Layout>
    );
  }
}
