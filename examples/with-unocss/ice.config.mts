import { defineConfig } from '@ice/app';
import Unocss from '@ice/plugin-unocss';

export default defineConfig(() => ({
  plugins: [
    Unocss(),
  ]
}));
