import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import logger from '@utils/logger';
import stores from '@stores';
import useProject from '@hooks/useProject';
import ErrorBoundary from '@components/ErrorBoundary';
import CreateProjectModal from '@components/CreateProjectModal';
import FallbackPanel from './components/FallbackPanel';
import SubMenu from './components/SubMenu';
import OpenProjectModal from './components/OpenProjectModal';
import DeleteProjectModal from './components/DeleteProjectModal';
import Guide from './components/Guide';
import projectStores from './stores';
import styles from './index.module.scss';

// panels
import Page from './components/PagePanel';
import Dependency from './components/DependencyPanel';
import Layout from './components/LayoutPanel';
import Todo from './components/TodoPanel';
import Git from './components/GitPanel';
import OSS from './components/OSSPanel';
import DEF from './components/DEFPanel';

const panels = {
  Page,
  Dependency,
  Layout,
  Todo,
  Git,
  OSS,
  DEF,
};

const Project = ({ history }) => {
  const [pages, layouts] = projectStores.useStores([
    'pages',
    'layouts',
  ]);
  const [dependencies] = stores.useStores(['dependencies']);
  const panelStores = {
    Page: pages,
    Dependency: dependencies,
    Layout: layouts,
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

  async function onOpenCreateProject() {
    history.push('/material');
  }

  useEffect(() => {
    logger.info('Project page loaded.');

    refreshProjects();
  }, []);

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
        onOk={onCreateProject}
      />
      {projects.dataSource.length && project.dataSource.panels.length ? (
        <div className={styles.main}>
          {project.dataSource.panels.map((name, index) => {
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
          scaffolds={material.dataSource.recommendScaffolds}
          createProject={(scaffoldData) => {
            setCreateProjectModal(true, scaffoldData);
          }}
        />
      )}
    </div>
  );
};

Project.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Project;
