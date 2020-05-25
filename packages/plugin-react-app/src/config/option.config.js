module.exports = {
  https: {
    commands: ['start'],
  },
  analyzer: {
    commands: ['start', 'build'],
  },
  'analyzer-port': {
    commands: ['start', 'build'],
    module: 'analyzerPort',
  },
  'disable-reload': {
    commands: ['start'],
    module: 'disableReload',
  },
  'disable-mock': {
    module: false,
    commands: ['start'],
  },
  'disable-open': {
    module: false,
    commands: ['start'],
  },
  'mode': {
    module: false,
    commands: ['start', 'build'],
  },
  'disable-assets': {
    module: false,
    commands: ['start'],
  },
};
