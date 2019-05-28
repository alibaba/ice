import Icestore from 'icestore';
import projects from './projects';
import project from './project';
import materials from './materials';
import progress from './progress';

const icestore = new Icestore();
icestore.registerStore('materials', materials);
icestore.registerStore('project', project);
icestore.registerStore('projects', projects);
icestore.registerStore('progress', progress);

export default icestore;
