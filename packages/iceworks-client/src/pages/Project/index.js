import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import logger from '@utils/logger';
import useProject from '@hooks/useProject';
import useDependency from '@hooks/useDependency';
import ErrorBoundary from '@components/ErrorBoundary';
import CreateProjectModal from '@components/CreateProjectModal';
import ResetDependencyModal from '@components/ResetDependencyModal';
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

const Project = ({ history, location }) => {
  const [pages, layouts] = projectStores.useStores([
    'pages',
    'layouts',
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
        onOk={async (values) => {
          await onCreateProject(values);
          setResetModal(true);
        }}
      />
      <ResetDependencyModal
        titleId="iceworks.project.create.init.title"
        contentId="iceworks.project.create.init.content"
        on={onResetModal}
        onCancel={() => {
          setResetModal(false);
          if (isCreatedProject) {
            history.replace({ createdProject: false });
          }
        }}
        onOk={async () => {
          await reset();
          if (isCreatedProject) {
            history.replace({ createdProject: false });
          }
        }}
      />
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
  location: PropTypes.object.isRequired,
};

export default Project;
