import * as React from 'react';
import './index.css';

interface ComponentProps {
  /** Title for IceCompat. */
  title: string;
}

export default function IceCompat(props: ComponentProps) {
  const { title = 'Hello World!' } = props;

  return (
    <div className="ice-compat">{title}</div>
  );
}
