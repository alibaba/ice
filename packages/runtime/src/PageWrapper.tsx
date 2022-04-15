import * as React from 'react';
import type { PageWrapper } from './types';
import { useAppContext } from './AppContext.js';
import { DataProvider, ConfigProvider } from './RouteContext.js';

interface Props {
  PageComponent: React.ComponentType<any>;
  PageWrappers?: PageWrapper<any>[];
  id: string;
}

export default function PageWrapper(props: Props) {
  const { PageComponent, PageWrappers, id } = props;
  const { routesData, routesConfig } = useAppContext();

  const Page = (PageWrappers || []).reduce((acc, curr) => curr(acc), PageComponent);

  return (
    <DataProvider value={routesData[id]}>
      <ConfigProvider value={routesConfig[id]}>
        <Page />
      </ConfigProvider>
    </DataProvider>
  );
}