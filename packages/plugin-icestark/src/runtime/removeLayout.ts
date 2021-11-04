interface Routes {
  children: Routes[];
  path: string;
}

function removeLayout(routes: Routes[]) {
  let modifiedRoutes: Routes[] = [];
  routes.forEach((route) => {
    if (route.path === '/' && route.children) {
      modifiedRoutes = [...modifiedRoutes, ...route.children];
    } else {
      modifiedRoutes.push(route);
    }
  });
  return modifiedRoutes;
}

export default removeLayout;