import * as queryString from 'query-string';
import { getHistory } from './storage';

// TODO: 分支逻辑可以优化下
export default function(history = getHistory()) {
  let search = history?.location?.search;

  if (!search && typeof window !== 'undefined') {
    search = window.location.search;
  }

  return queryString.parse(search);
}
