import * as pathToRegexp from 'path-to-regexp';
import joinPath from '../joinPath';

const joinTests: [string[], string][] = [
  [[], ''],
  [['', '/'], '/'],
  [[' ', '/'], ' /'],
  [['', 'foo'], 'foo'],
  [['foo', '/bar', 'aa'], 'foo/bar/aa'],
  [['', '/foo'], '/foo'],
  [['', '', '/foo'], '/foo'],
  [['', '', 'foo'], 'foo'],
  [['foo', ''], 'foo'],
  [['foo/', ''], 'foo/'],
  [['foo', '', '/bar'], 'foo/bar'],
  [['/'], '/'],
  [[' /foo'], ' /foo'],
  [[' ', 'foo'], ' /foo'],
  [[' ', ''], ' '],
  [['/', 'foo'], '/foo'],
  [['/', '/foo'], '/foo'],
  [['/', '//foo'], '/foo'],
  [['/', '', '/foo'], '/foo'],
  [['', '/', 'foo'], '/foo'],
  [['', '/', '/foo'], '/foo'],

  [['/', '/:id'], '/:id'],
  [['/user', '/:id'], '/user/:id'],
  [['/user', '/:test(\\d+)+'], '/user/:test(\\d+)+']
];

describe('path join', () => {
  joinTests.forEach(p => {
    test(`input: ${JSON.stringify(p[0])}   expected: ${p[1]}`, () => {
      const actual = joinPath(...p[0]);
      expect(actual).toStrictEqual(p[1]);
    });
  });

  test('will throw Error', () => {
    expect(() => joinPath(null)).toThrowError();
  });
});

const regexpPathTests: [string[], string, string[] | null][]  = [
  [['/', '/:id'], '/123', ['/123', '123']],
  [['/user', '/:id'], '/user/123', ['/user/123', '123']],
  [['/user', '/:id', '/abc'], '/user/123/abc', ['/user/123/abc', '123']],
  [['/:uid', '/:id'], '/12345/123', ['/12345/123', '12345', '123']],
  [['/login', '/:test(\\d+)+'], '/abc/123/456/789', null],
  [['/login', '/:test(\\d+)+'], '/login/123/456/789', ['/login/123/456/789', '123/456/789']],
  [['/login', '/:path(abc|xyz)*'], '/login/abc', ['/login/abc', 'abc']],
  [['/login', '/:path(abc|xyz)*'], '/login/xyz', ['/login/xyz', 'xyz']],
  [['/login', '/:path(abc|xyz)*'], '/login/abc/abc', ['/login/abc/abc', 'abc/abc']],
  [['/login', '/:path(abc|xyz)*'], '/login/xxx', null],
  [['/login', '/(.*)'], '/login/xxx', ['/login/xxx', 'xxx']],
  [['/abc', '/user(s)?/:user'], '/abc/user/123', ['/abc/user/123', undefined, '123']],
  [['/abc', '/user(s)?/:user'], '/abc/users/123', ['/abc/users/123', 's', '123']],
];

describe('path-to-regexp', () => {
  regexpPathTests.forEach(p => {
    const [pathJoinArray, input, expected] = p;
    test(`pathArray: ${JSON.stringify(pathJoinArray)} input: ${input} expected: ${JSON.stringify(expected)}`, () => {
      const re = pathToRegexp(joinPath(...pathJoinArray));
      expect(exec(re, input)).toStrictEqual(expected);
    });
  });
});

function exec(re: RegExp, str: string) {
  const match = re.exec(str);

  return match && Array.prototype.slice.call(match);
}
