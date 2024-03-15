import { dynamic } from '@ice/runtime';

const Normal = dynamic(import('../../components/normal'), {
  fallback: () => <div>bare import fallback</div>,
});

export default () => {
  return <Normal />;
};
