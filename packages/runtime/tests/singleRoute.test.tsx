import React from 'react';
import { expect, it, describe } from 'vitest';

import {
  useRoutes,
  Router,
  createHistory,
  matchRoutes,
  Link,
  Outlet,
  useParams,
  useSearchParams,
  useLocation,
  useNavigate,
} from '../src/single-router';

describe('single route api', () => {
  it('useRoutes', () => {
    expect(useRoutes([{ element: <div>test</div> }])).toStrictEqual(
      <React.Fragment>
        <div>
          test
        </div>
      </React.Fragment>);
  });

  it('Router', () => {
    expect(Router({ children: <div>test</div> })).toStrictEqual(
      <React.Fragment>
        <div>
          test
        </div>
      </React.Fragment>);
  });

  it('createHistory', () => {
    expect(createHistory().location).toBe('');
  });

  it('matchRoutes', () => {
    expect(matchRoutes([{}])[0].pathname).toBe('');
  });

  it('Link', () => {
    expect(Link()).toBe(null);
  });

  it('Outlet', () => {
    expect(Outlet()).toStrictEqual(<React.Fragment />);
  });

  it('useParams', () => {
    expect(useParams()).toStrictEqual({});
  });

  it('useSearchParams', () => {
    expect(useSearchParams()[0]).toStrictEqual({});
  });

  it('useLocation', () => {
    expect(useLocation()).toStrictEqual({});
  });

  it('useNavigate', () => {
    expect(useNavigate()).toStrictEqual({});
  });
});