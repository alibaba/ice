import React from 'react';
// @ts-ignore
import { ThemeProvider, Themes } from '$ice/themes';
import { DEFAULT, ENABLE_THEMES } from './constant';

export default ({ addProvider, getValue }: any) => {
  const defaultTheme: Themes = getValue(DEFAULT);
  const enableThemes = getValue(ENABLE_THEMES);

  // 如果未开启，则关闭
  if (ThemeProvider && enableThemes) {
    addProvider(({ children }: any) => {
      return <ThemeProvider defaultTheme={defaultTheme}>{children}</ThemeProvider>;
    });
  }
};