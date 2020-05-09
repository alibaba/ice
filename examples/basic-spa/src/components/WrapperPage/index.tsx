import React from 'react';

const wrapperPage = (PageComponent) => {
  const WrappedPage = (props) => {
    return <PageComponent {...props} />
  };
  return WrappedPage;
};

export default wrapperPage;
