module.exports = {
  init: {
    desc: 'generate a new project from a template',
    options: [
      {
        name: '--offline',
        desc: 'use cached template',
      },
    ],
  },
  add: {
    desc: 'add a new block/scaffold from a official templates',
  },
  start: {
    desc: 'Start Dev Server',
    options: [
      {
        name: '-p --port [port]',
        desc: 'start port',
      },
    ],
  },
  build: {
    desc: 'Build Component',
  },
  screenshot: {
    desc: 'Create screenshot.png',
  },
  generate: {
    desc: 'Generate database json',
  },
  sync: {
    desc: 'Sync materials to https://fusion.design',
    options: [
      {
        name: '-d',
        desc: 'sync to daily site ',
      },
      {
        name: '-o',
        desc: 'sync to prod site https://fusion.design',
      },
    ],
  },
  clear: {
    desc: 'Clear cache data',
  },
};
