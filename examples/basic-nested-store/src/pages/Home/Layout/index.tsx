import React from 'react';
import Layout from '@/layouts';
import pageStore from '../store';

const { Provider } = pageStore;

export default (props) => {
  return (
    <Provider>
      <Layout>
        {props.children}
      </Layout>
    </Provider>
  );
};
