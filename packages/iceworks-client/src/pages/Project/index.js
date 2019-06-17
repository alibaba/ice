/* eslint babel/new-cap:0 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import logger from '@utils/logger';
import useProject from '@hooks/useProject';
import useDependency from '@hooks/useDependency';
import useModal from '@hooks/useModal';
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
import PanelSettingModal from './components/PanelSettingModal';
import Guide from './components/Guide';
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
      { element }
    </div>
  );
});

const SortableWrap = SortableContainer(({ items, isSorting }) => {
  return (
    <div className={styles.sortableWrap}>
      {items.map((element, index) => {
        return element ? (
          <SortableItem
            key={index}
            index={index}
            element={element}
            isSorting={isSorting}
          />
        ) : null;
      })}
    </div>
  );
});


const Project = ({ history }) => {
  const { location } = history;
  const [pages, layouts, git, oss] = projectStores.useStores([
    'pages',
    'layouts',
    'git',
    'oss',
  ]);
  const [isSorting, setIsSorting] = useState(false);

  const {
    on: onPanelSettingModal,
    setModal: setPanelSettingModal,
  } = useModal();
  const {
    dependenciesStore,
    reset,
    onResetModal,
    setResetModal,
  } = useDependency();
  const panelStores = {
    Page: pages,
    Dependency: dependenciesStore,
    Layout: layouts,
    Git: git,
    OSS: oss,
  };
  const {
    projectStore,

    material,
    projects,
    project,
    projectPreDelete,

    refreshProjects,
    addProject,
    deleteProject,

    onSwitchProject,
    onDeleteProject,
    onOpenProject,
    onCreateProject,

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

  async function onPanelSettingChange(name, isAvailable) {
    await projectStore.setPanel({ name, isAvailable });
  }

  async function onOpenPanelSetting() {
    setPanelSettingModal(true);
  }

  function onSortStart() {
    setIsSorting(true);
  }

  async function onSortEnd({ oldIndex, newIndex }) {
    setIsSorting(false);

    if (oldIndex !== newIndex) {
      await projectStore.sortPanel({ oldIndex, newIndex });
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
      {projects.length && project.panels.length ? (
        <div className={styles.main}>
          <SortableWrap
            useDragHandle
            axis="xy"
            onSortStart={onSortStart}
            onSortEnd={onSortEnd}
            helperClass={styles.sortableDraging}
            items={project.panels.map(({ name, isAvailable }, index) => {
              const Panel = panels[name];
              return Panel && isAvailable ? (
                <ErrorBoundary key={index} FallbackComponent={FallbackPanel}>
                  <Panel />
                </ErrorBoundary>
              ) : null;
            })}
            isSorting={isSorting}
          />
          <div className={styles.opts}>
            <div onClick={onOpenPanelSetting} className={styles.settings}>
              <Icon type="settings" size="medium" />
              设置
            </div>
            <PanelSettingModal
              on={onPanelSettingModal}
              onCancel={() => setPanelSettingModal(false)}
              panels={project.panels.filter(({ name }) => panels[name])}
              onChange={onPanelSettingChange}
            />
          </div>
        </div>
      ) : (
        <Guide
          onOpenProject={onOpenProject}
          onCreateProject={onOpenCreateProject}
          scaffolds={material.recommendScaffolds}
          createProject={(scaffoldData) => setCreateProjectModal(true, scaffoldData)}
        />
      )}
    </div>
  );
};

Project.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Project;
