import Vue from 'vue';
import Router from 'vue-router';
import { routesConfig } from './routesConfig';

const recursiveRoutesConfig = (config = []) => {
  const routeMap = [];
  config.forEach((item) => {
    const route = {
      path: item.path,
      component: item.component,
      redirect: item.redirect,
    };
    if (Array.isArray(item.children)) {
      route.children = recursiveRoutesConfig(item.children);
    }
    routeMap.push(route);
  });

  return routeMap;
};

const routes = recursiveRoutesConfig(routesConfig);

Vue.use(Router);

export default new Router({
  routes,
});
