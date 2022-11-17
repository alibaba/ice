import type { AppConfig } from 'ice';
import { runApp } from 'ice';
import { request, type Request } from 'ice';
import url from './a.png';
import page from '@/page';

console.log(url);
runApp({
  request,
  page,
} as AppConfig);

export default () => { };