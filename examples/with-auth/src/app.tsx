import { defineAppConfig, Link } from 'ice';
import type { GetAppData } from 'ice';
import { defineAuthConfig } from '@ice/plugin-auth/esm/types';

export default defineAppConfig({});

export const auth = defineAuthConfig((data) => {
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

export const getAppData: GetAppData = () => {
  return new Promise((resolve) => {
    resolve({
      auth: {
        admin: true,
      },
    });
  });
};