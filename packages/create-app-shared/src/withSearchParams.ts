import * as queryString from 'query-string';
import { getHistory } from './history';

export default (createElement) => {
  const withSearchParams = Component => {
    const WrapperedSearchParams = props => {
      const history = getHistory();
      const searchParams = queryString.parse(history.location.search);
      return createElement(
        Component,
        {
          ...props,
          searchParams
        }
      );
    };
    return WrapperedSearchParams;
  };
  return withSearchParams;
};
