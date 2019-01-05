import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import NotFound from '../../components/NotFound';
import routerData from '../../routerConfig';
import './index.scss';

export default class BasicLayout extends Component {
  render() {
    return (
      <Layout className="basic-layout">
        <Header />
        <NavBar />
        <div className="content">
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

            {/* 根路由默认重定向到 /dashboard */}
            <Redirect from="/" to="/dashboard" />

            {/* 未匹配到的路由重定向到 NotFound */}
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </Layout>
    );
  }
}
