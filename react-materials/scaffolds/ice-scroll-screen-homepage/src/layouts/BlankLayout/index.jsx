
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from '@icedesign/layout';
import Footer from '../../components/Footer';
import routerData from '../../routerConfig';
import NotFound from '../../components/NotFound';

export default class HeaderFooterLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout style={styles.container}>
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
        <Footer />
      </Layout>
    );
  }
}

const styles = {
  container: {
    minWidth: '1200px',
    background: '#fff',
  },
};
