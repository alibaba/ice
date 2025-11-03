import React from 'react';
import { defineAppConfig } from 'ice';

// Custom fallback element.
const CustomFallback = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '18px',
      color: '#666',
    }}
  >
    <div>
      <div>🔄 Loading...</div>
      <div style={{ fontSize: '14px', marginTop: '8px' }}>
        Custom fallback element from app.tsx configuration
      </div>
    </div>
  </div>
);

export default defineAppConfig({
  app: {
    rootId: 'app',
  },
  router: {
    type: 'hash',
    fallbackElement: <CustomFallback />,
  },
});
