import { defineConfig } from '@ice/app';
import store from '@ice/plugin-store';

export default defineConfig(() => ({
  plugins: [
    store({
      resetPageState: true,
    }),
  ],
}));
