import * as React from 'react';
import KeepAlive, { AliveScope } from 'react-activation';

const runtimeModule = ({ wrapperRouteComponent, modifyRoutesComponent }) => {
  const wrapperKeepAlive = (PageComponent) => {
    // const { pageConfig = {} } = PageComponent;
    const WrapperedKeepAlive = (props) => {
      return (
        <KeepAlive>
          <PageComponent {...props} />
        </KeepAlive>
      );
    };
    return WrapperedKeepAlive;
  };
  wrapperRouteComponent(wrapperKeepAlive);
  // add provider for routes component
  modifyRoutesComponent((RoutesComponent: React.ComponentType) => {
    console.log('add provide');
    return (props) => (
      <AliveScope>
        <RoutesComponent {...props} />
      </AliveScope>
    );
  });
};

export default runtimeModule;