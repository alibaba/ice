import * as queryString from 'query-string';
import { getHistory } from './history';

export default function() {
  const history = getHistory();
  const search = history.location.search;
  if (search) {
    return queryString.parse(search);
  }
  return {};
}
