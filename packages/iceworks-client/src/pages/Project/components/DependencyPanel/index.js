import React from 'react';
import { Icon, Tab } from '@alifd/next';
import Panel from '../Panel';
import stores from '../../stores';
import styles from './index.module.scss';

const { Item: TabPane } = Tab;

const DependencyPanel = () => {
  const dependenciesStore = stores.useStore('dependencies');
  const { dataSource } = dependenciesStore;
  const { dependencies, devDependencies } = dataSource;

  async function onCreate() {
    console.log('onCreate');
  }

  async function onRefresh() {
    await dependenciesStore.refresh();
  }

  async function onReInstall() {
    console.log('onReInstall');
  }

  return (
    <Panel
      header={
        <div className={styles.header}>
          <h3>依赖管理</h3>
          <div className={styles.icons}>
            <Icon className={styles.icon} type="refresh" size="small" onClick={onRefresh} title="刷新依赖" />
            <Icon className={styles.icon} type="download" size="small" onClick={onReInstall} title="重装依赖" />
            <Icon className={styles.icon} type="add" size="small" onClick={onCreate} title="添加依赖" />
          </div>
        </div>
      }
    >
      <div className={styles.main}>
        <Tab size="small" contentStyle={{ padding: '10px 0 0' }}>
          {
            [['dependencies', dependencies], ['devDependencies', devDependencies]].map(([key, deps]) => {
              return (
                <TabPane
                  title={
                    <div>
                      <strong>{key}</strong>
                      <span>({Object.keys(deps).length})</span>
                    </div>
                  }
                  key={key}
                >
                  <div className={styles.list}>
                    {
                      deps.map(({ package: _package, localVersion, wantedVestion }) => {
                        return (
                          <div key={_package} className={styles.item}>
                            <div className={styles.package}>
                              {_package}
                            </div>
                            <div className={styles.info}>
                              <div className={styles.version}>{localVersion || '-'}</div>
                              {
                                wantedVestion ?
                                  <div>
                                    <Icon type="download" size="xs" className={styles.download} />
                                  </div> :
                                  null
                              }
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                </TabPane>
              );
            })
          }
        </Tab>
      </div>
    </Panel>
  );
};

export default DependencyPanel;
