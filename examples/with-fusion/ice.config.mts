import { defineConfig } from '@ice/app';
import fusion from '@ice/plugin-fusion';
import cssAssetsLocal from '@ice/plugin-css-assets-local';

export default defineConfig({
  plugins: [
    fusion({
      importStyle: true,
      theme: {
        'primary-color': '#89d',
      },
    }),
    cssAssetsLocal(),
  ],
});
