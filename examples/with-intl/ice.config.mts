import { defineConfig } from '@ice/app';
import intl from '@ice/plugin-intl';

export default defineConfig(() => ({
  plugins: [intl()],
}));
