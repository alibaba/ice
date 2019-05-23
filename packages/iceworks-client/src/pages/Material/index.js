import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@alifd/next';
import stores from '@stores';
import Card from '@components/Card';
import qs from 'querystringify';
import { forceCheck } from 'react-lazyload';
import SubMenu from './components/SubMenu';
import ScaffoldPanel from './components/ScaffoldPanel';
import BlockPanel from './components/BlockPanel';
import ComponentPanel from './components/ComponentPanel';
import InstallDailog from './components/InstallDailog';
import styles from './index.module.scss';

const Material = ({ history, location }) => {
  const material = stores.useStore('material');
  const { dataSource } = material;
  const currCategory = (qs.parse(location.search) || {}).category;

  const [type, setType] = useState('scaffolds');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await material.getResource();
      await material.getCurrent();
    }
    fetchData();
  }, []);

  async function handleTabChange(key = 'scaffolds') {
    history.push('/material');
    setType(key);

    // 当重新切换回区块 tab 时，必须强制检测 lazyload 组件
    // 否则 lazyload 不会重新渲染
    if (key === 'blocks') {
      setTimeout(() => {
        forceCheck();
      }, 100);
    }
  }

  async function handleMenuChange(url) {
    await handleTabChange();
    await material.resetCurrent();
    await material.getCurrent(url);
  }

  async function addMaterial() {
    // TODO: coding...
  }

  async function delMaterial(index, data) {
    // TODO: coding...
    console.log(index, data);
  }

  async function openDailog() {
    setVisible(true);
  }

  async function closeDailog() {
    setVisible(false);
  }

  const tabs = [
    {
      tab: '模板',
      key: 'scaffolds',
      content: (
        <ScaffoldPanel
          dataSource={dataSource.current.scaffolds}
          current={currCategory}
          onInstall={openDailog}
        />
      ),
    },
    {
      tab: '区块',
      key: 'blocks',
      content: (
        <BlockPanel
          dataSource={dataSource.current.blocks}
          current={currCategory}
          onInstall={openDailog}
        />
      ),
    },
    {
      tab: '组件',
      key: 'components',
      content: (
        <ComponentPanel
          dataSource={dataSource.current.components}
          current={currCategory}
          onInstall={openDailog}
        />
      ),
    },
  ];

  return (
    <div className={styles.materialPage}>
      {/* render material submenu */}
      <SubMenu
        data={dataSource.resource}
        title="物料管理"
        onChange={handleMenuChange}
        onAddMaterial={addMaterial}
        onDeleteMaterial={delMaterial}
      />

      <div className={styles.main}>
        <Card title="物料管理" contentHeight="100%" className="scollContainer">
          <Tab shape="capsule" size="small" style={{ textAlign: 'center' }} activeKey={type} onChange={handleTabChange}>
            {tabs.map((tab) => (
              <Tab.Item title={tab.tab} key={tab.key}>
                {tab.content}
              </Tab.Item>
            ))}
          </Tab>
        </Card>
        <InstallDailog
          closeable
          visible={visible}
          type={type}
          onCancel={closeDailog}
          onClose={closeDailog}
        />
      </div>
    </div>
  );
};

Material.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Material;
