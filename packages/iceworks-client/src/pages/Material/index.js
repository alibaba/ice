import React, { useEffect } from 'react';
import { Tab } from '@alifd/next';
import stores from '@stores';
import Card from '@components/Card';
import SubMenu from './components/SubMenu';
import ScaffoldPanel from './components/ScaffoldPanel';
import BlockPanel from './components/BlockPanel';
import ComponentPanel from './components/ComponentPanel';
import styles from './index.module.scss';

const Material = () => {
  const material = stores.useStore('material');
  const { dataSource } = material;

  useEffect(() => {
    material.getResource();
    material.getCurrent();
  }, []);

  const tabs = [
    {
      tab: '模板',
      content: <ScaffoldPanel dataSource={dataSource.current.scaffolds} />,
    },
    {
      tab: '区块',
      content: <BlockPanel dataSource={dataSource.current.blocks} />,
    },
    {
      tab: '组件',
      content: <ComponentPanel dataSource={dataSource.current.components} />,
    },
  ];

  return (
    <div className={styles.materialPage}>
      {/* render material submenu */}
      <SubMenu data={dataSource.resource} title="物料管理" />

      <div className={styles.main}>
        <Card title="物料管理" contentHeight="100%">
          <Tab shape="capsule" size="small" style={{ textAlign: 'center' }}>
            {tabs.map((tab, index) => (
              <Tab.Item title={tab.tab} key={index}>
                {tab.content}
              </Tab.Item>
            ))}
          </Tab>
        </Card>
      </div>
    </div>
  );
};

export default Material;
