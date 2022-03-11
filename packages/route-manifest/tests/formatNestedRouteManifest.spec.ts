import path from 'path';
import { fileURLToPath } from 'url';
import { generateRouteManifest, formatNestedRouteManifest } from '../src/index';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(__dirname, 'fixtures');

describe('generateRouteManifest function', () => {
  test('layout-routes', () => {
    const routeManifest = generateRouteManifest(path.join(fixturesDir, 'dynamic-routes'));
    const nestedRouteManifest = formatNestedRouteManifest(routeManifest);
    expect(nestedRouteManifest).toMatchSnapshot();
  });
});
