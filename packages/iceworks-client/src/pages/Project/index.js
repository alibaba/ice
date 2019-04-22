import React, { useEffect } from 'react';
import { Input } from '@alifd/next';
import { useModel } from '@store';

const Project = () => {
  const [project] = useModel('project');
  const [projects] = useModel('projects');
  const [materials] = useModel('materials');

  const { state: projectState } = project;
  const { state: projectsState } = projects;
  const { state: materialsState } = materials;

  useEffect(() => {
    (async () => {
      await project.init();
      await projects.init();
      await materials.init();
    })();
  }, []);

  return (
    <div>
      <h2>Project</h2>
      <div>
        {projectState.name}
      </div>
      <div>
        <div>list</div>
        <ul>
          {projectsState.dataSource.map(({ name }, index) => {
            return <li key={index}>{name}</li>;
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
