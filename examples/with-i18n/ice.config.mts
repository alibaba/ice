import { defineConfig } from '@ice/app';
import i18n from '@ice/plugin-i18n';

export default defineConfig({
  plugins: [
    i18n({
      locales: ['zh-CN', 'en-US'],
      defaultLocale: 'zh-CN',
    }),
  ],
});
