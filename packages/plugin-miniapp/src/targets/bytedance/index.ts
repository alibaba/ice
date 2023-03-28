import Template from './template.js';

export default {
  globalObject: 'tt',
  projectConfigJson: 'project.tt.json',
  fileType: {
    templ: '.ttml',
    style: '.ttss',
    config: '.json',
    script: '.js',
  },
  template: new Template(),
};
