import React, { useEffect } from 'react';
import { Input, Button } from '@alifd/next';
import stores from '@stores';
import logger from '@utils/logger';
import Page from './components/Pages';
import Dependency from './components/Dependencies';
import projectStores from './stores';

const Project = () => {
  const [projects, project] = stores.useStores(['projects', 'project']);
  const [pages, dependencies] = projectStores.useStores([
    'pages',
    'dependencies',
  ]);

  useEffect(() => {
    logger.info('Project page loaded.');

    projects.refresh();

    async function fetchProject() {
      const newProject = await project.refresh();
      pages.refresh(newProject.dataSource.folderPath);
      dependencies.refresh(newProject.dataSource.folderPath);
    }

    fetchProject();
  }, []);

  return (
    <div>
      <h2>Project</h2>
      <div>
        now project: {project.dataSource.name}
        <div>
          <Page />
          <Dependency />
        </div>
      </div>
      <div>
        <div>my projects:</div>
        <ul>
          {projects.dataSource.map((projectData, index) => {
            const { name, folderPath } = projectData;
            return (
              <li key={index}>
                <a
                  onClick={async () => {
                    const newProject = await project.reset(folderPath);
                    pages.refresh(newProject.dataSource.folderPath);
                    dependencies.refresh(newProject.dataSource.folderPath);
                  }}
                >
                  {name}
                </a>
                <Button
                  onClick={async () => {
                    await projects.remove(folderPath);
                    const newProject = await project.refresh();
                    pages.refresh(newProject.dataSource.folderPath);
                    dependencies.refresh(newProject.dataSource.folderPath);
                  }}
                >
                  删除
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <Input
          type="text"
          onPressEnter={(event) => {
            projects.add({ name: event.target.value });
          }}
        />
      </div>
    </div>
  );
};

export default Project;
