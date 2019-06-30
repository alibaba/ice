import Icestore from '@ice/store';
import projects from './projects';
import project from './project';
import material from './material';
import task from './task';
import progress from './progress';
import dependencies from './dependencies';
import user from './user';
import globalTerminal from './globalTerminal';

const icestore = new Icestore();
icestore.registerStore('material', material);
icestore.registerStore('project', project);
icestore.registerStore('projects', projects);
icestore.registerStore('progress', progress);
icestore.registerStore('dependencies', dependencies);
icestore.registerStore('user', user);
icestore.registerStore('globalTerminal', globalTerminal);
icestore.registerStore('task', task);

export default icestore;
