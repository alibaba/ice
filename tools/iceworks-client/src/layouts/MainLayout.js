import React from 'react';
import menuConfig from '../menuConfig';
import routerConfig from '../routerConfig';
import Aside from '../components/Aside';
import RouteRender from '../components/RouteRender';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Aside menuData={menuConfig} />

      {routerConfig.map((route, index) => (
        <RouteRender key={index} {...route} />
      ))}
    </div>
  );
};

export default MainLayout;
