import * as React from 'react';
// @ts-ignore
import { ThemeProvider } from '$ice/themes';

export default ({ addProvider }: any) => {
  // 如果未开启，则关闭
  if (ThemeProvider) {
    addProvider(({ children }: any) => {
      return <ThemeProvider>{children}</ThemeProvider>;
    });
  }
};