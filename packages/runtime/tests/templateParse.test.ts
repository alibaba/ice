/**
 * @vitest-environment jsdom
 */

import { expect, it, describe, beforeEach, afterEach, vi } from 'vitest';
import { parseTemplate } from '@ice/runtime-kit';

describe('parseTemplate', () => {
  let locationSpy;
  let documentSpy;
  let localStorageSpy;


  beforeEach(() => {
    locationSpy = vi.spyOn(global, 'location', 'get');
    documentSpy = vi.spyOn(global, 'document', 'get');
    localStorageSpy = vi.spyOn(global, 'localStorage', 'get');

    locationSpy.mockImplementation(() => {
      return {
        search: '?queryKey=queryValue',
        href: 'https://localhost:3000',
      };
    });

    documentSpy.mockImplementation(() => {
      return {
        cookie: 'cookieKey=cookieValue;',
      };
    });

    localStorageSpy.mockImplementation(() => {
      return {
        getItem: () => 'storageValue',
      };
    });
  });
  afterEach(() => {
    locationSpy.mockRestore();
    documentSpy.mockRestore();
  });


  it('should work with queryParams', () => {
    expect(parseTemplate({
      key: 'prefetchKey',
      prefetch_type: 'xxx',
      api: 'xxx.xxx',
      v: '1.0.0',
      data: {
        templateData: '${queryParams.queryKey}',
      },
      ext_headers: {},
    })).toStrictEqual({
      key: 'prefetchKey',
      prefetch_type: 'xxx',
      api: 'xxx.xxx',
      v: '1.0.0',
      data: {
        templateData: 'queryValue',
      },
      ext_headers: {},
    });
  });

  it('should work with cookie', () => {
    expect(parseTemplate({
      key: 'prefetchKey',
      prefetch_type: 'xxx',
      api: 'xxx.xxx',
      v: '1.0.0',
      data: {
        templateData: '${cookie.cookieKey}',
      },
      ext_headers: {},
    })).toStrictEqual({
      key: 'prefetchKey',
      prefetch_type: 'xxx',
      api: 'xxx.xxx',
      v: '1.0.0',
      data: {
        templateData: 'cookieValue',
      },
      ext_headers: {},
    });
  });

  it('should work with href', () => {
    expect(parseTemplate({
      key: 'prefetchKey',
      prefetch_type: 'xxx',
      api: 'xxx.xxx',
      v: '1.0.0',
      data: {
        templateData: '${url}',
      },
      ext_headers: {},
    })).toStrictEqual({
      key: 'prefetchKey',
      prefetch_type: 'xxx',
      api: 'xxx.xxx',
      v: '1.0.0',
      data: {
        templateData: 'https://localhost:3000',
      },
      ext_headers: {},
    });
  });

  it('should work with storage', () => {
    expect(parseTemplate({
      key: 'prefetchKey',
      prefetch_type: 'xxx',
      api: 'xxx.xxx',
      v: '1.0.0',
      data: {
        templateData: '${storage.storageKey}',
      },
      ext_headers: {},
    })).toStrictEqual({
      key: 'prefetchKey',
      prefetch_type: 'xxx',
      api: 'xxx.xxx',
      v: '1.0.0',
      data: {
        templateData: 'storageValue',
      },
      ext_headers: {},
    });
  });
});
