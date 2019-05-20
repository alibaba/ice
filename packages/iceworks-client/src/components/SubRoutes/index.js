import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoadingIndicator from '@components/LoadingIndicator';

const SubRoutes = ({ routes }) => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Switch>
        {routes.map((route, i) => {
          return [
            <Route
              key={i}
              path={route.path}
              render={(props) => {
                // pass the sub-routes down to keep nesting
                return <route.component {...props} routes={route.routes} />;
              }}
            />,
            route.from ? (
              <Redirect exact from={route.from} to={route.path} />
            ) : null,
          ];
        })}
      </Switch>
    </Suspense>
  );
};

SubRoutes.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default SubRoutes;
