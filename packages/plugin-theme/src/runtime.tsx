import * as React from 'react';
// @ts-ignore
import { ThemeProvider } from '$ice/theme';

export default ({ addProvider, initialData }: any) => {
  // 当 __themesData__ 存在时才包裹 ThemeProvider
  if (ThemeProvider && (window as any).__themesData__) {
    addProvider(({ children }: any) => {
      return (
        <ThemeProvider initialTheme={initialData?.theme}>
          {children}
        </ThemeProvider>
      );
    });
  }
};
