import * as React from 'react';
import { useRef } from 'react';
import type { FC } from 'react';

const module = ({ addProvider }) => {
  // React Component for log vite time
  const TimeProvider: FC = ({ children }) => {
    const willMount = useRef(true);
    if (willMount.current) {
      fetch('/__log_speed__');
    }
    willMount.current = false;
    return <>{children}</>;
  };
  addProvider(TimeProvider);
};

export default module;