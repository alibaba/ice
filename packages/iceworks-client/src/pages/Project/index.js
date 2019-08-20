import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@alifd/next';
import logger from '@utils/logger';
import useProject from '@hooks/useProject';
import useDependency from '@hooks/useDependency';
import useVisibilityChange from '@hooks/useVisibilityChange';
import ErrorBoundary from '@components/ErrorBoundary';
import Icon from '@components/Icon';
import SelectWorkFolderModal from '@components/SelectWorkFolderModal';
import CreateProjectModal from '@components/CreateProjectModal';
import Modal from '@components/Modal';
import cx from 'classnames';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import stores from '@stores';
import FallbackPanel from './components/FallbackPanel';
import SubMenu from './components/SubMenu';
import DeleteProjectModal from './components/DeleteProjectModal';
import SettingPanel from './components/SettingPanel';
import QuickStart from './components/QuickStart';
import projectStores from './stores';
import panels from './panels';
import styles from './index.module.scss';

const SortableDragHandle = SortableHandle(() => (
  <span className={styles.sortableDrag} />
));

const SortableItem = SortableElement(({ element, isSorting }) => {
  return (
    <div
      className={cx({
        [styles.sortableItem]: true,
        [styles.sorting]: isSorting,
      })}
    >
      <SortableDragHandle />
      {element}
    </div>
  );
});

const SortableWrap = SortableContainer(({ projectPanels, isSorting }) => {
  return (
    <div className={styles.sortableWrap}>
      {projectPanels.map((panel, index) => {
        const { name, isAvailable } = panel;
        const Panel = panels[name];
        return Panel && isAvailable ? (
          <ErrorBoundary key={index} FallbackComponent={FallbackPanel}>
            <SortableItem
              element={<Panel {...panel} />}
              key={index}
              index={index}
              isSorting={isSorting}
            />
          </ErrorBoundary>
        ) : null;
      })}
    </div>
  );
});

const Project = ({ history, intl }) => {
  const { location } = history;
  const {
    dependenciesStore,
    reset,
    onResetModal,
    setResetModal,
  } = useDependency();
  const [ settingPanelStore, taskStore ] = stores.useStores(['settingPanel', 'task']);
  const [
    pagesStore, layoutsStore, gitStore, ossStore, menuStore, routesStore, todoStore,
  ] = projectStores.useStores([
    'pages',
    'layouts',
    'git',
    'oss',
    'menu',
    'routes',
    'todo',
  ]);
  const panelStores = {
    Page: pagesStore,
    Dependency: dependenciesStore,
    Layout: layoutsStore,
    Menu: menuStore,
    Router: routesStore,
    Git: gitStore,
    OSS: ossStore,
    Todo: todoStore,
    Task: taskStore,
  };
  const [isSorting, setIsSorting] = useState(false);

  const {
    material,
    projects,
    project,
    projectPreDelete,

    refreshProjects,
    refreshProjectStore,
    deleteProject,
    sortProjectPanel,

    onAddProject,
    onSwitchProject,
    onDeleteProject,
    onOpenProject,
    onCreateProject,
    onChangeProjectPanel,
    reloadAdapter,

    onOpenProjectModal,
    setOpenProjectModal,
    openProjectLoading,
    onDeleteProjectModal,
    setDeleteProjectModal,
    onCreateProjectModal,
    setCreateProjectModal,
  } = useProject({ panelStores });

  const isCreatedProject = location.state && location.state.createdProject;
  const hasProjects = projects.length;

  async function onOpenCreateProject() {
    history.push('/material');
  }

  function onResetModalCancel() {
    setResetModal(false);
    if (isCreatedProject && project.adapterName) {
      history.replace({ createdProject: false });
    }
  }

  async function onResetModalOk() {
    await reset();
    if (isCreatedProject && project.adapterName) {
      history.replace({ createdProject: false });
    }
  }

  async function onCreateProjectModalOk(values) {
    await onCreateProject(values);

    if (project.adapterName) {
      setResetModal(true);
    }
  }

  async function onToggleSettingPanel() {
    settingPanelStore.toggle();
  }

  function onSortStart() {
    setIsSorting(true);
  }

  async function onSortEnd({ oldIndex, newIndex }) {
    setIsSorting(false);

    if (oldIndex !== newIndex) {
      await sortProjectPanel({ oldIndex, newIndex });
    }
  }

  async function wrapRefreshProjects() {
    await refreshProjects();

    if (isCreatedProject && project.adapterName) {
      setResetModal(true);
    }
  }

  useEffect(() => {
    logger.info('Project page loaded.');

    wrapRefreshProjects();
  }, []);

  useVisibilityChange((hidden) => {
    if (!hidden) {
      logger.info('Page visibility.');
      refreshProjectStore();
    }
  });

  function renderContent() {
    if (hasProjects) {
      if (project.panels.length && project.adapterName) {
        return (
          <div className={styles.main}>
            <SortableWrap
              useDragHandle
              axis="xy"
              onSortStart={onSortStart}
              onSortEnd={onSortEnd}
              helperClass={styles.sortableDraging}
              projectPanels={project.panels}
              isSorting={isSorting}
            />
          </div>
        );
      }
      return (
        <div className={styles.noAdapter}>
          <h5><FormattedMessage id="iceworks.global.adapter.title" /></h5>
          <p dangerouslySetInnerHTML={{ __html: intl.formatHTMLMessage({ id: 'iceworks.global.adapter.description' }) }} />
          <div className={styles.reloadButton}>
            <Button type="primary" onClick={reloadAdapter}>
              <FormattedMessage id="iceworks.global.adapter.reload" />
            </Button>
          </div>
        </div>
      );
    }
    return (
      <QuickStart
        onOpenProject={onOpenProject}
        onCreateProject={onOpenCreateProject}
        scaffolds={material.recommendScaffolds}
        createProject={(scaffoldData) => setCreateProjectModal(true, scaffoldData)}
      />
    );
  }

  const settingPanelVisible = settingPanelStore.dataSource.visible;

  return (
    <div className={styles.page}>
      {hasProjects ? (
        <SubMenu
          projects={projects}
          project={project}
          onSwitchProject={onSwitchProject}
          onDeleteProject={onDeleteProject}
          onOpenProject={onOpenProject}
          onCreateProject={onOpenCreateProject}
        />
      ) : null}
      <SelectWorkFolderModal
        on={onOpenProjectModal}
        onCancel={() => setOpenProjectModal(false)}
        onOk={onAddProject}
        loading={openProjectLoading}
      />
      <DeleteProjectModal
        on={onDeleteProjectModal}
        onCancel={() => setDeleteProjectModal(false)}
        onOk={deleteProject}
        project={projectPreDelete}
      />
      <CreateProjectModal
        on={onCreateProjectModal}
        onCancel={() => setCreateProjectModal(false)}
        onOk={onCreateProjectModalOk}
      />
      <Modal
        title={<FormattedMessage id="iceworks.project.install.dependencies.title" />}
        visible={onResetModal}
        onCancel={onResetModalCancel}
        onOk={onResetModalOk}
      >
        <FormattedMessage id="iceworks.project.install.dependencies.content" />
      </Modal>

      {/* Render Content */}
      {renderContent()}

      {/* Panel setting */}
      {hasProjects ? (
        <div className={styles.settingPanel}>
          <div
            onClick={onToggleSettingPanel}
            className={cx({
              [styles.button]: true, [styles.isVisible]: settingPanelVisible,
            })}
          >
            <Icon type={settingPanelVisible ? 'close' : 'settings'} size="medium" />
          </div>
          {settingPanelVisible ?
            <SettingPanel
              panels={project.panels.filter(({ name }) => panels[name])}
              onChange={onChangeProjectPanel}
            /> : null
          }
        </div>
      ) : null}
    </div>
  );
};

Project.propTypes = {
  history: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Project);
