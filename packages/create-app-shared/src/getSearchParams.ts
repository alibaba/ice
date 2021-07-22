import * as queryString from 'query-string';
import { getHistory } from './storage';

export default function(history = getHistory()) {
  if (!history && typeof window !== 'undefined' && window.history) {
    history = (window as any).history;
  }
  if (history && history.location && history.location.search) {
    return queryString.parse(history.location.search);
  }
  return {};
}
