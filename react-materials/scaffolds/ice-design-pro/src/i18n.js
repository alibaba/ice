/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
const addLocaleData = require('react-intl').addLocaleData;
const enLocaleData = require('react-intl/locale-data/en');
const zhLocaleData = require('react-intl/locale-data/zh');

const enTranslationMessages = require('./translations/en.json');
const zhTranslationMessages = require('./translations/zh.json');

addLocaleData(enLocaleData);
addLocaleData(zhLocaleData);

const DEFAULT_LOCALE = 'zh';

const appLocales = ['en', 'zh'];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  zh: formatTranslationMessages('zh', zhTranslationMessages),
};

export {
  appLocales,
  formatTranslationMessages,
  translationMessages,
  DEFAULT_LOCALE,
};
