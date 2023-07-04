import { useEffect, useState } from 'react';
import * as React from 'react';
import { useMounted } from '@ice/runtime';

export function CacheCanvas(props) {
  const {
    id,
    init,
    useCache,
    ...rest
  } = props;
  const [renderCanvas, setRenderCanvas] = useState(useCache);
  const cacheKey = `cache-canvas-${id}`;

  const mounted = useMounted();

  useEffect(() => {
    const cacheCanvasFunc = () => {
      // Cache base64 string of canvas.
      const canvas: HTMLCanvasElement | null = document.getElementById(id) as HTMLCanvasElement;
      const strBase64 = canvas.toDataURL();
      localStorage.setItem(cacheKey, strBase64);
    };
    window.addEventListener('beforeunload', cacheCanvasFunc);

    return () => {
      window.removeEventListener('beforeunload', cacheCanvasFunc);
    };
  }, []);

  useEffect(() => {
    if (mounted && typeof init === 'function') {
      const res = init();
      if (res instanceof Promise) {
        res.then(() => {
          setRenderCanvas(true);
        });
      }
    }
  }, [mounted, init, id]);

  return (
    <>
      {
        renderCanvas
          ? <canvas id={id} {...rest} />
        : <>
          {/* <canvas id={id} {...rest} /> */}
          <img src={localStorage.getItem('${cacheKey}') || ''} id={`canvas-img-${id}`} />
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
        </>
      }
    </>
  );
}
