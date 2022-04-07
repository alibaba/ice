import { expect, test, describe } from 'vitest';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateRouteManifest } from '../src/index';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(__dirname, 'fixtures');

describe('generateRouteManifest function', () => {
  test('basic-routes', () => {
    const routeManifest = generateRouteManifest(path.join(fixturesDir, 'basic-routes'));
    expect(routeManifest).toMatchSnapshot();
  });

  test('dynamic-routes', () => {
    const routeManifest = generateRouteManifest(path.join(fixturesDir, 'dynamic-routes'));
    expect(routeManifest).toMatchSnapshot();
  });

  test('layout-routes', () => {
    const routeManifest = generateRouteManifest(path.join(fixturesDir, 'layout-routes'));
    expect(routeManifest).toMatchSnapshot();
  });

  test('doc-delimeters-routes', () => {
    const routeManifest = generateRouteManifest(path.join(fixturesDir, 'dot-delimeters-routes'));
    expect(routeManifest).toMatchSnapshot();
  });

  test('splat-routes', () => {
    const routeManifest = generateRouteManifest(path.join(fixturesDir, 'splat-routes'));
    expect(routeManifest).toMatchSnapshot();
  });

  test('invalid-routes', () => {
    expect(() => generateRouteManifest(path.join(fixturesDir, 'invalid-routes'))).toThrow(`invalid character in 'pages/[a.pdf]'. Only support char: -, \\w, /`);
  });
});
