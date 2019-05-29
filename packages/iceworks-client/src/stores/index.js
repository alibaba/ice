import Icestore from 'icestore';
import projects from './projects';
import project from './project';
import material from './material';
import progress from './progress';

const icestore = new Icestore();
icestore.registerStore('material', material);
icestore.registerStore('project', project);
icestore.registerStore('projects', projects);
icestore.registerStore('progress', progress);

export default icestore;
