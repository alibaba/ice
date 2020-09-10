import * as queryString from 'query-string';
import { getHistory } from './history';

export default function() {
  const history = getHistory();
  return queryString.parse(history.location.search);
}
