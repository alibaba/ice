import { defineConfig } from '@ice/app';
import icestark from '@ice/plugin-icestark';

export default defineConfig(() => ({
  ssr: false,
  ssg: false,
  plugins: [
    icestark({
      type: 'framework',
    }),
    {
      setup({ onGetConfig }) {
        // Enable option `enableCopyPlugin`, so devserver can access public folder when run test.
        if (process.env.NODE_ENV === 'test') {
          onGetConfig((config) => {
            return {
              ...config,
              enableCopyPlugin: true,
            }
          });
        }
      }
    }
  ]
}));
