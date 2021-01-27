import * as queryString from 'query-string';
import { getHistory } from './history';

export default function(location?) {
  if (location) return queryString.parse(location.search);
  const history = getHistory();
  if (history && history.location && history.location.search) {
    return queryString.parse(history.location.search);
  }
  return {};
}
