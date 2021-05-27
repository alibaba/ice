import * as React from 'react';
// @ts-ignore
import { ThemeProvider } from '$ice/themes';

export default ({ addProvider }: any) => {
  if (ThemeProvider) {
    addProvider(({ children }: any) => {
      return <ThemeProvider>{children}</ThemeProvider>;
    });
  }
};