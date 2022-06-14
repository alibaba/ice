import { defineConfig } from '@ice/pkg';

export default defineConfig({
  bundle: {
    filename: 'rax-compat',
    formats: ['umd', 'es2017'],
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  transform: {
    formats: ['esm', 'es2017'],
  },
});
