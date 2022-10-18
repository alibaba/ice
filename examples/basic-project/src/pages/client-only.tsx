import { lazy, Suspense } from 'react';
import { ClientOnly as ClientOnlyComponent, useMounted } from 'ice';

export default function ClientOnly() {
  const mounted = useMounted();

  return (
    <>
      <div id="mounted">{mounted ? 'Client' : 'Server'}</div>
      <ClientOnlyComponent>
        {() => {
          const PageUrl = lazy(() => import('@/components/PageUrl'));
          return (
            <Suspense>
              <PageUrl />
            </Suspense>
          );
        }}
      </ClientOnlyComponent>
    </>
  );
}
