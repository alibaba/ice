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
  const [renderedCanvas, setRenderedCanvas] = useState(useCache);
  const cacheKey = `cache-canvas-${id}`;

  const mounted = useMounted();

  const cacheCanvasFunc = () => {
    // Cache base64 string of canvas.
    const canvas: HTMLCanvasElement | null = document.getElementById(id) as HTMLCanvasElement;
    console.log('canvas=', canvas);
    const strBase64 = canvas.toDataURL();
    console.log('strBase64=', strBase64);
    localStorage.setItem(cacheKey, strBase64);
  };

  useEffect(() => {
    window.addEventListener('beforeunload', cacheCanvasFunc);

    return () => {
      window.removeEventListener('beforeunload', cacheCanvasFunc);
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
