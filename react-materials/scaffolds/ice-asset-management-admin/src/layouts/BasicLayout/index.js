/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Aside from './components/Aside';
import NotFound from '../../components/NotFound';
import routerData from '../../routerConfig';

@withRouter
export default class BasicLayout extends Component {
  render() {
    return (
      <Layout fixable style={styles.layout}>
        {/* 顶部导航  */}
        <Header />

        <Layout.Section style={styles.secion}>
          {/* 侧边导航  */}
          <Aside />

          {/* 主体内容 */}
          <Layout.Main scrollable style={styles.main}>
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
              <Redirect from="/" to="/manage/company" />

              {/* 未匹配到的路由重定向到 NotFound */}
              <Route component={NotFound} />
            </Switch>

            {/* 底部页脚 */}
            <Footer />
          </Layout.Main>
        </Layout.Section>
      </Layout>
    );
  }
}

const styles = {
  secion: {
    flexDirection: 'row',
  },
};
