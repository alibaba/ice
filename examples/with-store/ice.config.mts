import { defineConfig } from '@ice/app';
import store from '@ice/plugin-store';

export default defineConfig(() => ({
  ssg: false,
  plugins: [
    store({
      resetPageState: true,
    }),
  ],
}));
