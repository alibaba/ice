import react from 'react';

export function HeadStreamErrorRecoverScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
            window.addEventListener('load', () => {
              if (!window._$ServerTimePoints && !window.__ICE_APP_CONTEXT__) {
                window.location.hostname = 'pages.tmall.com';
              }
            })`,
      }
      }
      crossOrigin="anonymous"
    />
  );
}
