import type { RequestHandler, Request } from 'express';
import { pathToRegexp } from 'path-to-regexp';
import type { Key } from 'path-to-regexp';
import bodyParser from 'body-parser';
import multer from 'multer';
import type { MockConfig } from './getConfigs';

export default function createMiddleware(
  context: { mockConfigs: MockConfig[] },
): RequestHandler {
  return (req, res, next) => {
    const matchResult = matchPath(req, context.mockConfigs);
    if (matchResult) {
      const { match, mockConfig, keys } = matchResult;
      const { handler, method } = mockConfig;
      if (typeof handler === 'function') {
        // params
        const params: Record<string, any> = {};
        for (let i = 1; i < match.length; i += 1) {
          const key = keys[i - 1];
          const prop = key.name;
          const val = decodeParam(match[i]);
          if (val !== undefined) {
            params[prop] = val;
          }
        }
        req.params = params;
        // handler
        if (method === 'GET') {
          handler(req, res, next);
          return;
        } else {
          // parses json and add to `req.body`
          bodyParser.json({ limit: '5mb', strict: false })(req, res, () => {
            // parses urlencoded bodies and add to `req.body`
            bodyParser.urlencoded({ limit: '5mb', extended: true })(req, res, () => {
              // handles `multipart/form-data` and add to `req.body`
              multer().any()(req, res, () => {
                handler(req, res, next);
                return;
              });
            });
          });
        }
      } else {
        return res.status(200).json(handler);
      }
    } else {
      next();
    }
  };
}

function matchPath(req: Request, mockConfigs: MockConfig[]): undefined | { keys: Key[]; mockConfig: MockConfig; match: RegExpExecArray } {
  for (const mockConfig of mockConfigs) {
    const keys = [];
    if (req.method.toLocaleUpperCase() === mockConfig.method) {
      const re = pathToRegexp(mockConfig.path, keys);
      const match = re.exec(req.path);
      if (re.exec(req.path)) {
        return {
          keys,
          match,
          mockConfig,
        };
      }
    }
  }
}

function decodeParam(val: any) {
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