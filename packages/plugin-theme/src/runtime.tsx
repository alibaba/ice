import React from 'react';
// @ts-ignore
import { ThemeProvider, Themes } from '$ice/themes';
import { DEFAULT } from './constant';

export default ({ addProvider, getValue }: any) => {
  const defaultTheme: Themes = getValue(DEFAULT);

  if (ThemeProvider) {
    addProvider(({ children }: any) => {
      return <ThemeProvider defaultTheme={defaultTheme}>{children}</ThemeProvider>;
    });
  }
};