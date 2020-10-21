import React from 'react';
import Layout from '@/layouts';

export default (props) => {
  return (
    <Layout>
      {props.children}
    </Layout>
  );
};
