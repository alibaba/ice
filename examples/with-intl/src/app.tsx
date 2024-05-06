import { defineAppConfig } from 'ice';
import type { LocaleConfig } from '@ice/plugin-intl/types';

export default defineAppConfig(() => ({}));

export const locale: LocaleConfig = {
  getLocale: () => 'en-US',
};
