import path from 'path';
import { fileURLToPath } from 'url';
import { expect, test, describe } from 'vitest';
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
    expect(() => generateRouteManifest(path.join(fixturesDir, 'invalid-routes'))).toThrow('invalid character in \'src/pages/#a.tsx\'. Only support char: -, \\w, /');
  });

  test('ignore-routes', () => {
    const routeManifest = generateRouteManifest(path.join(fixturesDir, 'basic-routes'), ['About/index.tsx']);
    expect(routeManifest).toMatchSnapshot();
  });

  test('define-extra-routes', () => {
    const routeManifest = generateRouteManifest(
      path.join(fixturesDir, 'basic-routes'),
      ['About/index.tsx'],
      [(defineRoute) => {
        defineRoute('/about-me', 'About/index.tsx');
      }],
    );
    expect(routeManifest).toMatchSnapshot();
  });

  test('define-absolute-route', () => {
    const rootDir = path.join(fixturesDir, 'define-absolute-route');
    const routeManifest = generateRouteManifest(
      rootDir,
      ['About/index.tsx'],
      [(defineRoute) => {
        defineRoute('/about-me', path.join(rootDir, 'src/index.tsx'));
      }],
    );
    expect(path.isAbsolute(routeManifest['/about-me'].file)).toBeTruthy();
    expect(routeManifest['/about-me'].componentName).toBe('src-index');
  });

  test('escape-routes', () => {
    const routeManifest = generateRouteManifest(
      path.join(fixturesDir, 'escape-routes'),
    );
    expect(routeManifest).toMatchSnapshot();
  });

  test('nested-routes', () => {
    const routeManifest = generateRouteManifest(
      path.join(fixturesDir, 'nested-routes'),
    );
    expect(routeManifest).toMatchSnapshot();
  });

  test('nexted-routes-with-same-children', () => {
    const rootDir = path.join(fixturesDir, 'nexted-with-same-children');
    const routeManifest = generateRouteManifest(
      rootDir,
      [
        '**',
      ],
      [(defineRoute) => {
        defineRoute('/prefix-a', 'layout-a.tsx', () => {
          defineRoute('base', 'layout-a-a.tsx', () => {
            defineRoute('index', 'a.tsx');
          });
        });
        defineRoute('/prefix-b', 'layout-b.tsx', () => {
          defineRoute('base', 'layout-b-b.tsx', () => {
            defineRoute('index', 'b.tsx');
          });
        });
      }],
    );
    expect(routeManifest).toMatchSnapshot();
  });
});
