import React from 'react';
import IceContainer from '@icedesign/container';

const Guide = () => {
  return (
    <IceContainer style={{ minHeight: '500px', paddingLeft: '40px' }}>
      <h2>使用指南</h2>
      <ul>
        <li style={styles.item}>
          1. 该模板适用于从 0 到 1
          开始搭建项目，内置基础的页面，路由和菜单展示。
        </li>
        <li style={styles.item}>2. 菜单配置: menuConfig.js</li>
        <li style={styles.item}>3. 路由配置: routerConfig.js</li>
        <li style={styles.item}>
          4. 通过 GUI 工具{' '}
          <a
            href="https://alibaba.github.io/ice/iceworks"
            target="_blank"
            rel="noopener noreferrer"
          >
            Iceworks
          </a>{' '}
          创建页面，会同步的更新菜单和路由配置。
        </li>
        <li style={styles.item}>
          5. 基于{' '}
          <a
            href="https://alibaba.github.io/ice/block"
            target="_blank"
            rel="noopener noreferrer"
          >
            物料
          </a>{' '}
          生成的页面将会添加在 pages 目录。
        </li>
        <li style={styles.item}>
          6. 让前端工程变的轻松便捷，
          <a
            href="https://alibaba.github.io/ice/docs/iceworks"
            target="_blank"
            rel="noopener noreferrer"
          >
            快速开始
          </a>{' '}
          。
        </li>
      </ul>
    </IceContainer>
  );
};

const styles = {
  item: {
    height: '34px',
    lineHeight: '34px',
  },
};

export default Guide;
