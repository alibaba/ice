import React from 'react';

const wrapperPage = (PageComponent) => {
  console.log('custom route wrapper');
  const WrappedPage = (props) => {
    return <PageComponent {...props} />;
  };
  return WrappedPage;
};

export default wrapperPage;
