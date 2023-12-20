'use client';
import { Component, lazy, Suspense } from 'react';
import type { ReactNode } from 'react';

type EProps = {
  children: ReactNode;
};

type EState = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<EProps, EState> {
  state: EState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // @ts-ignore
      const ClientComments = lazy(() => import('./CommentsWithServerError'));

      return (
        <Suspense fallback="loading client comments">
          <h3>Client Comments</h3>
          <ClientComments />
        </Suspense>
      );
    }

    return this.props.children;
  }
}