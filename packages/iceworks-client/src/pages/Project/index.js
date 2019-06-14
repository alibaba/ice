import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import logger from '@utils/logger';
import useProject from '@hooks/useProject';
import useDependency from '@hooks/useDependency';
import ErrorBoundary from '@components/ErrorBoundary';
import SelectWorkFolderModal from '@components/SelectWorkFolderModal';
import CreateProjectModal from '@components/CreateProjectModal';
import Modal from '@components/Modal';
import { FormattedMessage } from 'react-intl';
import FallbackPanel from './components/FallbackPanel';
import SubMenu from './components/SubMenu';
import DeleteProjectModal from './components/DeleteProjectModal';
import Guide from './components/Guide';
import projectStores from './stores';
import styles from './index.module.scss';

// panels
import Page from './components/PagePanel';
import Dependency from './components/DependencyPanel';
import Layout from './components/LayoutPanel';
import Navigation from './components/NavigationPanel';
import Router from './components/RouterPanel';
import Todo from './components/TodoPanel';
import Git from './components/GitPanel';
import OSS from './components/OSSPanel';
import DEF from './components/DEFPanel';

const panels = {
  Page,
  Dependency,
  Layout,
  Navigation,
  Router,
  Todo,
  Git,
  OSS,
  DEF,
};

const Project = ({ history }) => {
  const { location } = history;
  const [pages, layouts, git, oss, navigations, routers] = projectStores.useStores([
    'pages',
    'layouts',
    'git',
    'oss',
    'navigations',
    'routers',
  ]);

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
    Navigation: navigations,
    Router: routers,
    Git: git,
    OSS: oss,
  };
  const {
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
          {project.panels.map((name, index) => {
            const Panel = panels[name];
            return Panel ? (
              <ErrorBoundary key={index} FallbackComponent={FallbackPanel}>
                <Panel />
              </ErrorBoundary>
            ) : null;
          })}
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
