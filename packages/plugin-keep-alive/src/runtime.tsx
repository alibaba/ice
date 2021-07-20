import * as React from 'react';
import KeepAlive, { AliveScope } from 'react-activation';

const runtimeModule = ({ wrapperPageComponent, modifyRoutesComponent }) => {
  const wrapperKeepAlive = (PageComponent) => {
    const { pageConfig = {} } = PageComponent;
    // set pageConfig.keepAlive false to disable KeepAlive provider
    if (pageConfig.keepAlive === false) {
      return PageComponent;
    } else {
      const WrapperedKeepAlive = (props) => {
        return (
          <KeepAlive>
            <PageComponent {...props} />
          </KeepAlive>
        );
      };
      return WrapperedKeepAlive;
    }
  };
  wrapperPageComponent(wrapperKeepAlive);
  // add provider for routes component
  modifyRoutesComponent((RoutesComponent: React.ComponentType) => {
    return (props) => (
      <AliveScope>
        <RoutesComponent {...props} />
      </AliveScope>
    );
  });
};

export default runtimeModule;
