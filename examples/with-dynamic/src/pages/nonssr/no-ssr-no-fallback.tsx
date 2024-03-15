import { dynamic } from '@ice/runtime';

const NonSSR = dynamic(() => import('@/components/nonssr'), {
  ssr: false,
});

export default () => {
  return <NonSSR text={'hello world'} />;
};
