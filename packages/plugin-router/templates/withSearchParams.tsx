import React from 'react';
import { useLocation } from 'react-router-dom';
import * as queryString from 'query-string';

export const withSearchParams = Component => {
  const SearchParamsWrappered = props => {
    const location = useLocation();
    const searchParams = queryString.parse(location.search);
    return <Component {...Object.assign({}, props, { searchParams })} />;
  };
  return SearchParamsWrappered;
};
