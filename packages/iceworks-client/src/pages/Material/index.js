import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@alifd/next';
import stores from '@stores';
import Card from '@components/Card';
import qs from 'querystringify';
import SubMenu from './components/SubMenu';
import ScaffoldPanel from './components/ScaffoldPanel';
import BlockPanel from './components/BlockPanel';
import ComponentPanel from './components/ComponentPanel';
import styles from './index.module.scss';

const Material = ({ history, location }) => {
  const material = stores.useStore('material');
  const { dataSource } = material;
  const currCategory = (qs.parse(location.search) || {}).category;

  useEffect(() => {
    material.getResource();
    material.getCurrent();
  }, []);

  const [state, setState] = useState({
    type: 'scaffolds',
  });

  const tabs = [
    {
      tab: '模板',
      key: 'scaffolds',
      content: <ScaffoldPanel dataSource={dataSource.current.scaffolds} current={currCategory} />,
    },
    {
      tab: '区块',
      key: 'blocks',
      content: <BlockPanel dataSource={dataSource.current.blocks} current={currCategory} />,
    },
    {
      tab: '组件',
      key: 'components',
      content: <ComponentPanel dataSource={dataSource.current.components} current={currCategory} />,
    },
  ];

  function handleChange(key) {
    history.push('/material');
    setState({
      type: key,
    });
  }

  return (
    <div className={styles.materialPage}>
      {/* render material submenu */}
      <SubMenu data={dataSource.resource} title="物料管理" />

      <div className={styles.main}>
        <Card title="物料管理" contentHeight="100%">
          <Tab shape="capsule" size="small" style={{ textAlign: 'center' }} activeKey={state.type} onChange={handleChange}>
            {tabs.map((tab) => (
              <Tab.Item title={tab.tab} key={tab.key}>
                {tab.content}
              </Tab.Item>
            ))}
          </Tab>
        </Card>
      </div>
    </div>
  );
};

Material.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Material;
