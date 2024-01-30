import React, { useState, useEffect, useRef } from 'react';
import { useOutlet, useLocation } from 'react-router-dom';
import ActivityComponent from './Activity.js';

// @ts-ignore
const Activity = React.unstable_Activity || ActivityComponent;
interface ActivityItem {
  outlet: React.ReactElement | null;
  key: string;
  pathname: string;
}

export default function KeepAliveOutlet() {
  if (!Activity) {
    throw new Error('`<KeepAliveOutlet />` now requires react experimental version. Please install it first.');
  }
  const [outlets, setOutlets] = useState<ActivityItem[]>([]);
  const location = useLocation();
  const outlet = useOutlet();
  // Save the first outlet for SSR hydration.
  const outletRef = useRef(null);
  const renderRef = useRef(null);

  useEffect(() => {
    // If outlets is empty, save the first outlet for SSR hydration,
    // and should not call setOutlets to avoid re-render.
    if (outlets.length === 0 && !outletRef.current) {
      outletRef.current = {
        key: location.key,
        pathname: location.pathname,
        outlet,
      };
    } else {
      let currentOutlets = outletRef.current ? [outletRef.current] : outlets;
      const result = currentOutlets.some(o => o.pathname === location.pathname);
      if (!result) {
        setOutlets([
          // TODO: the max length of outlets should be configurable.
          ...currentOutlets,
          {
            key: location.key,
            pathname: location.pathname,
            outlet,
          },
        ]);
        outletRef.current = null;
      }
    }
  }, [location.pathname, location.key, outlet, outlets]);

  // Render initail outlet for SSR hydration.
  const renderOutlets = outlets.length === 0 ? (renderRef.current || [{
    key: location.key,
    pathname: location.pathname,
    outlet,
  }]) : outlets;

  if (outlets.length === 0) {
    // Use ref to save the first outlet, in case of route change will unmount the first outlet.
    renderRef.current = renderOutlets;
  }

  return (
    <>
      {
        renderOutlets.map((o) => {
          return (
            <Activity key={o.key} mode={location.pathname === o.pathname ? 'visible' : 'hidden'}>
              {o.outlet}
            </Activity>
          );
        })
      }
    </>
  );
}
