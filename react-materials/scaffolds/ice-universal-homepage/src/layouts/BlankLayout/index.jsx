import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import routerData from '../../routerConfig';
import NotFound from '../../components/NotFound';

export default class NormalLayout extends Component {
  static displayName = 'NormalLayout';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
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
      </div>
    );
  }
}
