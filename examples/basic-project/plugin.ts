import fs from 'fs';

export default {
  name: 'custom-plugin',
  setup({ onGetConfig }) {
    onGetConfig((config) => {
      config.transformPlugins = [...(config.transformPlugins || []), {
        name: 'custom-transform',
        transformInclude(id) {
          return !!id.match(/app.tsx$/);
        },
        loadInclude(id) {
          return !!id.match(/app.tsx$/);
        },
        load(id) {
          return fs.readFileSync(id, 'utf-8');
        },
        transform(code) {
          return code;
        },
      }];
    });
  },
};