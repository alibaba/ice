/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { store as pageStore } from 'ice/Home';
import { store as appStore } from 'ice';
import Home from '../index';

const PageProvider = pageStore.Provider;
const AppProvider = appStore.Provider;

const history = createMemoryHistory();

const WithPageModel = (props) => {
  return (
    <PageProvider>
      <Home {...props} />
    </PageProvider>
  );
};

const WithAppModel = (props) => {
  return (
    <AppProvider>
      <WithPageModel {...props} />
    </AppProvider>
  );
};

const WithRouter = (props) => {
  return (
    <Router history={history}>
      <WithAppModel {...props} />
    </Router>
  );
};

// icejs 状态管理：https://ice.work/docs/guide/basic/store
test('React Snapshot Test with model', () => {
  const component = renderer.create(
    <WithRouter />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('React DOM Test with model', () => {
  const { queryByText } = render(
    <WithRouter />
  );

  // page model
  expect(queryByText(/Home Page/i)).not.toBeNull();

  // app model
  expect(queryByText(/basic store/i)).not.toBeNull();
});
