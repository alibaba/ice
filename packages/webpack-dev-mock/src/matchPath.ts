/* eslint @typescript-eslint/no-var-requires:0 */
import { pathToRegexp } from 'path-to-regexp';

function decodeParam(val) {
  if (typeof val !== 'string' || val.length === 0) {
    return val;
  }
  try {
    return decodeURIComponent(val);
  } catch (err) {
    if (err instanceof URIError) {
      err.message = `Failed to decode param ' ${val} '`;
      (err as any).status = 400;
      (err as any).statusCode = 400;
    }
    throw err;
  }
}

function matchPath(req, mockConfig) {
  const { path: reqPath, method: reqMethod } = req;

  for (let m = 0; m < mockConfig.length; m += 1) {
    const mock = mockConfig[m];
    const { path: mockPath, method: mockMethod } = mock;
    const keys = [];
    const regexp = pathToRegexp(mockPath, keys);
    if (mockMethod.toLowerCase() === reqMethod.toLowerCase()) {
      const match = regexp.exec(reqPath);
      if (match) {
        const params = {};
        for (let i = 1; i < match.length; i += 1) {
          const key = keys[i - 1];
          const prop = key.name;
          const val = decodeParam(match[i]);
          if (val !== undefined || !Object.prototype.hasOwnProperty.call(params, prop)) {
            params[prop] = val;
          }
        }
        req.params = params;
        return mock;
      }
    }
  }
}

export default matchPath;