import { defineConfig } from '@ice/app';
import pha from '@ice/plugin-pha';

export default defineConfig({
  plugins: [pha({ template: true })],
});