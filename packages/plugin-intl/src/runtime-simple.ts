import type { RuntimePlugin } from '@ice/runtime/types';
import { getDefaultLocale, getLocaleMessages, EXPORT_NAME } from './intl-until.js';

let currentLocale = getDefaultLocale();
let localeMessages = getLocaleMessages();

const runtime: RuntimePlugin = async ({
  appContext,
}) => {
  const { appExport } = appContext;
  const { getLocale, ...l } = appExport?.[EXPORT_NAME] || {};
  if (Object.keys(l)?.length > 0) {
    console.error('The locale config is not supported in the simple mode.');
  }
  const locale = getLocale ? getLocale() : getDefaultLocale();
  currentLocale = locale;
  // Refresh locale messages for server side because of import hoisting.
  localeMessages = getLocaleMessages();
};

interface MessageDescriptor {
  id: string;
  defaultMessage?: string;
}

const intl = {
  formatMessage: (message: MessageDescriptor | string, values?: Record<string, string>) => {
    let messageId = typeof message === 'string' ? message : message.id;
    const defaultMessage = typeof message === 'string' ? message : message.defaultMessage;
    let content = localeMessages?.[currentLocale]?.[messageId];
    if (!content) {
      console.error(`Message with id "${messageId}" not found in locale "${currentLocale}"`);
      return defaultMessage || messageId;
    }
    if (values) {
      Object.keys(values).forEach((key) => {
        content = content.replace(new RegExp(`{${key}}`, 'g'), values[key]);
      });
    }
    return content;
  },
};

export { intl };

export default runtime;
