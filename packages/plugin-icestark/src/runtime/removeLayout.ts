function removeLayout(routes) {
  let modifiedRoutes = [];
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