import React, { Component } from 'react';
import Greeting from '../../components/Greeting';

export default class About extends Component {
  render() {
    const links = [
      {
        text: '返回首页',
        path: '/',
      },
    ];
    return <Greeting title="关于页面" links={links} />;
  }
}
