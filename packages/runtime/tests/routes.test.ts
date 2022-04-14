import { expect, test, describe } from 'vitest';
import { filterMatchesToLoad } from '../src/routes.js';

describe('routes', () => {
  test('filter new matches', () => {
    const oldMatches = [
      {
        pathname: '/',
        route: {
          id: '/page/layout'
        }
      },
      {
        pathname: '/',
        route: {
          id: '/page/home'
        }
      }
    ];

    const newMatches = [
      {
        pathname: '/',
        route: {
          id: '/page/layout'
        }
      },
      {
        pathname: '/about',
        route: {
          id: '/page/about'
        }
      }
    ];

    // @ts-ignore
    const matches = filterMatchesToLoad(oldMatches, newMatches);

    expect(
      matches
    ).toEqual([{
      pathname: '/about',
      route: {
        id: '/page/about'
      }
    }]);
  });

  test('filter matches with path changed', () => {
    const oldMatches = [
      {
        pathname: '/users/123',
        route: {
          id: '/users/123'
        }
      }
    ];

    const newMatches = [
      {
        pathname: '/users/456',
        route: {
          id: '/users/456'
        }
      }
    ];

    // @ts-ignore
    const matches = filterMatchesToLoad(oldMatches, newMatches);

    expect(
      matches
    ).toEqual([
      {
        pathname: '/users/456',
        route: {
          id: '/users/456'
        }
      }
    ]);
  });
});
