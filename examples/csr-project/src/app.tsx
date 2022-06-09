<<<<<<< HEAD
=======
import type { GetAppData, GetAppConfig } from 'ice';

>>>>>>> 3e72b27e... feat: support bundle cjs deps (#250)
console.log('__LOG__');
console.warn('__WARN__');
console.error('__ERROR__');

export const auth = () => {
  return {
    initialAuth: {
      admin: true,
    },
  };
};

export default {};