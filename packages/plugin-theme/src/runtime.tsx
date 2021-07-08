import * as React from 'react';
// @ts-ignore
import { ThemeProvider } from '$ice/theme';

export default ({ addProvider, initialData }: any) => {
  if (ThemeProvider) {
    addProvider(({ children }: any) => {
      return <ThemeProvider initialTheme={initialData?.theme}>{children}</ThemeProvider>;
    });
  }
};