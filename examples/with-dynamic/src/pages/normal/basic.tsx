import { dynamic } from '@ice/runtime';

const Normal = dynamic(() => import('../../components/normal'), {
  fallback: () => <div>normal fallback</div>,
});

export default () => {
  return <Normal />;
};
