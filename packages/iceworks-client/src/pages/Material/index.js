import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@alifd/next';
import stores from '@stores';
import Card from '@components/Card';
import qs from 'querystringify';
import { FormattedMessage } from 'react-intl';
import { forceCheck } from 'react-lazyload';
import useProject from '@hooks/useProject';
import useModal from '@hooks/useModal';
import useDependency from '@hooks/useDependency';
import CreateProjectModal from '@components/CreateProjectModal';
import SubMenu from './components/SubMenu';
import ScaffoldPanel from './components/ScaffoldPanel';
import BlockPanel from './components/BlockPanel';
import ComponentPanel from './components/ComponentPanel';
import InstallModal from './components/InstallModal';
import styles from './index.module.scss';

const Material = ({ history, location }) => {
  const {
    onCreateProjectModal,
    setCreateProjectModal,
    onCreateProject: onOriginCreateProject,
  } = useProject();
  const {
    on: onInstallModal,
    setModal: setInstallModal,
  } = useModal();
  const {
    bulkCreate,
  } = useDependency();
  const [material] = stores.useStores(['material']);
  const { dataSource } = material;
  const currCategory = (qs.parse(location.search) || {}).category;

  const [type, setType] = useState('scaffolds');
  const [component, setComponent] = useState({});

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

  async function onCreateDependency() {
    await bulkCreate([component.source].map(({ npm, version }) =>
      ({ package: npm, version })));
    setInstallModal(false);
  }

  async function onCreateProject(values) {
    await onOriginCreateProject(values);
    history.push('/project', { createdProject: true });
  }

  const tabs = [
    {
      tab: 'iceworks.material.scaffold',
      key: 'scaffolds',
      content: (
        <ScaffoldPanel
          dataSource={dataSource.current.scaffolds}
          current={currCategory}
          onDownload={(scaffoldData) => {
            setCreateProjectModal(true, scaffoldData);
          }}
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
          onInstall={(componentData) => {
            setComponent(componentData);
            setInstallModal(true);
          }}
        />
      ),
    },
  ];

  return (
    <div className={styles.materialPage}>
      <CreateProjectModal
        on={onCreateProjectModal}
        onCancel={() => setCreateProjectModal(false)}
        onOk={onCreateProject}
      />
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
          on={onInstallModal}
          onCancel={() => setInstallModal(false)}
          onOk={onCreateDependency}
          component={component}
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
