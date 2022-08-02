import * as path from 'path';
import { fileURLToPath } from 'url';
import { expect, it, describe } from 'vitest';
import { transformManifestKeys, parseManifest, getAppWorkerUrl, rewriteAppWorker, getMultipleManifest } from '../src/manifestHelpers';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('get app work url', () => {
  it('app worker config as remote url', () => {
    const manifest = {
      appWorker: {
        url: 'http://remote/app-worker.js',
      },
    };
    const appWorkerPath = getAppWorkerUrl(manifest, __dirname);
    expect(appWorkerPath).toBeUndefined();
  });

  it('app worker config which do not exist', () => {
    const manifest = {
      appWorker: {
        url: 'app-worker.js',
      },
    };
    const appWorkerPath = getAppWorkerUrl(manifest, __dirname);
    expect(appWorkerPath).toBeUndefined();
  });

  it('app worker config which exists', () => {
    const manifest = {
      appWorker: {
        url: 'pha-work.js',
      },
    };
    const appWorkerPath = getAppWorkerUrl(manifest, __dirname);
    expect(appWorkerPath).toBe(path.join(__dirname, 'pha-work.js'));
  });

  it('found default app worker', () => {
    const manifest = {};
    const appWorkerPath = getAppWorkerUrl(manifest, __dirname);
    expect(appWorkerPath).toBe(path.join(__dirname, 'app-worker.ts'));
  });
});

describe('rewrite app worker url', () => {
  it('over write appWorker.url', () => {
    expect(rewriteAppWorker({
      appWorker: {
        url: 'pha-worker.js',
        source: 'test',
      }
    })).toMatchObject({
      appWorker: {
        url: 'app-worker.js',
        source: 'test',
      }
    });
  });

  it('config appWorker', () => {
    expect(rewriteAppWorker({})).toMatchObject({
      appWorker: {
        url: 'app-worker.js',
      }
    });
  });
});


describe('transform config keys', () => {
  it('should transform decamelize keys fields', () => {
    const manifestJSON = transformManifestKeys(
      {
        offlineResources: ['//g.alicdn.com/.*'],
        name: 'name',
        pages: [
          {
            pageHeader: {
              includedSafeArea: true,
            }
          }
        ]
      },
      { isRoot: true }
    );
    expect(manifestJSON.name).toStrictEqual('name');
    expect(manifestJSON.offline_resources).toStrictEqual(['//g.alicdn.com/.*']);
    expect(manifestJSON?.pages![0].tab_header).toStrictEqual({ included_safe_area: true });
  });

  it('should transform dataPrefetch to data_prefetch', () => {
    const manifestJSON = transformManifestKeys(
      {
        dataPrefetch: [
          {
            api: '/a.com',
            data: {
              id: 123,
              taskId: 233,
              cId: {
                dId: true,
              },
            },
            header: {
              taskId: 455,
            },
            extHeaders: {
              id: 123,
              test_id: 234,
            },
            dataType: 'json',
            appKey: '12345',
            LoginRequest: true,
          },
        ],
      },
      { isRoot: true }
    );
    expect(manifestJSON?.data_prefetch?.length).toBe(1);
    expect(manifestJSON?.data_prefetch![0].data).toMatchObject({
      id: 123,
      taskId: 233,
      cId: {
        dId: true,
      },
    });
    expect(manifestJSON?.data_prefetch![0].header).toMatchObject({
      taskId: 455,
    });
    expect(manifestJSON?.data_prefetch![0].ext_headers).toMatchObject({ id: 123, test_id: 234 });
    expect(manifestJSON?.data_prefetch![0].dataType).toBe('json');
    expect(manifestJSON?.data_prefetch![0].appKey).toBe('12345');
    expect(manifestJSON?.data_prefetch![0].LoginRequest).toBe(true);
    expect(manifestJSON?.data_prefetch![0].prefetch_key).toBe('mtop');
  });

  it('should transform tabBar to tab_bar', () => {
    const manifestJSON = transformManifestKeys(
      {
        tabBar: {
          textColor: '',
          selectedColor: '',
          backgroundColor: '',
          items: [
            {
              path: 'tab1',
              name: '主会场',
              icon: '',
              activeIcon: '',
            },
            {
              // transform text to name
              text: 'text-name',
              icon: '',
              activeIcon: '',
            }
          ],
        },
      },
      { isRoot: true }
    );

    expect(manifestJSON.tab_bar).toBeTruthy();
    expect(manifestJSON?.tab_bar?.items![0]).toMatchObject({ path: 'tab1', name: '主会场', icon: '', active_icon: '' });
  });

  it('should transform pages keys', () => {
    const manifestJSON = transformManifestKeys(
      {
        pages: [
          {
            path: '/',
            name: 'home',
            source: 'pages/Home/index',
            dataPrefetch: [
              {
                url: '/a.com',
                data: {
                  id: 123,
                },
              },
            ],
          },
          {
            path: '/home1',
            name: 'home1',
            source: 'pages/Home1/index',
          },
        ],
      },
      { isRoot: true }
    );
    expect(manifestJSON?.pages?.length).toBe(2);
    expect(manifestJSON?.pages![0].data_prefetch).toMatchObject([
      {
        url: '/a.com',
        data: {
          id: 123,
        },
        header: {},
        prefetch_key: 'mtop',
      },
    ]);
  });

  it('should not filter whitelist fields', () => {
    const manifestJSON = transformManifestKeys(
      {
        a: 123,
      },
      { isRoot: false }
    );

    expect(manifestJSON).toMatchObject({ a: 123 });
  });

  it('should filter unknown fields in root', () => {
    const manifestJSON = transformManifestKeys(
      {
        a: 123,
      },
      { isRoot: true }
    );

    expect(manifestJSON).toMatchObject({});
  });

  it('should not transform requestHeaders', () => {
    const manifestJSON = transformManifestKeys(
      {
        requestHeaders: {
          'U-Tag': '${storage.uTag}',
        },
      },
      { isRoot: false }
    );
    expect(manifestJSON).toMatchObject({ request_headers: { 'U-Tag': '${storage.uTag}' } });
  });
});

describe('parse manifest', () => {
  const options = {
    publicPath: 'https://cdn-path.com/',
    urlPrefix: 'https://url-prefix.com/',
    configEntry: path.join(__dirname, './mockConfig.mjs'),
    serverEntry: path.join(__dirname, './mockServer.mjs'),
  };

  it('should add urlPrefix to manifest', async () => {
    const phaManifest = {
      appWorker: {
        url: 'pha-worker.js',
      },
      routes: [
        'home',
        'about',
        'app/nest',
      ],
    };
    const manifest = await parseManifest(phaManifest, options);
    expect(manifest?.pages![0].path).toBe('https://url-prefix.com/home');
    expect(manifest?.pages![0].key).toBe('home');
    expect(manifest?.pages![0].title).toBe('title-home');
    expect(manifest?.pages![0].priority).toBe('low');
    expect(manifest?.pages![1].path).toBe('https://url-prefix.com/about?c=123');
    expect(manifest?.pages![2]?.frames![1].path).toBe('https://m.taobao.com');
    expect(manifest?.app_worker?.url).toBe('https://cdn-path.com/pha-worker.js');
  });

  it('should set document to manifest', async () => {
    const phaManifest = {
      routes: [
        'home',
        'about',
        'app/nest',
      ],
    };
    const manifest = await parseManifest(phaManifest, {
      ...options,
      template: true,
    });

    expect(manifest?.pages![0].document).toBe('<html><body>/home-document</body></html>');
    expect(manifest?.pages![1].document).toBe('<html><body>/about-document</body></html>');
    expect(manifest?.pages![2]?.frames![0].document).toBe('<html><body>/home-document</body></html>');
  });


  it('should not support template', async () => {
    const phaManifest = {
      routes: [
        'home',
        'about',
        'app/nest',
        '404'
      ],
    };
    const manifest = await parseManifest(phaManifest, {
      ...options,
      template: false,
    });

    expect(manifest.pages![0].script).toBeUndefined();
    expect(manifest.pages![0].stylesheet).toBeUndefined();
    expect(manifest.pages![0].document).toBeUndefined();
  });


  it('should config url to path when user config page.url', async () => {
    const phaManifest = {
      routes: [
        {
          path: '/',
          name: 'home',
          url: 'https://m.taobao.com',
        },
        {
          pageHeader: {
            url: 'https://m.taobao.com',
            source: 'pages/Header',
          },
          frames: [
            {
              path: '/frame1',
              name: 'frame1',
              url: 'https://m.taobao.com',
            },
          ],
        },
        'about',
      ],
      tabBar: {
        custom: true,
        items: ['home', 'frame1'],
        url: 'https://m.taobao.com',
      },
    };
    // @ts-ignore ignore type error with mix config key
    const manifest = await parseManifest(phaManifest, options);
    expect(manifest.pages![0].path).toBe('https://m.taobao.com');
    // @ts-ignore
    expect(manifest.pages![0].url).toBeUndefined();
    expect(manifest.pages![0].script).toBeUndefined();
    expect(manifest.pages![0].stylesheet).toBeUndefined();

    expect(manifest.pages![1]?.tab_header?.url).toBe('https://m.taobao.com');
    // @ts-ignore
    expect(manifest.pages![1]?.tab_header?.source).toBeUndefined();

    expect(manifest.pages![1]?.frames![0].path).toBe('https://m.taobao.com');
    // @ts-ignore
    expect(manifest.pages![1]?.frames![0].url).toBeUndefined();
    expect(manifest.pages![1]?.frames![0].script).toBeUndefined();
    expect(manifest.pages![1]?.frames![0].stylesheet).toBeUndefined();

    expect(manifest?.tab_bar?.url).toBe('https://m.taobao.com');
    // @ts-ignore
    expect(manifest?.tab_bar?.source).toBeUndefined();
    expect(manifest?.tab_bar?.items).toHaveLength(2);

    expect(manifest.pages![2].path).toBe('https://url-prefix.com/about?c=123');
  });

  it('should not cover url by pageUrl', async () => {
    const phaManifest = {
      routes: [
        {
          pageHeader: {
            source: 'pages/header',
          },
          frames: [
            {
              name: 'frame1',
              url: 'https://m.taobao.com',
            },
          ],
        },
      ],
      tabBar: {
        custom: true,
        source: 'pages/CustomTabBar',
        items: ['home', 'frame1'],
      },
    };

    const manifest = await parseManifest(phaManifest, options);

    expect(manifest.pages![0]?.tab_header?.url).toBe('https://url-prefix.com/header');
    expect(manifest.pages![0]?.tab_header?.html).toBe('<html><body>/header-document</body></html>');
    expect(manifest?.tab_bar?.url).toBe('https://url-prefix.com/CustomTabBar');
  });

  it('error source without pages', async () => {
    const phaManifest = {
      tabBar: {
        source: 'components/CustomTabBar',
      },
    };
    try {
      await parseManifest(phaManifest, options);
      expect(true).toBe(false);
    } catch (err) {
      expect(true).toBe(true);
    }
  })

  it('url failed with new URL', async () => {
    const phaManifest = {
      tabBar: {
        source: 'pages/tabBar',
      },
    };
    const manifest = await parseManifest(phaManifest, {
      ...options,
      urlPrefix: '{{xxx}}/',
    });
    expect(manifest.tab_bar?.url).toBe('{{xxx}}/tabBar');
    expect(manifest.tab_bar?.name).toBe('{{xxx}}');
  })

  it('should not inject html when tabHeader & tabBar have url field', async () => {
    const phaManifest = {
      routes: [
        {
          pageHeader: {
            source: 'pages/Header',
            url: 'https://m.taobao.com',
          }
        }
      ],
      tabBar: {
        custom: true,
        source: 'pages/CustomTabBar',
        items: ['home', 'frame1'],
      }
    };

    const manifest = await parseManifest(phaManifest, {
      ...options,
      template: true,
    });
    expect(manifest.pages![0].tab_header?.url).toBe('https://m.taobao.com');
    expect(manifest.pages![0].tab_header?.html).toBeUndefined();

    expect(manifest.tab_bar?.url).toBe('https://url-prefix.com/CustomTabBar');
  });
});

describe('get multiple manifest', () => {
  const options = {
    publicPath: 'https://cdn-path.com/',
    urlPrefix: 'https://url-prefix.com/',
    configEntry: path.join(__dirname, './mockConfig.mjs'),
    serverEntry: path.join(__dirname, './mockServer.mjs'),
  };

  it('simple routes', async () => {
    const phaManifest = {
      routes: [
        'home',
        'about',
      ],
    };
    const manifest = await parseManifest(phaManifest, options);
    const multipleManifest = getMultipleManifest(manifest);
    expect(multipleManifest?.home?.pages?.length).toBe(1);
    expect(multipleManifest?.home?.data_prefetch).toMatchObject({ api: 'test/api' });
    expect(multipleManifest?.about?.pages?.length).toBe(1);
  });

  it('routes with frame', async () => {
    const phaManifest = {
      routes: [
        {
          frames: [
            'app/nest',
            {
              url: 'https://m.taobao.com',
            }
          ]
        },
        'about',
      ],
    };
    const manifest = await parseManifest(phaManifest, options);
    const multipleManifest = getMultipleManifest(manifest);
    expect(multipleManifest?.['app/nest']?.pages?.length).toBe(1);
    expect(multipleManifest?.['app/nest']?.pages![0].frames?.length).toBe(2);
    expect(multipleManifest?.about?.pages?.length).toBe(1);
  });
});
