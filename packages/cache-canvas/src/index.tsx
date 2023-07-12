import { useEffect, useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import * as React from 'react';
import { Storage } from './storage';

declare global {
  interface Window {
    WindVane: {
      call: Function;
    };
    _windvane_backControl: Function | null;
  }
}

export type RefCacheCanvas = {
  // Call the API to store the canvas in storage.
  cacheCanvasToStorage: () => void;
};

export const CacheCanvas = forwardRef((props, ref) => {
  const {
    id,
    init,
    useCache,
    getSnapshot,
    ...rest
  } = props;
  const [renderedCanvas, setRenderedCanvas] = useState(useCache);
  const [mounted, setMounted] = useState(false);

  const cacheKey = `cache-canvas-${id}`;

  const cacheCanvasFunc = useCallback(() => {
    // Cache base64 string of canvas.
    const canvas: HTMLCanvasElement | null = document.getElementById(id) as HTMLCanvasElement;
    let strBase64;
    if (typeof getSnapshot === 'function') {
      strBase64 = getSnapshot();
    } else {
      strBase64 = canvas.toDataURL();
    }
    // Cache base64 string when canvas rendered.
    if (renderedCanvas && strBase64) {
      Storage.setItem(cacheKey, strBase64);
    }
  }, [id, renderedCanvas, cacheKey, getSnapshot]);

  useImperativeHandle(ref, () => ({
    cacheCanvasToStorage: cacheCanvasFunc,
 }));

 useEffect(() => {
  setMounted(true);
}, []);

  useEffect(() => {
    if (window.WindVane) {
      window.WindVane.call('WebAppInterface', 'enableHookNativeBack', {});
      window._windvane_backControl = () => {
        cacheCanvasFunc();
        // Windvane must return a string value of true for it to work properly.
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
  }, [cacheCanvasFunc]);

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
      <canvas {...rest} style={renderedCanvas ? {} : { display: 'none' }} id={id} />
      {
        !renderedCanvas && (<>
          <img src={Storage.getItem(cacheKey) || ''} id={`canvas-img-${id}`} />
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
});
