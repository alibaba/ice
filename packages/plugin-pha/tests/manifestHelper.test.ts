import { expect, it, describe } from 'vitest';
import { transformManifestKeys } from '../src/manifestHelpers';

describe('transformAppConfig', () => {
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
/* 
describe('parseManifest', () => {
  const manifest = {
    app_worker: {
      url: 'pha-worker.js',
    },
    pages: [
      {
        path: '/',
        name: 'home3',
        source: 'pages/Home/index',
        data_prefetch: [
          {
            url: '/a.com',
            data: {
              id: 123,
            },
          },
        ],
      },
      {
        tab_header: {
          source: 'pages/Header/index',
          query_params: 'b=true',
        },
        path: '/home1',
        source: 'pages/Home1/index',
        query_params: 'c=123',
      },
      {
        frames: [
          {
            path: '/frame1',
            source: 'pages/frame1/index',
          },
        ],
      },
    ],
    tab_bar: {
      source: 'pages/TabBar/index',
      query_params: 'a=2',
    },
  };
  const options = {
    urlPrefix: 'https://abc.com/',
    cdnPrefix: 'https://cdn.com/',
    isTemplate: true,
    inlineStyle: false,
    api: {
      applyMethod: () => {
        return {};
      },
    },
    assetNames: [
      'home3.js',
      'home3.css',
      'about.js',
      'about.css'
    ]
  };

  it('should transfto manifest', () => {
    const manifest = setRealUrlToManifest(options, cloneDeep(config));

    expect(manifest.pages[0].path).toBe('https://abc.com/home3');
    expect(manifest.pages[0].key).toBe('home3');
    expect(manifest.pages[0].script).toBe('https://cdn.com/home3.js');
    expect(manifest.pages[0].stylesheet).toBe('https://cdn.com/home3.css');
    expect(manifest.pages[1].path).toBe('https://abc.com/home1?c=123');
    expect(manifest.pages[2].frames[0].path).toBe('https://abc.com/frame1');
    expect(manifest.pages[1].tab_header.url).toBe('https://abc.com/header?b=true');
    expect(manifest.tab_bar.url).toBe('https://abc.com/tabbar?a=2');
    expect(manifest.app_worker.url).toBe('https://cdn.com/pha-worker.js');
  });

  it('should set document to manifest', () => {
    const manifest = setRealUrlToManifest(
      {
        ...options,
        api: {
          applyMethod: () => {
            return {
              custom: true,
              document: '<html>123</html>',
            };
          },
        },
      },
      cloneDeep(config),
    );

    expect(manifest.pages[0].document).toBe('<html>123</html>');
    expect(manifest.pages[1].document).toBe('<html>123</html>');
    expect(manifest.pages[2].frames[0].document).toBe('<html>123</html>');
  });

  it('should not support template', () => {
    const manifest = setRealUrlToManifest(
      {
        ...options,
        isTemplate: false,
      },
      cloneDeep(config),
    );

    expect(manifest.pages[0].script).toBeUndefined();
    expect(manifest.pages[0].stylesheet).toBeUndefined();
    expect(manifest.pages[0].document).toBeUndefined();
  });

  it('should config url to path when user config page.url', () => {
    const manifest = setRealUrlToManifest(options, {
      ...cloneDeep(config),
      pages: [
        {
          path: '/',
          name: 'home',
          source: 'pages/Home/index',
          url: 'https://m.taobao.com',
        },
        {
          tab_header: {
            url: 'https://m.taobao.com',
          },
          frames: [
            {
              path: '/frame1',
              name: 'frame1',
              source: 'pages/frame1/index',
              url: 'https://m.taobao.com',
            },
          ],
        },
        {
          path: '/about',
          name: 'about',
          source: 'pages/About/index',
        },
      ],
      tab_bar: {
        custom: true,
        list: ['home', 'frame1'],
        url: 'https://m.taobao.com',
      },
    });

    expect(manifest.pages[0].path).toBe('https://m.taobao.com');
    expect(manifest.pages[0].url).toBeUndefined();
    expect(manifest.pages[0].script).toBeUndefined();
    expect(manifest.pages[0].stylesheet).toBeUndefined();

    expect(manifest.pages[1].tab_header.url).toBe('https://m.taobao.com');
    expect(manifest.pages[1].tab_header.source).toBeUndefined();

    expect(manifest.pages[1].frames[0].path).toBe('https://m.taobao.com');
    expect(manifest.pages[1].frames[0].url).toBeUndefined();
    expect(manifest.pages[1].frames[0].script).toBeUndefined();
    expect(manifest.pages[1].frames[0].stylesheet).toBeUndefined();

    expect(manifest.tab_bar.url).toBe('https://m.taobao.com');
    expect(manifest.tab_bar.source).toBeUndefined();
    expect(manifest.tab_bar.items).toHaveLength(2);

    expect(manifest.pages[2].path).toBe('https://abc.com/about');
    expect(manifest.pages[2].script).toBe('https://cdn.com/about.js');
    expect(manifest.pages[2].stylesheet).toBe('https://cdn.com/about.css');
  });

  it('should not cover url by pageUrl', () => {
    const manifest = setRealUrlToManifest(options, {
      ...cloneDeep(config),
      pages: [
        {
          tab_header: {
            source: 'pages/Header/index',
          },
          frames: [
            {
              path: '/frame1',
              name: 'frame1',
              source: 'pages/frame1/index',
              url: 'https://m.taobao.com',
            },
          ],
        },
      ],
      tab_bar: {
        custom: true,
        source: 'components/CustomTabBar/index',
        list: ['home', 'frame1'],
      },
    });

    expect(manifest.pages[0].tab_header.url).toBe('https://abc.com/header');
    expect(manifest.tab_bar.url).toBe('https://abc.com/customtabbar');
  });

  it('should not inject html when tabHeader & tabBar have url field', () => {
    const manifest = setRealUrlToManifest(
      {
        ...options,
        api: {
          applyMethod: () => {
            return {
              document: '<html>123</html>',
              custom: true,
            };
          },
        },
      },
      {
        ...cloneDeep(config),
        pages: [
          {
            tab_header: {
              source: 'pages/Header/index',
              url: 'https://m.taobao.com',
            },
            frames: [
              {
                path: '/frame1',
                name: 'frame1',
                source: 'pages/frame1/index',
                url: 'https://m.taobao.com',
              },
            ],
          },
        ],
        tab_bar: {
          custom: true,
          source: 'components/CustomTabBar/index',
          list: ['home', 'frame1'],
        },
      },
    );

    expect(manifest.pages[0].tab_header.url).toBe('https://m.taobao.com');
    expect(manifest.pages[0].tab_header.html).toBeUndefined();

    expect(manifest.tab_bar.url).toBe('https://abc.com/customtabbar');
  });

  it('should not add script and stylesheet to page', () => {
    const manifest = setRealUrlToManifest(
      {
        ...options,
      },
      {
        ...cloneDeep(config),
        pages: [
          {
            page: '/mine',
            name: 'mine',
            source: 'page/Mine/index',
          },
        ]
      }
    );

    expect(manifest.pages[0].script).toBeUndefined();
    expect(manifest.pages[0].stylesheet).toBeUndefined();
  })
});
 */
