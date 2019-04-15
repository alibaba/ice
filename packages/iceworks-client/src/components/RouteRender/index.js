import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const RouteRender = (route = {}) => {
  return (
    <Route
      path={route.path}
      render={(props) => {
        return <route.component {...props} routes={route.routes} />;
      }}
    />
  );
};

RouteRender.propTypes = {
  routerData: PropTypes.object,
};

export default RouteRender;
