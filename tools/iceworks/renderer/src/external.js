import { shell } from 'electron';
import services from './services';
import glodlog from './lib/glodlog';

export const openInEditor = (path) => {
  services.editors.open(path);
  glodlog.log({
    type: 'external', 
    action: 'open-external-editor',
    path,
  });
};

export const openInShell = (path) => {
  services.shells.open(path);
  glodlog.log({
    type: 'external', 
    action: 'open-in-shell',
    path,
  });
};

export const openInFinder = (path) => {
  services.folder.open(path);
  glodlog.log({
    type: 'external', 
    action: 'open-in-finder',
    path,
  });
};

export const openInBrowser = (url) => {
  shell.openExternal(url);
  glodlog.log({
    type: 'external', 
    action: 'open-in-browser',
    url,
  });
};
