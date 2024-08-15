import React from 'react';

export default function HeadStreamErrorRecoverScript({ downgradeCSRHostname }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
            window.addEventListener('load', () => {
              if (!window._$ServerTimePoints && !window.__ICE_APP_CONTEXT__) {
                window.location.hostname = '${downgradeCSRHostname}';
              }
            })`,
      }}
      crossOrigin="anonymous"
    />
  );
}
