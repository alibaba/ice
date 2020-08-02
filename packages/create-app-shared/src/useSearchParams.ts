import * as queryString from 'query-string';
import { getHistory } from './history';

const useSearchParams = () => {
  const history = getHistory();
  return queryString.parse(history.location.search);
};

export default useSearchParams;
