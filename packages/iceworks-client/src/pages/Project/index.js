import React, { useEffect, useState } from 'react';
import { Message } from '@alifd/next';
import stores from '@stores';
import logger from '@utils/logger';
import useModal from '@hooks/useModal';
import mockData from '@src/mock';
import SubMenu from './components/SubMenu';
import OpenProjectModal from './components/OpenProjectModal';
import DeleteProjectModal from './components/DeleteProjectModal';
import CreateProjectModel from './components/CreateProjectModel';
import Guide from './components/Guide';
import projectStores from './stores';

// panels
import Page from './components/PagePanel';
import Dependency from './components/DependencyPanel';
import Layout from './components/LayoutPanel';
import Todo from './components/TodoPanel';
import GitPanel from './components/GitPanel';
import OSSPanel from './components/OSSPanel';
import DEFPanel from './components/DEFPanel';

import styles from './index.module.scss';

const Project = () => {
  const {
    on: onOpenProjectModel,
    setModal: setOpenProjectModal,
  } = useModal();
  const {
    on: onDeleteProjectModel,
    toggleModal: toggleDeleteProjectModal,
  } = useModal();
  const {
    on: onCreateProjectModel,
    toggleModal: toggleCreateProjectModal,
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
    setOpenProjectModal(true);
  }

  async function onOpenCreateProject() {
    toggleCreateProjectModal();
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
    setOpenProjectModal(false);
  }

  async function deleteProject(params) {
    await projects.delete({ ...params, projectPath: deleteProjectPath });
    await refreshProject();
    toggleDeleteProjectModal();
  }


  async function createProject(data) {
    await projects.create(data);
    await refreshProject();
    toggleCreateProjectModal();
  }

  async function onCreateProject(values) {
    const data = { scaffold: mockData.scaffold, ...values };
    try {
      await createProject(data);
    } catch (error) {
      if (error.code === 'LEGAL_PROJECT') {
        addProject(values.path);
      } else {
        Message.show({
          align: 'tr tr',
          type: 'error',
          title: '创建项目失败',
          content: error.message,
        });
      }
    }
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
          onCreateProject={onOpenCreateProject}
        />
      ) : null}
      <OpenProjectModal
        on={onOpenProjectModel}
        onCancel={() => setOpenProjectModal(false)}
        onOk={addProject}
      />
      <DeleteProjectModal
        on={onDeleteProjectModel}
        onCancel={toggleDeleteProjectModal}
        onOk={deleteProject}
        project={projectPreDelete}
      />
      <CreateProjectModel
        on={onCreateProjectModel}
        onCancel={toggleCreateProjectModal}
        onOk={onCreateProject}
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
};

export default Project;
