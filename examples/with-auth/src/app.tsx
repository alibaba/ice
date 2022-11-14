import { defineAppConfig, defineDataLoader, Link } from 'ice';
import { defineAuthConfig } from '@ice/plugin-auth/esm/types';

export default defineAppConfig(() => ({}));

export const authConfig = defineAuthConfig((data) => {
  // fetch auth data
  return {
    initialAuth: {
      admin: data?.auth?.admin,
    },
    NoAuthFallback: () => {
      return (
        <>
          <div id="no-auth">无权限访问</div>
          <Link to="/">Home</Link>
        </>
      );
    },
  };
});

export const dataLoader = defineDataLoader(() => {
  return new Promise((resolve) => {
    resolve({
      auth: {
        admin: true,
      },
    });
  });
});
