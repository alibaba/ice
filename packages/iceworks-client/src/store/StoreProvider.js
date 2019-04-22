import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StoreContext from './StoreContext';

const StoreProvider = ({ initialState, children }) => {
  const [store, setStore] = useState(initialState);

  return (
    <StoreContext.Provider value={[store, setStore]}>
      {children}
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  initialState: PropTypes.any,
  children: PropTypes.element.isRequired,
};

export default StoreProvider;
