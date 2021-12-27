import * as React from 'react';

export const LocaleProvider = ({ children }) => {
  return (<div>{children}</div>);
};

export function getLocale() {
  return '';
}