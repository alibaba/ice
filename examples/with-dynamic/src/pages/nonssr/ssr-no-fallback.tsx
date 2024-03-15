import { dynamic } from '@ice/runtime';

const NonSSR = dynamic(() => import('@/components/nonssr'));

export default () => {
  return <NonSSR text={'hello world'} />;
};
