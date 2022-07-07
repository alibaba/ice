import * as path from 'path';
import cacache from '@ice/bundles/compiled/cacache/index.js';

const CACHE_PATH = 'node_modules/.cache/route';

export function getRouteCache(rootDir: string, routeId: string) {
  const cachePath = path.join(rootDir, CACHE_PATH);
  return cacache.get(cachePath, routeId).then((cache) => JSON.parse(cache.data.toString('utf-8')));
}

export function setRouteCache(rootDir: string, routeId: string, data: any) {
  const cachePath = path.join(rootDir, CACHE_PATH);
  return cacache.put(cachePath, routeId, JSON.stringify(data));
}