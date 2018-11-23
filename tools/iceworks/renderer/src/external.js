import { shell, remote } from 'electron';
const services = remote.getGlobal('services');
const log = services.log;

export const openInEditor = (path) => {
  services.editors.open(path);
  log.report('external', {
    action: 'open-external-editor',
    path,
  });
};

export const openInShell = (path) => {
  services.shells.open(path);
  log.report('external', {
    action: 'open-in-shell',
    path,
  });
};

export const openInFinder = (path) => {
  services.folder.open(path);
  log.report('external', {
    action: 'open-in-finder',
    path,
  });
};

export const openInBrowser = (url) => {
  shell.openExternal(url);
  log.report('external', {
    action: 'open-in-browser',
    url: url,
  });
};
