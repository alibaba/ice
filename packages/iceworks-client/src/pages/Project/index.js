import React, { useEffect, useState } from 'react';
import stores from '@stores';
import logger from '@utils/logger';
import useModal from '@hooks/useModal';
// import Page from './components/Pages';
// import Dependency from './components/Dependencies';
import SubMenu from './components/SubMenu';
import OpenProject from './components/OpenProject';
import DeleteProject from './components/DeleteProject';
import Guide from './components/Guide';
import projectStores from './stores';
import styles from './index.module.scss';

const Project = () => {
  const { on: onOpenProjectModel, toggleModal: toggleOpenProjectModal } = useModal();
  const { on: onDeleteProjectModel, toggleModal: toggleDeleteProjectModal } = useModal();
  const [deleteProjectPath, setDeleteProjectPath] = useState('');
  const [projects, project] = stores.useStores(['projects', 'project']);
  const [pages, dependencies] = projectStores.useStores([
    'pages',
    'dependencies',
  ]);

  useEffect(() => {
    logger.info('Project page loaded.');

    projects.refresh();
    project.refresh();
    pages.refresh();
    dependencies.refresh();
  }, []);

  async function onSwitchProject(folderPath) {
    await project.reset(folderPath);
    pages.refresh();
    dependencies.refresh();
  }

  async function onDeleteProject(folderPath) {
    setDeleteProjectPath(folderPath);
    toggleDeleteProjectModal();
  }

  async function onOpenProject() {
    toggleOpenProjectModal();
  }

  async function onCreateProject() {
    // TODO
    window.location.href = '/material';
  }

  async function addProject(folderPath) {
    await projects.add(folderPath);
    const newProject = await project.refresh();
    pages.refresh(newProject.dataSource.folderPath);
    dependencies.refresh(newProject.dataSource.folderPath);
    toggleOpenProjectModal();
  }

  async function deleteProject(params) {
    await projects.delete({ ...params, projectFolderPath: deleteProjectPath });
    const newProject = await project.refresh();
    pages.refresh(newProject.dataSource.folderPath);
    dependencies.refresh(newProject.dataSource.folderPath);
    toggleDeleteProjectModal();
  }

  const projectPreDelete = projects
    .dataSource
    .find(({ folderPath }) => {
      return folderPath === deleteProjectPath;
    }) || {};

  return (
    <div className={styles.page}>
      {projects.dataSource.length ? <SubMenu
        projects={projects.dataSource}
        project={project.dataSource}
        onSwitchProject={onSwitchProject}
        onDeleteProject={onDeleteProject}
        onOpenProject={onOpenProject}
        onCreateProject={onCreateProject}
      /> : null}
      <OpenProject
        on={onOpenProjectModel}
        onCancel={toggleOpenProjectModal}
        onOk={addProject}
      />
      <DeleteProject
        on={onDeleteProjectModel}
        onCancel={toggleDeleteProjectModal}
        onOk={deleteProject}
        project={projectPreDelete}
      />
      {
        projects.dataSource.length ?
          <div className={styles.main}>
            testing...
          </div> :
          <Guide
            onOpenProject={onOpenProject}
            onCreateProject={onCreateProject}
          />
      }
    </div>
  );
};

export default Project;
