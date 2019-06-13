import Icestore from 'icestore';
import projects from './projects';
import project from './project';
import material from './material';
import progress from './progress';
import dependencies from './dependencies';
import user from './user';

const icestore = new Icestore();
icestore.registerStore('material', material);
icestore.registerStore('project', project);
icestore.registerStore('projects', projects);
icestore.registerStore('progress', progress);
icestore.registerStore('dependencies', dependencies);
icestore.registerStore('user', user);

export default icestore;
