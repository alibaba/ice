import Icestore from 'icestore';
import projects from './projects';
import project from './project';
import material from './material';

const icestore = new Icestore();
icestore.registerStore('material', material);
icestore.registerStore('project', project);
icestore.registerStore('projects', projects);

export default icestore;
