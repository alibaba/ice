import React, { useEffect } from 'react';
import { Input, Button } from '@alifd/next';
import stores from '@stores';
import logger from '@utils/logger';
import Page from './components/Page';
import Dependency from './components/Dependency';
import projectStores from './stores';

const Project = () => {
  const [projects, project] = stores.userStores(['projects', 'project']);
  const [pages, dependencies] = projectStores.userStores(['pages', 'dependencies']);

  useEffect(() => {
    logger.info('Project page loaded.');

    projects.refresh();
    project.refresh();

    // TODO 根据当前项目的变化进行更新
    pages.refresh();
    dependencies.refresh();
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
                <a onClick={async () => { await project.reset(folderPath); }}>
                  {name}
                </a>
                <Button
                  onClick={async () => {
                    await projects.remove(folderPath);
                    await project.refresh();
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
