import { dynamic } from '@ice/runtime';

const NonSSR = dynamic(() => import('@/components/nonssr'), {
  ssr: false,
  fallback: () => <div>fallback</div>,
});

export default () => {
  return <NonSSR text={'hello world'} />;
};
