import react from 'react';
import Fiy from 'fiy';
import projects from './projects';
import currentProject from './currentProject';
import materials from './materials';

const fiy = new Fiy(react);
fiy.registerStore('materials', materials);
fiy.registerStore('project', currentProject);
fiy.registerStore('projects', projects);

export default fiy;
