import Icestore from '@ice/store';
import projects from './projects';
import project from './project';
import material from './material';
import task from './task';
import progress from './progress';
import dependencies from './dependencies';
import user from './user';
import globalTerminal from './globalTerminal';
import settingPanel from './settingPanel';

const stores = {
  material,
  project,
  projects,
  progress,
  dependencies,
  user,
  globalTerminal,
  task,
  settingPanel,
};

const icestore = new Icestore();
Object.keys(stores).forEach(key => icestore.registerStore(key, stores[key]));

export default icestore;
