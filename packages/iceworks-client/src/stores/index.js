import Icestore from '@ice/store';
import projects from './projects';
import project from './project';
import material from './material';
import progress from './progress';
import dependencies from './dependencies';
import configuration from './configuration';
import user from './user';

const icestore = new Icestore();
icestore.registerStore('material', material);
icestore.registerStore('project', project);
icestore.registerStore('projects', projects);
icestore.registerStore('progress', progress);
icestore.registerStore('dependencies', dependencies);
icestore.registerStore('user', user);
icestore.registerStore('configuration', configuration);

export default icestore;
