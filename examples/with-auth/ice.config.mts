import { defineConfig } from '@ice/app';
import auth from '@ice/plugin-auth';

export default defineConfig({
  plugins: [
    auth(),
  ],
});
