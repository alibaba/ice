import browserslist from 'browserslist';

export function getSupportedBrowsers(dir: string): string[] | undefined {
  let browsers: any;
  try {
    const browsersListConfig = browserslist.loadConfig({
      path: dir,
    });
    // Running `browserslist` resolves `extends` and other config features into a list of browsers
    if (browsersListConfig && browsersListConfig.length > 0) {
      browsers = browserslist(browsersListConfig);
    }
  } catch {}

  // When user has browserslist use that target
  if (browsers && browsers.length > 0) {
    return browsers;
  }

  return [];
}

const BROWSER_SUPPORTED_BY_ESBUILD = [
  'chrome',
  'deno',
  'edge',
  'firefox',
  'hermes',
  'ie',
  'ios',
  'node',
  'opera',
  'rhino',
  'safari',
];

export function filterBrowserForEsBuild(browserList) {
  const result = browserList.filter(item => {
    if (item.indexOf('es') === 0) {
      return true;
    }

    return BROWSER_SUPPORTED_BY_ESBUILD.includes(item.split(' ')[0]);
  });

  return result.map(item => item.replace(' ', ''));
}
