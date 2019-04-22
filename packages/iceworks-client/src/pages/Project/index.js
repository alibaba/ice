import React, { useEffect } from 'react';
import { Input } from '@alifd/next';
import { useModel } from '@store';

const Project = () => {
  const [projectState, project] = useModel('project');
  const [projectsState, projects] = useModel('projects');
  const [materialsState] = useModel('materials');

  useEffect(() => {
    (async () => {
      await project.init();
      await projects.init();
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
        <div>materialsState</div>
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
