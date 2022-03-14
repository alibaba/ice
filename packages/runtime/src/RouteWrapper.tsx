import * as React from 'react';
import type { PageWrapper } from './types';

interface Props {
  PageComponent: React.ComponentType<any>;
  PageWrappers?: PageWrapper<any>[];
}

const staticPropNames = ['pageConfig', 'getInitialProps'];

export default function RouteWrapper(props: Props) {
  const { PageComponent, PageWrappers } = props;

  console.log('render Route Wrapper', props);

  const Page = (PageWrappers || []).reduce((acc, curr) => {
    const compose = curr(acc);

    // 保证 wrapper 过程中不丢失静态属性
    staticPropNames.forEach((propName) => {
      if (Object.prototype.hasOwnProperty.call(acc, propName)) {
        compose[propName] = acc[propName];
      }
    });

    return compose;
  }, PageComponent);

  return <Page />;
}