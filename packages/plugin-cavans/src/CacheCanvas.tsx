import { useEffect, useState } from 'react';
import * as React from 'react';
import { useMounted } from '@ice/runtime';

declare global {
  interface Window {
    WindVane: {
      call: Function;
    };
    _windvane_backControl: Function | null;
  }
}

export function CacheCanvas(props) {
  const {
    id,
    init,
    useCache,
    ...rest
  } = props;
  const [renderedCanvas, setRenderedCanvas] = useState(useCache);
  const cacheKey = `cache-canvas-${id}`;

  const mounted = useMounted();

  const cacheCanvasFunc = () => {
    // Cache base64 string of canvas.
    const canvas: HTMLCanvasElement | null = document.getElementById(id) as HTMLCanvasElement;
    const strBase64 = canvas.toDataURL();
    localStorage.setItem(cacheKey, strBase64);
  };

  useEffect(() => {
    if (window.WindVane) {
      window.WindVane.call('WebAppInterface', 'enableHookNativeBack', {});
      window._windvane_backControl = () => {
        cacheCanvasFunc();
        return 'true';
      };
    }
    document.addEventListener('wvBackClickEvent', cacheCanvasFunc, false);
    window.addEventListener('beforeunload', cacheCanvasFunc);

    return () => {
      window.removeEventListener('beforeunload', cacheCanvasFunc);
      window.removeEventListener('wvBackClickEvent', cacheCanvasFunc);
      if (window._windvane_backControl) {
        window._windvane_backControl = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mounted && typeof init === 'function') {
      const res = init();
      if (res instanceof Promise) {
        res.then(() => {
          setRenderedCanvas(true);
        });
      }
    }
  }, [mounted, init]);

  return (
    <>
      <canvas style={{ display: renderedCanvas ? '' : 'none' }} id={id} {...rest} />
      {
        !renderedCanvas && (<>
          <img src={localStorage.getItem(cacheKey) || ''} id={`canvas-img-${id}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                  const base64Data = localStorage.getItem('${cacheKey}');
                  if (base64Data) {
                    const ele = document.getElementById('canvas-img-${id}')
                    if (ele) {
                      ele.src = base64Data;
                    }
                  }
                `,
              }}
          />
        </>)
      }
    </>
  );
}
