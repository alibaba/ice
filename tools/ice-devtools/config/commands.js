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
    desc: 'Generate materials json',
  },
  sync: {
    desc: 'Sync materials json to https://fusion.design',
  },
  'sync-unpkg': {
    desc: 'Sync materials json to https://unpkg.com'
  },
  clear: {
    desc: 'Clear cache data',
  },
};
