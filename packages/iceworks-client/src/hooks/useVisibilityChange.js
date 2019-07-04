import { useEffect } from 'react';

export default function useVisibilityChange(handleVisibilityChange) {
  useEffect(() => {
    let hidden;
    let visibilityChange;

    if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
      hidden = 'hidden';
      visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      hidden = 'msHidden';
      visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
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
