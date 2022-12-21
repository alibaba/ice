import { defineConfig } from '@ice/app';
import icestark from '@ice/plugin-icestark';

export default defineConfig(() => ({
  plugins: [
    icestark({
      type: 'child',
    }),
  ]
}));
