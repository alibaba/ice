import getEntriesByRoute from "../src/getEntriesByRoute";

describe('Get entries by route info', () => {
  it('should get entry by normal route', () => {
    const route = {
      source: 'pages/Home/index',
      pageSource: 'pages/Home/index'
    };
    const entries = getEntriesByRoute(route, '');
    expect(entries).toStrictEqual([{
      source: 'pages/Home/index',
      pageSource: 'pages/Home/index',
      entryPath: 'pages/Home/index',
      entryName: 'home',
    }])
  });

  it('should not get entry by empty route', () => {
    const route = {};
    const entries = getEntriesByRoute(route, '');
    expect(entries).toStrictEqual([]);
  });

  it('should get enties by frames and tabHeader', () => {
    const route = {
      source: "pages/Home/index",
      pageSource: 'pages/Home/index',
      frames: [
        {
          name: 'page-about',
          source: "pages/About/index",
          pageSource: 'pages/About/index',
        }
      ],
      pageHeader: {
        name: 'page-header',
        source: "pages/Header/index",
        pageSource: 'pages/Header/index',
        height: 100
      }
    };
    const entries = getEntriesByRoute(route, '');
    expect(entries).toStrictEqual([{
      source: 'pages/Home/index',
      pageSource: 'pages/Home/index',
      entryPath: 'pages/Home/index',
      entryName: 'home',
      frames: [
        {
          name: 'page-about',
          source: "pages/About/index",
          pageSource: 'pages/About/index',
        }
      ],
      pageHeader: {
        name: 'page-header',
        source: "pages/Header/index",
        pageSource: 'pages/Header/index',
        height: 100,
      }
    }, {
      source: 'pages/About/index',
      pageSource: 'pages/About/index',
      name: "page-about",
      entryPath: 'pages/About/index',
      entryName: 'page-about',
      __frameIndex: 0,
    }, {
      name: 'page-header',
      source: "pages/Header/index",
      pageSource: 'pages/Header/index',
      height: 100,
      entryPath: 'pages/Header/index',
      entryName: 'page-header',
      __pageHeader: true,
    }])
  });
});
