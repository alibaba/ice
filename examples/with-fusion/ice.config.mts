import { defineConfig } from '@ice/app';
import fusion from '@ice/plugin-fusion';
import cssAssetsLocal from '@ice/plugin-css-assets-local';
import moment from '@ice/plugin-moment-locales';

export default defineConfig({
  plugins: [
    fusion({
      importStyle: true,
      theme: {
        'primary-color': '#89d',
      },
    }),
    cssAssetsLocal(),
    moment({
      locales: ['af'],
    }),
  ],
});
