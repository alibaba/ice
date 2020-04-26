import { useLocation } from 'react-router-dom';
import * as queryString from 'query-string';

export const useSearchParams = () => {
  const location = useLocation();
  return queryString.parse(location.search);
};
