import React from 'react';
import Icon from '@components/Icon';
import Panel from '../Panel';
import styles from './index.module.scss';

const FEATURES = [
  {
    icon: 'projects',
    description: '项目面板，可视化展示管理当前项目的信息，也可以通过右侧的“设置”按钮进行面板进行自定义配置',
  },
  {
    icon: 'zujian',
    description: '工程管理，可化展示和管理复杂的工程配置，让前端工程变的轻松便捷',
  },
  {
    icon: 'template',
    description: '物料市场，提供多种垂直领域模板和区块，快速创建项目，支持风格切换，满足个性化需求',
  },
];

const StartGuide = () => {
  return (
    <Panel>
      <div className={styles.startGuide}>
        <div className={styles.head}>
          <img src="https://img.alicdn.com/tfs/TB1_bn0dlCw3KVjSZFuXXcAOpXa-132-132.png" className={styles.logo} alt="logo" />
          <h3 className={styles.title}>欢迎来到 iceworks 工作台</h3>
        </div>
        <div className={styles.features}>
          {
            FEATURES.map((feature, index) => {
              return (
                <div className={styles.feature} key={index}>
                  <Icon type={feature.icon} className={styles.icon} size="small" />
                  <p className={styles.description}>{feature.description}</p>
                </div>
              );
            })
          }
        </div>
      </div>
    </Panel>
  );
};

export default StartGuide;
