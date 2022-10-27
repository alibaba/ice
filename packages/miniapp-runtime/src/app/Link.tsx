import React from 'react';
import { Current } from '../current.js';

interface LinkProps extends React.ComponentProps<any> {
  to: string;
}

function matchRoute(url: string, routes: Array<string>): string | undefined {
  const [url_] = url.split('#');
  const [path, query] = url_.split('?');
  /*
  * path => route
  * 1.  /about => about or about/index
  * 2.  /about/profile => about/profile or about/profile/index
  * 3. / => index
  */
  const matchedRoute = routes.find(route => {
    if (path === '/') {
      // Index is special
      return route === 'index';
    } else {
      return `/${route}` === path || `/${route}` === `${path}/index`;
    }
  });
  return query ? `${matchedRoute}?${query}` : matchedRoute;
}

export default function Link(props: LinkProps) {
  const { routes } = Current.app.config;
  const url = matchRoute(props.to, routes);
  // @ts-ignore
  return <navigator url={url}>{props.children}</navigator>;
}
