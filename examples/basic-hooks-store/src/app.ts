import { runApp } from "ice";

import routes from "./routes";

const { rootStore, children } = routes[0]; // [{path:'',compoonent:'',store}]

const storesWithPath = [];
children.forEach((child) => {
  if (child.store) {
    storesWithPath.push(child);
  }
});

const appConfig = {
  app: {
    rootId: "ice-container",
  },
  store: {
    rootStore,
    storesWithPath,
  },
};

runApp(appConfig);
