import * as React from 'react';

interface State {
  error: Error;
}

interface Props {
  children?: React.ReactNode;
}

export default class AppErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    error: null,
  };

  public static getDerivedStateFromError(error: Error) {
    return { error };
  }

  public componentDidCatch(error, errorInfo) {
    console.error('AppErrorBoundary', error, errorInfo);
  }

  public render() {
    if (this.state.error) {
      // TODO: Show the error message and the error stack.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}