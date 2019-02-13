import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from '../../components/NotFound';
import routerConfig from '../../routerConfig';
import './index.scss';

export default class BlankLayout extends Component {
  /**
   * 渲染路由组件
   */
  renderNormalRoute = (item, index) => {
    return item.component ? (
      <Route
        key={index}
        path={item.path}
        component={item.component}
        exact={item.exact}
      />
    ) : null;
  };

  render() {
    return (
      <div className="blank-layout">
        <div className="blank-layout-content">
          <Header />
          <Switch>
            {/* 渲染路由表 */}
            {routerConfig.map(this.renderNormalRoute)}

            {/* 根路由默认重定向到 /dashboard */}
            <Redirect from="/" to="/dashboard" />

            {/* 未匹配到的路由重定向到 NotFound */}
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}
