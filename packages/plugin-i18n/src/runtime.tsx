import type { RuntimePlugin } from '@ice/runtime/types';

const runtime: RuntimePlugin = async ({ appContext }) => {
  console.log(appContext);
};

export default runtime;
