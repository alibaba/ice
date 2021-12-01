import * as React from 'react';
import { getSearchParams } from 'ice';

export default function Test(props) {
  console.log('Test', props);
  console.log('search params', getSearchParams());
  return <>Hello: {props.name}</>;
}

Test.pageConfig = {
  title: '哈哈'
};

Test.getInitialProps = async (ctx) => {
  return {
    name: 'React(getInitialProps)'
  };
};
