import React from 'react';

export default function BasicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      BasicLayout
      {children}
    </div>
  );
}
