import React from 'react';
import AreaWrapper from '../AreaWrapper';
import styles from './feature.module.css';

const data = [
  {
    title: '移动 + 桌面',
    decs: '同时支持移动端和桌面端，提供更多针对性的优化',
    url: '/docs/guide/about',
  },
  {
    title: '开箱即用',
    decs: '支持 Webpack5 / TypeScript / CSS Modules / PostCSS 等构建能力，API 具备良好的类型提示',
    url: '/docs/guide/start',
  },
  {
    title: '最佳实践',
    decs: '内置数据请求、路由、状态、构建配置、日志输出等最佳实践',
	url: '/docs/guide/basic/directory',
  },
  {
    title: '应用模式',
    decs: '支持 SPA、服务端渲染 SSR 以及静态构建 SSG 等不同研发模式',
	url: '/docs/guide/basic/ssr',
  },
  {
    title: '插件化',
    decs: '通过插件将框架能力进行解耦，同时开发者也可以基于插件扩展框架能力',
	url: '/docs/plugins/plugin-dev',
  },
  {
    title: '领域方案',
	decs: '提供丰富的领域方案，如包开发 ICE PKG、微前端 ICESTARK 等等',
	url: 'https://pkg.ice.work/',
  },
];

function Feature() {
  return (
    <AreaWrapper
      title={'基于 React 的应用研发框架 ice.js 3'}
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
            <p className={styles.link}>{'详情 >'}</p>
          </div>
        </a>
      ))}
    </AreaWrapper>
  );
}

export default Feature;
