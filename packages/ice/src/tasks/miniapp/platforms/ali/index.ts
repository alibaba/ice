import Template from './template.js';

export default {
  globalObject: 'my',
  projectConfigJson: 'mini.project.json',
  fileType: {
    templ: '.axml',
    style: '.acss',
    config: '.json',
    script: '.js',
    xs: '.sjs',
  },
  template: new Template(),
};
