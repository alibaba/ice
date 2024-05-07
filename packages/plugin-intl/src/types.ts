import type { IntlConfig } from 'react-intl';

interface AdditionalConfig {
  getLocale: () => string;
}

export type LocaleConfig = Partial<IntlConfig> & AdditionalConfig;
