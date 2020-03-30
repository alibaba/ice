import React from 'react';

export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{minHeight: '100vh'}}>
      <section>
        Header
        {children}
      </section>
    </div>
  );
}
