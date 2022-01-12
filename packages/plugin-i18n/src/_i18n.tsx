import * as React from 'react';

export const I18nProvider = ({ children }) => {
  return (<div>{children}</div>);
};

export function getLocale() {
  return '';
}