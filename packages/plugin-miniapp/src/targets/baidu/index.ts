import Template from './template.js';
import { components } from './components.js';

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
  components,
};
