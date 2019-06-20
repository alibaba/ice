/* eslint babel/new-cap:0 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import logger from '@utils/logger';
import useProject from '@hooks/useProject';
import useDependency from '@hooks/useDependency';
import ErrorBoundary from '@components/ErrorBoundary';
import Icon from '@components/Icon';
import SelectWorkFolderModal from '@components/SelectWorkFolderModal';
import CreateProjectModal from '@components/CreateProjectModal';
import Modal from '@components/Modal';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import FallbackPanel from './components/FallbackPanel';
import SubMenu from './components/SubMenu';
import DeleteProjectModal from './components/DeleteProjectModal';
import PanelSetting from './components/PanelSetting';
import QuickStart from './components/QuickStart';
import projectStores from './stores';
import panels from './panels';
import styles from './index.module.scss';

const SortableDragHandle = SortableHandle(() => (
  <span className={styles.sortableDrag} />
));

const SortableItem = SortableElement(({ Panel, isSorting }) => {
  return (
    <div
      className={cx({
        [styles.sortableItem]: true,
        [styles.sorting]: isSorting,
      })}
    >
      <SortableDragHandle />
      <Panel />
    </div>
  );
});

const SortableWrap = SortableContainer(({ projectPanels, isSorting }) => {
  return (
    <div className={styles.sortableWrap}>
      {projectPanels.map(({ name, isAvailable }, index) => {
        const Panel = panels[name];
        return Panel && isAvailable ? (
          <ErrorBoundary key={index} FallbackComponent={FallbackPanel}>
            <SortableItem
              Panel={Panel}
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

const Project = ({ history }) => {
  const { location } = history;
  const {
    dependenciesStore,
    reset,
    onResetModal,
    setResetModal,
  } = useDependency();
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
  };
  const [isSorting, setIsSorting] = useState(false);
  const [
    panelSettingVisible,
    setPanelSettingVisible,
  ] = useState(false);

  const {
    material,
    projects,
    project,
    projectPreDelete,

    refreshProjects,
    addProject,
    deleteProject,
    sortProjectPanel,

    onSwitchProject,
    onDeleteProject,
    onOpenProject,
    onCreateProject,
    onChangeProjectPanel,

    onOpenProjectModal,
    setOpenProjectModal,
    onDeleteProjectModal,
    setDeleteProjectModal,
    onCreateProjectModal,
    setCreateProjectModal,
  } = useProject({ panelStores });

  const isCreatedProject = location.state && location.state.createdProject;

  async function onOpenCreateProject() {
    history.push('/material');
  }

  function onResetModalCancel() {
    setResetModal(false);
    if (isCreatedProject) {
      history.replace({ createdProject: false });
    }
  }

  async function onResetModalOk() {
    await reset();
    if (isCreatedProject) {
      history.replace({ createdProject: false });
    }
  }

  async function onCreateProjectModalOk(values) {
    await onCreateProject(values);
    setResetModal(true);
  }

  async function onTogglePanelSetting() {
    setPanelSettingVisible(!panelSettingVisible);
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

  useEffect(() => {
    logger.info('Project page loaded.');

    if (isCreatedProject) {
      setResetModal(true);
    }

    refreshProjects();
  }, []);

  return (
    <div className={styles.page}>
      {projects.length ? (
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
        onOk={addProject}
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
        title={<FormattedMessage id="iceworks.project.create.init.title" />}
        visible={onResetModal}
        onCancel={onResetModalCancel}
        onOk={onResetModalOk}
      >
        <FormattedMessage id="iceworks.project.create.init.content" />
      </Modal>

      {/* Render panel */}
      {projects.length && project.panels.length ? (
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
      ) : (
        <QuickStart
          onOpenProject={onOpenProject}
          onCreateProject={onOpenCreateProject}
          scaffolds={material.recommendScaffolds}
          createProject={(scaffoldData) => setCreateProjectModal(true, scaffoldData)}
        />
      )}

      {/* Panel setting */}
      <div className={styles.panelSetting}>
        <div
          onClick={onTogglePanelSetting}
          className={cx({
            [styles.button]: true, [styles.isVisible]: panelSettingVisible,
          })}
        >
          <Icon type={panelSettingVisible ? 'close' : 'settings'} size="medium" />
        </div>
        {panelSettingVisible ?
          <PanelSetting
            panels={project.panels.filter(({ name }) => panels[name])}
            onChange={onChangeProjectPanel}
          /> : null
        }
      </div>
    </div>
  );
};

Project.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Project;
