import React, { isValidElement } from 'react';
import type { ComponentWithChildren } from '@ice/types';
import useMounted from './useMounted.js';

const ClientOnly: ComponentWithChildren<{ fallback: React.ReactNode }> = ({ children, fallback }) => {
  const mounted = useMounted();

  // Ref https://github.com/facebook/docusaurus/blob/v2.1.0/packages/docusaurus/src/client/exports/BrowserOnly.tsx
  if (mounted) {
    if (
      typeof children !== 'function' &&
      process.env.NODE_ENV === 'development'
    ) {
      throw new Error(`Error: The children of <ClientOnly> must be a "render function", e.g. <ClientOnly>{() => <span>{window.location.href}</span>}</ClientOnly>.
Current type: ${isValidElement(children) ? 'React element' : typeof children}`);
    }
    return <>{children?.()}</>;
  }

  return fallback ?? null;
};

export default ClientOnly;
