import React, { useEffect } from 'react';
import { Input, Button } from '@alifd/next';
import stores from '@stores';

const Project = () => {
  const projects = stores.useStore('projects');
  const project = stores.useStore('project');
  const materials = stores.useStore('materials');

  useEffect(() => {
    project.refresh();
    projects.refresh();
    materials.refresh();
  }, []);

  return (
    <div>
      <h2>Project</h2>
      <div>
        now project: {project.dataSource.name}
        <div>
          my pages:
          <ul>
            {project.dataSource.pages.map(({ name }) => {
              return name;
            })}
          </ul>
        </div>
      </div>
      <div>
        <div>my projects</div>
        <ul>
          {projects.dataSource.map((projectData, index) => {
            const { name, id } = projectData;
            return (
              <li key={index}>
                <a onClick={async () => { await project.setData(projectData); }}>
                  {name}
                </a>
                <Button
                  onClick={async () => {
                    await projects.remove(id);
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
      <div>
        <div>my materials</div>
        <ul>
          {materials.dataSource.map(({ name }, index) => {
            return <li key={index}>{name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Project;
