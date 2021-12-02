import * as queryString from 'query-string';
import { getHistory } from './storage';

export default function(history = getHistory()) {
  // SSR 会在渲染前通过 setHistory 设置通过 request 信息模拟的 history
  let search = history?.location?.search;

  if (!search && typeof window !== 'undefined') {
    search = window.location.search;
  }

  return queryString.parse(search);
}
