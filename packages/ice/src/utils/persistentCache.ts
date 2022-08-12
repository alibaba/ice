import * as path from 'path';
import cacache from '@ice/bundles/compiled/cacache/index.js';

const CACHE_PATH = 'node_modules/.cache/route';

export function getCache(rootDir: string, id: string) {
  const cachePath = path.join(rootDir, CACHE_PATH);
  return cacache.get(cachePath, id).then((cache) => JSON.parse(cache.data.toString('utf-8')));
}

export function setCache(rootDir: string, id: string, data: any) {
  const cachePath = path.join(rootDir, CACHE_PATH);
  return cacache.put(cachePath, id, JSON.stringify(data));
}