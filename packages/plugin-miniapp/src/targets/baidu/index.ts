import Template from './template.js';

export default {
  globalObject: 'swan',
  fileType: {
    templ: '.swan',
    style: '.css',
    config: '.json',
    script: '.js',
    xs: '.sjs',
  },
  template: new Template(),
};
