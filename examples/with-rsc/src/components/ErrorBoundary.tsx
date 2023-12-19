'use client';
import { Component } from 'react';
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
      return <h1 id="fallback">Something went wrong.</h1>;
    }

    return this.props.children;
  }
}