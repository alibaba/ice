import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import stores from '@stores';
import logger from '@utils/logger';
import useModal from '@hooks/useModal';
import SubMenu from './components/SubMenu';
import OpenProjectModal from './components/OpenProjectModal';
import DeleteProjectModal from './components/DeleteProjectModal';
import Guide from './components/Guide';
import projectStores from './stores';

import Page from './components/PagePanel';
import Dependency from './components/DependencyPanel';
import Layout from './components/LayoutPanel';
import Todo from './components/TodoPanel';
import GitPanel from './components/GitPanel';
import OSSPanel from './components/OSSPanel';
import DEFPanel from './components/DEFPanel';

import styles from './index.module.scss';

const Project = ({ history }) => {
  const {
    on: onOpenProjectModel,
    toggleModal: toggleOpenProjectModal,
  } = useModal();
  const {
    on: onDeleteProjectModel,
    toggleModal: toggleDeleteProjectModal,
  } = useModal();
  const [deleteProjectPath, setDeleteProjectPath] = useState('');
  const [projects, project] = stores.useStores(['projects', 'project']);
  const [pages, dependencies, layouts] = projectStores.useStores([
    'pages',
    'dependencies',
    'layouts',
  ]);

  async function onSwitchProject(path) {
    await project.reset(path);
    pages.refresh();
    dependencies.refresh();
  }

  async function onDeleteProject(path) {
    setDeleteProjectPath(path);
    toggleDeleteProjectModal();
  }

  async function onOpenProject() {
    toggleOpenProjectModal();
  }

  async function onCreateProject() {
    history.push('/material');
  }

  async function refreshProject() {
    let error;
    try {
      await projects.refresh();
      await project.refresh();
    } catch (err) {
      error = err;
    }

    if (!error) {
      pages.refresh();
      dependencies.refresh();
      layouts.refresh();
    }
  }

  async function addProject(path) {
    await projects.add(path);
    await refreshProject();
    toggleOpenProjectModal();
  }

  async function deleteProject(params) {
    await projects.delete({ ...params, projectPath: deleteProjectPath });
    await refreshProject();
    toggleDeleteProjectModal();
  }

  useEffect(() => {
    logger.info('Project page loaded.');

    refreshProject();
  }, []);

  const projectPreDelete =
    projects.dataSource.find(({ path }) => {
      return path === deleteProjectPath;
    }) || {};

  return (
    <div className={styles.page}>
      {projects.dataSource.length ? (
        <SubMenu
          projects={projects.dataSource}
          project={project.dataSource}
          onSwitchProject={onSwitchProject}
          onDeleteProject={onDeleteProject}
          onOpenProject={onOpenProject}
          onCreateProject={onCreateProject}
        />
      ) : null}
      <OpenProjectModal
        on={onOpenProjectModel}
        onCancel={toggleOpenProjectModal}
        onOk={addProject}
      />
      <DeleteProjectModal
        on={onDeleteProjectModel}
        onCancel={toggleDeleteProjectModal}
        onOk={deleteProject}
        project={projectPreDelete}
      />
      {
        projects.dataSource.length ?
          (
            <div className={styles.main}>
              <Page />
              <Dependency />
              <Layout />
              <Todo />
              <GitPanel />
              <DEFPanel />
              <OSSPanel />
            </div>
          ) :
          (
            <Guide
              onOpenProject={onOpenProject}
              onCreateProject={onCreateProject}
            />
          )
      }
    </div>
  );
};

Project.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Project;
