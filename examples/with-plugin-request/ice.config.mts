import { defineConfig } from '@ice/app';
import request from '@ice/plugin-request';

export default defineConfig({
  plugins: [
    request(),
  ],
});
