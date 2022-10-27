import React, { useState, useEffect } from 'react';
import { useOutlet, useLocation } from 'react-router-dom';

// @ts-ignore
const Offscreen = React.unstable_Offscreen;

// ref: https://leomyili.github.io/react-stillness-component/docs/examples/react-router/v6
export default function KeepAliveOutlet() {
  if (!Offscreen) {
    throw new Error('`<KeepAliveOutlet />` now requires react experimental version. Please install it first.');
  }
  const [outlets, setOutlets] = useState([]);
  const location = useLocation();
  const outlet = useOutlet();

  useEffect(() => {
    const result = outlets.some(o => o.pathname === location.pathname);
    if (!result) {
      setOutlets([
        ...outlets,
        {
          key: location.key,
          pathname: location.pathname,
          outlet,
        },
      ]);
    }
  }, [location.pathname, location.key, outlet, outlets]);

  return (
    <>
      {
        outlets.map((o) => {
          return (
            <Offscreen key={o.key} mode={location.pathname === o.pathname ? 'visible' : 'hidden'}>
              {o.outlet}
            </Offscreen>
          );
        })
      }
    </>
  );
}
