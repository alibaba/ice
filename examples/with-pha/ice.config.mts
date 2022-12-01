import { defineConfig } from '@ice/app';
import pha from '@ice/plugin-pha';
import testPlugin from './testPlugin';

export default defineConfig({
  plugins: [
    pha({ template: true }),
    // testPlugin(),
  ],
  ssg: false,
  ssr: false,
  // output: {
  //   distType: ['html', 'javascript'],
  // },
});