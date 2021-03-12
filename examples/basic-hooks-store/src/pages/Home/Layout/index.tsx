import React from 'react';
import Layout from '@/layouts/basic';

export default (props) => {
  return (
    <Layout>
      {props.children}
    </Layout>
  );
};
