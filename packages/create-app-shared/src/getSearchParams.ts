import * as queryString from 'query-string';
import { getHistory } from './history';

export default function() {
  const history = getHistory();
  if (history && history.location && history.location.search) {
    return queryString.parse(history.location.search);
  }
  return {};
}
