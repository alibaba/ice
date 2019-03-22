import React, { Component } from 'react';
import Greeting from '../../components/Greeting';

export default class Home extends Component {
  render() {
    const links = [
      {
        text: '模板开发',
        path: 'https://alibaba.github.io/ice/docs/materials/add-templates',
        external: true,
      },
      {
        text: '开发规范',
        path: 'https://alibaba.github.io/ice/docs/materials/data-specification',
        external: true,
      },
      {
        text: '飞冰官网',
        path: 'https://alibaba.github.io/ice',
        external: true,
      },
      {
        text: '关于',
        path: '/about',
      },
    ];
    return (
      <Greeting
        title="欢迎使用自定义模板"
        description="相关链接"
        links={links}
      />
    );
  }
}
