import * as React from 'react';
import type { AppContext } from './types';

interface Props {
  appContext: AppContext;
  // pageWrappers: React.ComponentType<any>[];
  PageComponent: React.ComponentType<any>;
}

export default function RouteItem(props: Props) {
  const { appContext, PageComponent } = props;
  // const Wrapper = pageWrappers[0];

  return (
    <React.Suspense fallback={<>loading chunk....</>}>
      {/* {
        (pageWrappers || []).reduce((Prev, Curr) => {
          // const compose = curr(acc);
          // if (acc.pageConfig) {
          //   compose.pageConfig = acc.pageConfig;
          // }
          // if (acc.getInitialProps) {
          //   compose.getInitialProps = acc.getInitialProps;
          // }
          return <Prev><Curr /></Prev>;
        }, PageComponent)
      } */}
      {/* <Wrapper> */}
      <PageComponent />
      {/* </Wrapper> */}
    </React.Suspense>
  );
}
