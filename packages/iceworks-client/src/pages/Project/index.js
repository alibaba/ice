import React, { useEffect } from 'react';
import { Input, Button } from '@alifd/next';
import { useModel } from '@store';

const Project = () => {
  const [projects] = useModel('projects');
  const [materials] = useModel('materials');

  const { state: projectsState } = projects;
  const { state: materialsState } = materials;

  useEffect(() => {
    (async () => {
      await projects.init();
      await materials.init();
    })();
  }, []);

  const currentProject = projects.getCurrent();

  return (
    <div>
      <h2>Project</h2>
      <div>
        now project: {currentProject.name}
      </div>
      <div>
        <div>list</div>
        <ul>
          {projectsState.dataSource.map((projectData, index) => {
            const { name, id } = projectData;
            return (
              <li key={index}>
                <a onClick={async () => { await projects.setCurrent(id); }}>
                  {name}
                </a>
                <Button onClick={async () => { await projects.remove(id); }}>
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
        <div>materials</div>
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
