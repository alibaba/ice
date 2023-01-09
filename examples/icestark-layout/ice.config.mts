import { defineConfig } from '@ice/app';
import icestark from '@ice/plugin-icestark';

export default defineConfig(() => ({
  ssr: false,
  ssg: false,
  plugins: [
    icestark({
      type: 'framework',
    }),
  ]
}));
