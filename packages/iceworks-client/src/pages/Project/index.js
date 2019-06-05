import React, { useEffect, useState } from 'react';
import { Message } from '@alifd/next';
import stores from '@stores';
import logger from '@utils/logger';
import useModal from '@hooks/useModal';
import mockData from '@src/mock';
import SubMenu from './components/SubMenu';
import OpenProjectModal from './components/OpenProjectModal';
import DeleteProjectModal from './components/DeleteProjectModal';
import CreateProjectModal from './components/CreateProjectModal';
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
  const [pages, dependencies, layouts, navigations, routers] = projectStores.useStores([
    'pages',
    'dependencies',
    'layouts',
    'navigations',
    'routers',
  ]);
  const panelStores = {
    Page: pages,
    Dependency: dependencies,
    Layout: layouts,
    Navigation: navigations,
    Router: routers,
  };

  async function refreshProject() {
    let newProject;
    try {
      newProject = await project.refresh();
    } catch (err) {
      // error handle
    }

    if (newProject) {
      newProject.dataSource.panels.forEach((name) => {
        const panelStore = panelStores[name];
        if (panelStore) {
          panelStore.refresh();
        }
      });
    }
  }

  async function refreshProjects() {
    let error;
    try {
      await projects.refresh();
    } catch (err) {
      error = err;
    }

    if (!error) {
      await refreshProject();
    }
  }

  async function addProject(path) {
    await projects.add(path);
    await refreshProjects();
    setOpenProjectModal(false);
  }

  async function deleteProject(params) {
    await projects.delete({ ...params, projectPath: deleteProjectPath });
    await refreshProjects();
    toggleDeleteProjectModal();
  }


  async function createProject(data) {
    await projects.create(data);
    await refreshProjects();
    toggleCreateProjectModal();
  }

  async function onSwitchProject(path) {
    await project.reset(path);
    await refreshProject();
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

    refreshProjects();
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
      <CreateProjectModal
        on={onCreateProjectModel}
        onCancel={toggleCreateProjectModal}
        onOk={onCreateProject}
      />
      {
        projects.dataSource.length && project.dataSource.panels.length ?
          (
            <div className={styles.main}>
              {
                project.dataSource.panels.map(name => {
                  const Panel = panels[name];
                  return Panel ? <Panel /> : null;
                })
              }
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

export default Project;
