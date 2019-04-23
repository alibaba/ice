import React, { useEffect } from 'react';
import { Input, Button } from '@alifd/next';
import { useModel } from '@store';

const Project = () => {
  const [projects] = useModel('projects');
  const [project] = useModel('project');
  const [materials] = useModel('materials');

  const { state: projectState } = project;
  const { state: { dataSource } } = projects;
  const { state: materialsState } = materials;

  useEffect(() => {
    (async () => {
      await project.refresh();
      await projects.refresh();
      await materials.refresh();
    })();
  }, []);

  return (
    <div>
      <h2>Project</h2>
      <div>
        now project: {projectState.name}
        <div>
          my pages:
          <ul>
            {projectState.pages.map(({ name }) => {
              return name;
            })}
          </ul>
        </div>
      </div>
      <div>
        <div>my projects</div>
        <ul>
          {dataSource.map((projectData, index) => {
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
          onPressEnter={async (event) => {
            await projects.add({ name: event.target.value });
          }}
        />
      </div>
      <div>
        <div>my materials</div>
        <ul>
          {materialsState.dataSource.map(({ name }, index) => {
            return <li key={index}>{name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Project;
