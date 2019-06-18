import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@alifd/next';
import stores from '@stores';
import Card from '@components/Card';
import qs from 'querystringify';
import { FormattedMessage } from 'react-intl';
import { forceCheck } from 'react-lazyload';
import useProject from '@hooks/useProject';
import useMaterial from '@hooks/useMaterial';
import useModal from '@hooks/useModal';
import useDependency from '@hooks/useDependency';
import CreateProjectModal from '@components/CreateProjectModal';
import SubMenu from './components/SubMenu';
import ScaffoldPanel from './components/ScaffoldPanel';
import BlockPanel from './components/BlockPanel';
import ComponentPanel from './components/ComponentPanel';
import InstallModal from './components/InstallModal';
import AddMaterialModal from './components/AddMaterialModal';
import styles from './index.module.scss';

const Material = ({ history }) => {
  const [material] = stores.useStores(['material']);
  const { location } = history;
  const {
    onCreateProjectModal,
    setCreateProjectModal,
    onCreateProject: onOriginCreateProject,
  } = useProject();
  const {
    onOpenMaterialModal,
    setMaterialModal,
    addMaterial,
    addMaterialLoading,
  } = useMaterial(false, material.addMaterial);
  const {
    on: onInstallModal,
    setModal: setInstallModal,
  } = useModal();
  const {
    bulkCreate,
  } = useDependency();
  const { dataSource } = material;
  const currCategory = (qs.parse(location.search) || {}).category;

  const [type, setType] = useState('scaffolds');
  const [component, setComponent] = useState({});

  async function setCurrent(source) {
    await material.setCurrentSource(source);
    await material.getCurrentMaterial();
  }

  async function fetchData() {
    await material.getResource();
    const firstResource = dataSource.resource.official[0] || {};
    const defaultActiveMaterial = firstResource.source;
    await setCurrent(defaultActiveMaterial);
  }

  useEffect(() => {
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
    await setCurrent(url);
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

  async function handleDeleteMaterial(url) {
    await material.deleteMaterial(url);

    // if deleted current item, go back to first item
    if (dataSource.currentSource === url) {
      const firstResource = dataSource.resource.official[0] || {};
      const defaultActiveMaterial = firstResource.source;
      await handleTabChange();
      await setCurrent(defaultActiveMaterial);
    }
  }

  async function handleAddMaterial({ url, name }, error) {
    if (error && error.url) return;
    if (error && error.name) return;

    await addMaterial(url, name);
    await handleTabChange(); // auto focus scaffolds tab
  }

  const tabs = [
    {
      tab: 'iceworks.material.scaffold',
      key: 'scaffolds',
      content: (
        <ScaffoldPanel
          dataSource={dataSource.currentMaterial.scaffolds}
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
          dataSource={dataSource.currentMaterial.blocks}
          current={currCategory}
        />
      ),
    },
    {
      tab: 'iceworks.material.component',
      key: 'components',
      content: (
        <ComponentPanel
          dataSource={dataSource.currentMaterial.components}
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
        current={dataSource.currentSource}
        data={dataSource.resource}
        onChange={handleMenuChange}
        onAddMaterial={() => setMaterialModal(true)}
        onDelete={handleDeleteMaterial}
      />
      <div className={styles.main}>
        <Card title={dataSource.currentMaterial.name || <FormattedMessage id="iceworks.material.title" />} subTitle={dataSource.currentMaterial.description} contentHeight="100%" className="scollContainer">
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
        <AddMaterialModal
          on={onOpenMaterialModal}
          onCancel={() => setMaterialModal(false)}
          onSave={handleAddMaterial}
          loading={addMaterialLoading}
        />
      </div>
    </div>
  );
};

Material.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Material;
