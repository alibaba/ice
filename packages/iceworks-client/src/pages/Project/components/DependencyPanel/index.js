import React from 'react';
import { Icon } from '@alifd/next';
import Panel from '../Panel';
import stores from '../../stores';
import styles from './index.module.scss';

const DependencyPanel = () => {
  const dependenciesStore = stores.useStore('dependencies');
  const { dataSource } = dependenciesStore;
  const { dependencies, devDependencies } = dataSource;

  async function onCreate() {
    console.log('onCreate');
  }

  async function onRefresh() {
    console.log('onRefresh');
  }

  return (
    <Panel
      header={
        <div className={styles.header}>
          <h3>依赖管理</h3>
          <div className={styles.icons}>
            <Icon className={styles.icon} type="refresh" size="small" onClick={onRefresh} />
            <Icon className={styles.icon} type="add" size="small" onClick={onCreate} />
          </div>
        </div>
      }
    >
      <div>
        <ul>
          {dependencies.map(({ package: _package }, index) => {
            return <li key={index}>{_package}</li>;
          })}
        </ul>
        <ul>
          {devDependencies.map(({ package: _package }, index) => {
            return <li key={index}>{_package}</li>;
          })}
        </ul>
      </div>
    </Panel>
  );
};

export default DependencyPanel;
