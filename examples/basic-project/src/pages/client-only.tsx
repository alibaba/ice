import { lazy, Suspense } from 'react';
import { ClientOnly, useMounted } from 'ice';

export default function ClientOnlyComponent() {
  const mounted = useMounted();

  return (
    <>
      <div id="mounted">{mounted ? 'Client' : 'Server'}</div>
      <ClientOnly>
        {() => {
          const PageUrl = lazy(() => import('@/components/PageUrl'));
          return (
            <Suspense>
              <PageUrl />
            </Suspense>
          );
        }}
      </ClientOnly>
    </>
  );
}
