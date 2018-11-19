import loadable from 'react-loadable';
import React from 'react';

const Loading = () => {
  return (
    <div className="iceworks-skeleton-main">
      <div className="iceworks-skeleton-header" />
    </div>
  );
};

const Loading2 = () => {
  return (
    <div className="iceworks-skeleton-main">
      <div className="iceworks-skeleton-header" style={{ height: 60 }} />
    </div>
  );
};

const Loading3 = () => {
  return <div className="iceworks-skeleton-main" />;
};

export const PageHome = loadable({
  loader: () => import(/* webpackChunkName: "home" */ './pages/Home/'),
  loading: Loading,
});
export const PageScaffolds = loadable({
  loader: () =>
    import(/* webpackChunkName: "scaffolds" */ './pages/Scaffolds/'),
  loading: Loading2,
});

export const PageBlocks = loadable({
  loader: () => import(/* webpackChunkName: "blocks" */ './pages/Blocks/'),
  loading: Loading2,
});

export const PageExtensions = loadable({
  loader: () =>
    import(/* webpackChunkName: "extenstions" */ './pages/Extenstions/'),
  loading: Loading2,
});

export const PageSettings = loadable({
  loader: () => import(/* webpackChunkName: "settings" */ './pages/Settings/'),
  loading: Loading3,
});
