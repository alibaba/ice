// 该文件仅用于 module.tsx 中引用 $ice/i18n 的编译问题
import * as React from 'react';

export const I18nProvider = ({ children }) => {
  return (<div>{children}</div>);
};

export function getLocale() {
  return '';
}

export function getLocaleFromCookies() {
  return '';
}