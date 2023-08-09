import { useEffect, useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import type {
  HTMLAttributes,
  ReactElement,
} from 'react';
import * as React from 'react';
import { isNode } from 'universal-env';
import { Storage } from './storage';

declare global {
  interface ImportMeta {
    // The build target for ice.js
    // Usually `web` or `node` or `weex`
    target: string;
    // The renderer for ice.js
    renderer: 'client' | 'server';
    // ice.js defined env variables
    env: Record<string, string>;
  }

  interface Window {
    WindVane: {
      call: Function;
    };
    _windvane_backControl: Function | null;
    __megability_bridge__: {
      syncCall: Function;
    };
  }
}

export type RefCacheCanvas = {
  // Call the API to store the canvas in storage.
  cacheCanvasToStorage: () => void;
};

export type CacheCanvasProps = {
  id: string;
  bizID: string;
  init: () => Promise<any>;
  useCache?: Boolean;
  getSnapshot?: () => String;
  fallback?: ReactElement;
  style?: HTMLAttributes;
  className?: HTMLAttributes;
};

export const CacheCanvas = forwardRef((props: CacheCanvasProps, ref) => {
  const {
    id,
    init,
    useCache = true,
    getSnapshot,
    fallback,
    style,
    className,
    bizID = '',
    ...rest
  } = props;

  const [renderedCanvas, setRenderedCanvas] = useState(!useCache);
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
      Storage.setItem(cacheKey, strBase64, {
        bizID,
      });
    }
  }, [id, renderedCanvas, cacheKey, getSnapshot, bizID]);

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
      <canvas
        {...rest}
        className={className}
        style={renderedCanvas ? style : { ...style, display: 'none' }}
        id={id}
      />
      {
        !renderedCanvas && (<>
          <img
            className={className}
            style={style}
            src={Storage.getItem(cacheKey, { bizID }) || ''}
            id={`canvas-img-${id}`}
          />
          {
            (typeof fallback === 'function') && (<div
              id={`fallback-${id}`}
              style={isNode || Storage.getItem(cacheKey, { bizID }) ? { display: 'none' } : { display: 'block' }}
            >
              {
                fallback()
              }
            </div>)
          }
          <script
            dangerouslySetInnerHTML={{
                  __html: `
                  let base64Data = '';
                  if (
                    window.__megability_bridge__ &&
                    window.__megability_bridge__.syncCall
                  ) {
                    const canIUse = window.__megability_bridge__.syncCall('ability', 'available', {
                      ability: 'userKVStorage',
                      api: 'getItem',
                    });
            
                    if (canIUse) {
                      const res = window.__megability_bridge__.syncCall('userKVStorage', 'getItem', { key: '${cacheKey}',  bizID: '${bizID}' });
                      if (res && res.statusCode === 0 && res.data && res.data.result) {
                        base64Data = res.data.result;
                      }
                    }
                  }
                  
                  if (!base64Data) {
                    base64Data = localStorage.getItem(${JSON.stringify(cacheKey)});
                  }
                  
                  const fallback = document.getElementById('fallback-${id}');
                  if (base64Data) {
                    const img = document.getElementById('canvas-img-${id}');
                    img && (img.src = base64Data);
                    fallback && (fallback.style.display = 'none');
                  } else {
                    fallback && (fallback.style.display = 'block');
                  }
                `,
              }}
          />
        </>)
      }
    </>
  );
});
