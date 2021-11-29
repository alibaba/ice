import * as React from 'react';

export default function Test(props) {
  console.log('Test', props);
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
