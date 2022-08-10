import * as React from 'react';
import type { RouteWrapperConfig } from './types.js';
import { useAppContext } from './AppContext.js';
import { DataProvider, ConfigProvider } from './RouteContext.js';

interface Props {
  id: string;
  isLayout?: boolean;
  wrappers?: RouteWrapperConfig[];
  children?: React.ReactNode;
}

export default function RouteWrapper(props: Props) {
  const { wrappers = [], id, isLayout } = props;
  const { routesData, routesConfig } = useAppContext();
  // layout should only be wrapped by Wrapper with `layout: true`
  const filtered = isLayout ? wrappers.filter(wrapper => wrapper.layout === true) : wrappers;
  const RouteWrappers = filtered.map(item => item.Wrapper);

  let element;

  if (RouteWrappers.length) {
    element = RouteWrappers.reduce((preElement, CurrentWrapper) => (
      <CurrentWrapper routeId={id}>
        {preElement}
      </CurrentWrapper>
    ), props.children);
  } else {
    element = props.children;
  }

  return (
    <DataProvider value={routesData[id]}>
      <ConfigProvider value={routesConfig[id]}>
        {element}
      </ConfigProvider>
    </DataProvider>
  );
}