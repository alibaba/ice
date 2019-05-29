import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@alifd/next';
import stores from '@stores';
import Card from '@components/Card';
import qs from 'querystringify';
import { FormattedMessage } from 'react-intl';
import { forceCheck } from 'react-lazyload';
import SubMenu from './components/SubMenu';
import ScaffoldPanel from './components/ScaffoldPanel';
import BlockPanel from './components/BlockPanel';
import ComponentPanel from './components/ComponentPanel';
import InstallModal from './components/InstallModal';
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

    // it is necessary to trigger lazyLoad checking
    // when block tabPanel enter the viewport
    if (key === 'blocks') {
      setTimeout(() => {
        forceCheck();
      }, 100);
    }
  }

  async function handleMenuChange(url) {
    await handleTabChange();
    await material.getCurrent(url);
  }

  async function addMaterial() {
    // TODO: coding...
  }

  async function openModal() {
    setVisible(true);
  }

  async function closeModal() {
    setVisible(false);
  }

  const tabs = [
    {
      tab: 'iceworks.material.scaffold',
      key: 'scaffolds',
      content: (
        <ScaffoldPanel
          dataSource={dataSource.current.scaffolds}
          current={currCategory}
          onDownload={openModal}
        />
      ),
    },
    {
      tab: 'iceworks.material.block',
      key: 'blocks',
      content: (
        <BlockPanel
          dataSource={dataSource.current.blocks}
          current={currCategory}
          onInstall={openModal}
        />
      ),
    },
    {
      tab: 'iceworks.material.component',
      key: 'components',
      content: (
        <ComponentPanel
          dataSource={dataSource.current.components}
          current={currCategory}
          onInstall={openModal}
        />
      ),
    },
  ];

  return (
    <div className={styles.materialPage}>
      {/* render material submenu */}
      <SubMenu
        data={dataSource.resource}
        onChange={handleMenuChange}
        onAddMaterial={addMaterial}
      />

      <div className={styles.main}>
        <Card title={<FormattedMessage id="iceworks.material.title" />} contentHeight="100%" className="scollContainer">
          <Tab shape="capsule" size="small" style={{ textAlign: 'center' }} activeKey={type} onChange={handleTabChange}>
            {tabs.map((tab) => (
              <Tab.Item title={<FormattedMessage id={tab.tab} />} key={tab.key}>
                {tab.content}
              </Tab.Item>
            ))}
          </Tab>
        </Card>
        <InstallModal
          closeable
          visible={visible}
          type={type}
          onCancel={closeModal}
          onClose={closeModal}
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
