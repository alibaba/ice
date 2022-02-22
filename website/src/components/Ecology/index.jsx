import React from 'react';
import styles from './ecology.module.css';
import AreaWrapper from '../AreaWrapper';

const data = [
  {
    title: 'AppWorks',
    decs: '基于 VS Code 插件，通过可视化操作、物料等能力降低前端研发门槛',
    image: '/img/solution_03.png',
    link: 'http://appworks.site/',
  },
  {
    title: '微前端 icestark',
    decs: '面向大型 Web 应用的解决方案，将巨石单体应用进行拆解，保证大型应用的可持续扩展、技术栈按需升级以及更好的跨团队协作',
    image: '/img/solution_01.png',
    link: 'http://micro-frontends.ice.work/',
  },
  {
    title: 'ahooks',
    decs: 'React Hooks 最佳实践，结合业务沉淀大量的 Hooks API，减少业务中重复的样板代码',
    image: '/img/solution_02.png',
    link: 'https://ahooks.js.org/',
  },
  {
    title: 'Formily',
    decs: '面向复杂表单的解决方案，支持数据驱动、复杂场景的高性能、复杂联动等能力',
    image: '/img/solution_04.png',
    link: 'https://v2.formilyjs.org/',
  },
];

function Ecology() {
  return (
    <AreaWrapper title={'领域解决方案'} decs={'面向不同业务领域沉淀了多种解决方案'} contentStyle={styles.container}>
      {data.map((item, index) => (
        <a key={index} className={styles.card} href={item.link} target="_blank">
          <img src={item.image}></img>
          <div className={styles.content}>
            <h3>{item.title}</h3>
            <div>
              <span>{item.decs}</span>
            </div>
          </div>
        </a>
      ))}
    </AreaWrapper>
  );
}

export default Ecology;
