import type { Plugin } from 'vite';

const eslintPlugin = (): Plugin => {
  return {
    name: 'vite-plugin-eslint-reporting',
    async transform(code, id) {
      return null;
    },
  };
};