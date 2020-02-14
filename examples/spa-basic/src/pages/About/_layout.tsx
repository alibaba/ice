import React from 'react'

export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{minHeight: '100vh'}}>
      <section>
        Headerxxx
        {children}
      </section>
    </div>
  );
}
