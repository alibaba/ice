import React, { useEffect } from 'react';
import { Icon, Button } from '@alifd/next';
import stores from '@stores';
import logger from '@utils/logger';
import useModal from '@hooks/useModal';
// import Page from './components/Pages';
// import Dependency from './components/Dependencies';
import SubMenu from './components/SubMenu';
import OpenProject from './components/OpenProject';
import projectStores from './stores';
import styles from './index.module.scss';

const Project = () => {
  const { on, toggleModal } = useModal();
  const [projects, project] = stores.useStores(['projects', 'project']);
  const [pages, dependencies] = projectStores.useStores([
    'pages',
    'dependencies',
  ]);

  useEffect(() => {
    logger.info('Project page loaded.');

    (async () => {
      await projects.refresh();
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
    await projects.delete(folderPath);
    const newProject = await project.refresh();
    pages.refresh(newProject.dataSource.folderPath);
    dependencies.refresh(newProject.dataSource.folderPath);
  }

  async function onOpenProject() {
    toggleModal();
  }

  async function onCreateProject() {
    // TODO
    window.location.href = '/material';
  }

  async function addProject(path) {
    await projects.add(path);
    const newProject = await project.refresh();
    pages.refresh(newProject.dataSource.folderPath);
    dependencies.refresh(newProject.dataSource.folderPath);
    toggleModal();
  }

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
        on={on}
        onCancel={toggleModal}
        onOk={addProject}
      />
      {
        projects.dataSource.length ?
          <div className={styles.main}>
            testing...
          </div> :
          <div className={styles.guide}>
            <div className={styles.text}>
              从热门模板开始初始化你的项目
            </div>
            <div className={styles.opts}>
              <Button className={styles.btn} type="secondary" size="large" onClick={onOpenProject}>
                <Icon type="download" size="xl" />
                <span>打开项目</span>
              </Button>
              <Button className={styles.btn} type="primary" size="large" onClick={onCreateProject}>
                <Icon type="add" size="xl" />
                <span>更多模板</span>
              </Button>
            </div>
          </div>
      }
    </div>
  );
};

export default Project;
