import React from 'react';
import styles from './feature.module.css';
import AreaWrapper from '../AreaWrapper';

const data = [
  {
    title: '规范',
    decs: '从目录组织规范到代码风格，集成了结合阿里大量项目实践的研发规范',
    url: '/docs/guide/basic/structure',
  },
  {
    title: 'Vite',
    decs: '同时支持 Vite/Webpack 模式，提供极速的调试构建体验',
    url: '/docs/guide/about',
  },
  {
    title: '开箱即用',
    decs: '支持 TypeScript/CSS Modules/PostCSS/... 等工程能力，框架 API 具备良好的类型提示能力',
    url: '/docs/guide/basic/build',
  },
  {
    title: '最佳实践',
    decs: '内置数据请求、状态管理、SSR、前端配置、日志输出等最佳实践',
    url: '/docs/guide/basic/request',
  },
  {
    title: '应用模式',
    decs: '支持 SPA、MPA、微前端、Serverless 一体化等不同研发模式',
    url: '/docs/guide/advanced/mpa',
  },
  {
    title: '插件化',
    decs: '通过插件将框架能力进行解耦，同时开发者也可以基于插件扩展框架能力',
    url: '/docs/plugin/develop/start',
  },
];

function Feature() {
  return (
    <AreaWrapper
      title={'基于 React 的应用研发框架 icejs'}
      decs={'开箱即用的研发框架，内置工程配置、状态管理、数据请求、权限管理等最佳实践，让开发者可以更加专注于业务逻辑'}
      contentStyle={styles.container}
      isBlock
    >
      {data.map((item, index) => (
        <a key={index} className={styles.card} href={item.url}>
          <div className={styles.content}>
            <h3>{item.title}</h3>
            <span>{item.decs}</span>
            <div style={{ flex: 1 }} />
            <p>{'Documentation >'}</p>
          </div>
        </a>
      ))}
    </AreaWrapper>
  );
}

export default Feature;
