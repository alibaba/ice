import { ipcRenderer } from 'electron';
import projects from '../stores/projects';

ipcRenderer.on('menu:project:console:toggle', () => {
  if (projects.currentProject) {
    projects.currentProject.toggleTerminal();
  }
});
