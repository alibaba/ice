import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@alifd/next';
import stores from '@stores';
import Card from '@components/Card';
import { FormattedMessage, injectIntl } from 'react-intl';
import { forceCheck } from 'react-lazyload';
import useProject from '@hooks/useProject';
import useMaterial from '@hooks/useMaterial';
import useDependency from '@hooks/useDependency';
import CreateProjectModal from '@components/CreateProjectModal';
import SubMenu from './components/SubMenu';
import MaterialPanel from './components/MaterialPanel';
import InstallModal from './components/InstallModal';
import AddMaterialModal from './components/AddMaterialModal';
import DeleteMaterialModal from './components/DeleteMaterialModal';
import styles from './index.module.scss';

const DEFAULT_CATEGORY = '全部';

const Material = ({ history, intl }) => {
  const [material] = stores.useStores(['material']);
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
    deleteMaterialLoading,
    deleteMaterial,
    openDeleteMaterialModal,
    onDeleteMaterialModal,
    setDeleteMaterialModal,
    deleteMaterialSource,
    onInstallModal,
    setInstallModal,
  } = useMaterial(false, material);
  const {
    bulkCreate,
  } = useDependency();
  const { dataSource } = material;
  const [type, setType] = useState('scaffolds');
  const [currentCategory, setCurrentCategory] = useState(DEFAULT_CATEGORY);
  const [component, setComponent] = useState({});
  const [scaffold, setScaffold] = useState({});

  async function setCurrent(source) {
    await material.setCurrentSource(source);
    await material.getCurrentMaterial();
  }

  async function fetchData() {
    await material.getResources();
    const firstResource = dataSource.resource.official[0] || {};
    const defaultActiveMaterial = firstResource.source;
    await setCurrent(defaultActiveMaterial);
  }

  function handleCategoryChange(name = DEFAULT_CATEGORY) {
    setCurrentCategory(name);
  }

  // it is necessary to trigger lazyLoad checking
  // when block tabPanel enter the viewport
  // https://github.com/twobin/react-lazyload#forcecheck
  useEffect(() => {
    forceCheck();
  }, [currentCategory]);

  async function handleTabChange(key = 'scaffolds') {
    setType(key);
    handleCategoryChange();
  }

  // it is necessary to trigger lazyLoad checking
  // when block tabPanel enter the viewport
  // https://github.com/twobin/react-lazyload#forcecheck
  useEffect(() => {
    if (type === 'blocks') {
      forceCheck();
    }
  }, [type]);

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

  async function handleDeleteMaterial() {
    await deleteMaterial(deleteMaterialSource);

    // if deleted current item, go back to first item
    if (dataSource.currentSource === deleteMaterialSource) {
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
        <MaterialPanel
          type="scaffolds"
          dataSource={dataSource.currentMaterial}
          currentCategory={currentCategory}
          onCategoryChange={handleCategoryChange}
          onUse={(scaffoldData) => {
            setCreateProjectModal(true, scaffoldData);
            setScaffold(scaffoldData);
          }}
        />
      ),
    },
    {
      tab: 'iceworks.material.block',
      key: 'blocks',
      content: (
        <MaterialPanel
          type="blocks"
          dataSource={dataSource.currentMaterial}
          currentCategory={currentCategory}
          onCategoryChange={handleCategoryChange}
        />
      ),
    },
    {
      tab: 'iceworks.material.component',
      key: 'components',
      content: (
        <MaterialPanel
          type="components"
          dataSource={dataSource.currentMaterial}
          currentCategory={currentCategory}
          onCategoryChange={handleCategoryChange}
          onUse={(componentData) => {
            setComponent(componentData);
            setInstallModal(true);
          }}
        />
      ),
    },
  ];

  const cardTitle = dataSource.currentMaterial.name || intl.formatMessage({ id: 'iceworks.material.title' });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.materialPage}>
      <CreateProjectModal
        scaffold={scaffold}
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
        onDelete={openDeleteMaterialModal}
      />
      <div className={styles.main}>
        <Card title={cardTitle} subTitle={dataSource.currentMaterial.description} contentHeight="100%" className="scollContainer">
          <Tab shape="capsule" size="medium" style={{ textAlign: 'center' }} activeKey={type} onChange={handleTabChange}>
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
        <DeleteMaterialModal
          on={onDeleteMaterialModal}
          onCancel={() => setDeleteMaterialModal(false)}
          loading={deleteMaterialLoading}
          onOk={handleDeleteMaterial}
        />
      </div>
    </div>
  );
};

Material.propTypes = {
  history: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Material);
