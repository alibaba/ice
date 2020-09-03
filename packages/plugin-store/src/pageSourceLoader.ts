import { getOptions } from 'loader-utils';
import { join } from 'path';

/**
 * Amend page source in app.json routes field
 * return {
 *  "routes": [
      {
        "path": "/",
        "source": ".rax/pages/Home/Home",
      }
    ]
  }
 */
export default function pageSourceLoader(appJSON) {
  const { targetPath } = getOptions(this);
  const content = JSON.parse(appJSON);

  content.routes = content.routes.map(route => {
    return {
      ...route,
      realSource: join(targetPath, route.source)
    };
  });
  return JSON.stringify(content);
};
