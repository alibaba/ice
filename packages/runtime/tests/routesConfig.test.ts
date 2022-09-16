import { expect, it, vi, describe, beforeEach, afterEach } from 'vitest';

import { updateRoutesConfig } from '../src/routesConfig';

describe('routes config', () => {
  let documentSpy;
  const insertTags: any[] = [];
  const appendTags: any[] = [];

  beforeEach(() => {
    documentSpy = vi.spyOn(global, 'document', 'get');
    documentSpy.mockImplementation(() => ({
      head: {
        querySelector: () => ({
          content: '',
        }),
        insertBefore: (tag) => {
          insertTags.push(tag);
        },
        appendChild: (tag) => {
          appendTags.push(tag);
          tag.onload();
        },
      },
      getElementById: () => null,
      querySelectorAll: () => [],
      createElement: (type) => {
        const element = {
          type,
          setAttribute: (attr, value) => {
            element[attr] = value;
          },
        };
        return element;
      },
    }));
  });
  afterEach(() => {
    documentSpy.mockRestore();
  });

  it('update routes config', async () => {
    const routesConfig = {
      home: {
        title: 'home',
        meta: [
          {
            name: 'theme-color',
            content: '#eee',
          },
        ],
        links: [{
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
          rel: 'stylesheet',
        }],
        scripts: [{
          src: 'https://cdn.jsdelivr.net/npm/lodash@2.4.1/dist/lodash.min.js',
        }],
      },
    };
    // @ts-ignore
    await updateRoutesConfig([{ route: { id: 'home' } }], routesConfig);
    expect(insertTags.length).toBe(1);
    expect(insertTags[0]?.type).toBe('meta');
    expect(appendTags.length).toBe(2);
    expect(appendTags[0]?.type).toBe('link');
    expect(appendTags[1]?.type).toBe('script');
  });
});