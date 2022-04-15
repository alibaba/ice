import type { AppConfig } from 'ice';
import { runApp } from 'ice';
import { request, type Request } from 'ice';
import page from '@/page';
import url from './a.png';

console.log(url);
runApp({
  request,
  page,
} as AppConfig)

export default () => {};