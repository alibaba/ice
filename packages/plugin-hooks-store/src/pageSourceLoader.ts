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

  content.routes = content.routes.map((route) => {
    let pageSource = route.source;
    if (/^\/?pages/.test(pageSource)) {
      if (/index$/.test(pageSource)) {
        pageSource = pageSource.replace(/index$/, 'Page');
      } else {
        pageSource = join(pageSource, 'Page');
      }
      return {
        ...route,
        pageSource: join(targetPath, pageSource),
      };
    }
    return route;
  });
  return JSON.stringify(content);
}
