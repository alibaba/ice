import React from 'react';
import { getMiniappRoutes } from './history.js';
interface LinkProps extends React.ComponentProps<any> {
  to: string;
}

function matchRoute(url: string): string | undefined {
  const [url_] = url.split('#');
  const [path, query] = url_.split('?');

  const miniappRoutes = getMiniappRoutes();
  const matchedRoute = miniappRoutes.find(route => route.path === path);
  return query ? `${matchedRoute.source}?${query}` : matchedRoute.source;
}

export default function Link(props: LinkProps) {
  const url = matchRoute(props.to);
  // @ts-ignore
  return <navigator url={url}>{props.children}</navigator>;
}
