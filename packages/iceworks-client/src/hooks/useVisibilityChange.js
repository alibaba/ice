import { useEffect } from 'react';

export default function useVisibilityChange(handleVisibilityChange) {
  useEffect(() => {
    // Browser compatibility for window visible event and  document hide field
    let hidden;
    let visibilityChange;
    if (typeof document.hidden !== 'undefined') { // Opera and Firefox
      hidden = 'hidden';
      visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') { // Microsoft
      hidden = 'msHidden';
      visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') { // Webkit
      hidden = 'webkitHidden';
      visibilityChange = 'webkitvisibilitychange';
    }

    function handle() {
      handleVisibilityChange(document[hidden]);
    }

    document.addEventListener(visibilityChange, handle, false);

    return () => {
      document.removeEventListener(visibilityChange, handle, false);
    };
  }, []);
}
