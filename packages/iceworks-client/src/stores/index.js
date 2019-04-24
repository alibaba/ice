import react from 'react';
import projects from './projects';
import currentProject from './currentProject';
import materials from './materials';
import Fizzz from 'fiy';

const fizzz = new Fizzz(react);
fizzz.registerStore('materials', materials);
fizzz.registerStore('project', currentProject);
fizzz.registerStore('projects', projects);

export default fizzz;
