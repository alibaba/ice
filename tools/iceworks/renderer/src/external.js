import { shell } from 'electron';
import services from './services';

const { glodlog, editors, shells, folder } = services;

export const openInEditor = (path) => {
  editors.open(path);
  glodlog.record({
    type: 'external',
    action: 'open-external-editor',
    path,
  });
};

export const openInShell = (path) => {
  shells.open(path);
  glodlog.record({
    type: 'external',
    action: 'open-in-shell',
    path,
  });
};

export const openInFinder = (path) => {
  folder.open(path);
  glodlog.record({
    type: 'external',
    action: 'open-in-finder',
    path,
  });
};

export const openInBrowser = (url) => {
  shell.openExternal(url);
  glodlog.record({
    type: 'external',
    action: 'open-in-browser',
    url,
  });
};
