import React, { useEffect } from 'react';
// import { Input, Button } from '@alifd/next';
import stores from '@stores';
import logger from '@utils/logger';
// import Page from './components/Pages';
// import Dependency from './components/Dependencies';
import SubMenu from './components/SubMenu';
import projectStores from './stores';
import styles from './index.module.scss';

const Project = () => {
  const [projects, project] = stores.useStores(['projects', 'project']);
  const [pages, dependencies] = projectStores.useStores([
    'pages',
    'dependencies',
  ]);

  useEffect(() => {
    logger.info('Project page loaded.');

    projects.refresh();

    (async () => {
      const newProject = await project.refresh();
      pages.refresh(newProject.dataSource.folderPath);
      dependencies.refresh(newProject.dataSource.folderPath);
    })();
  }, []);

  async function onSwitchProject(folderPath) {
    const newProject = await project.reset(folderPath);
    pages.refresh(newProject.dataSource.folderPath);
    dependencies.refresh(newProject.dataSource.folderPath);
  }

  async function onDeleteProject(folderPath) {
    await projects.remove(folderPath);
    const newProject = await project.refresh();
    pages.refresh(newProject.dataSource.folderPath);
    dependencies.refresh(newProject.dataSource.folderPath);
  }

  return (
    <div className={styles.page}>
      <SubMenu
        projects={projects.dataSource}
        project={project.dataSource}
        onSwitchProject={onSwitchProject}
        onDeleteProject={onDeleteProject}
      />
      <div className={styles.main}>
        testing...
      </div>
    </div>
  );
};

export default Project;
