import * as React from 'react';
import type { RouteWrapperConfig, ComponentModule } from '@ice/runtime-kit';

interface Props {
  id: string;
  isLayout?: boolean;
  wrappers?: RouteWrapperConfig[];
  children?: React.ReactNode;
  routeExports: ComponentModule;
}

export default function RouteWrapper(props: Props) {
  const { wrappers = [], id, isLayout, routeExports } = props;
  // layout should only be wrapped by Wrapper with `layout: true`
  const filtered = isLayout ? wrappers.filter(wrapper => wrapper.layout === true) : wrappers;
  const RouteWrappers = filtered.map(item => item.Wrapper);

  let element;

  if (RouteWrappers.length) {
    element = RouteWrappers.reduce((preElement, CurrentWrapper) => (
      <CurrentWrapper routeId={id} routeExports={routeExports}>
        {preElement}
      </CurrentWrapper>
    ), props.children);
  } else {
    element = props.children;
  }

  return element;
}
