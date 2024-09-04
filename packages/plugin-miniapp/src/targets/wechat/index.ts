import Template from './template.js';
import { components } from './components.js';

export default {
  globalObject: 'wx',
  projectConfigJson: 'project.config.json',
  fileType: {
    templ: '.wxml',
    style: '.wxss',
    config: '.json',
    script: '.js',
    xs: '.wxs',
  },
  template: new Template(),
  components,
};
