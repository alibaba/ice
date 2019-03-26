module.exports = {
  init: {
    desc: 'generate a new project from a template',
    options: [
      {
        name: '--template [template]',
        desc: 'use npm template'
      },
      {
        name: '--type [type]',
        desc: 'materail type, e.g. block/component',
      }
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
      {
        name: '--analyzer',
        desc: 'bunlde analyzer',
      }
    ],
  },
  build: {
    desc: 'Build Component',
    options: [
      {
        name: '--analyzer',
        desc: 'bunlde analyzer',
      },
      {
        name: '--skip-demo',
        desc: 'skip build demo',
      },
    ],
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
