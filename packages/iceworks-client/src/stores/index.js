import Icestore from 'icestore';
import projects from './projects';
import currentProject from './currentProject';
import materials from './materials';

const icestore = new Icestore();
icestore.registerStore('materials', materials);
icestore.registerStore('project', currentProject);
icestore.registerStore('projects', projects);

export default icestore;
