import { IPlugin } from "@alib/build-scripts";
import * as path from "path";
// @ts-ignore
import * as fse from "fs-extra";
import checkHooksStoreAndHooksExist from "./utils/checkHooksStoreAndHooksExist";
import { getAppHooksStorePath } from "./utils/getPath";

const plugin: IPlugin = async api => {
  const {
    context,
    getValue,
    onHook,
    applyMethod,
    onGetWebpackConfig,
    modifyUserConfig
  } = api;

  applyMethod("addExport", {
    source: "@ice/hooks-store",
    specifier: "{ createStore as createHooksStore }",
    importSource: "@ice/hooks-store",
    exportName: "createHooksStore",
    exportMembers: ["createHooksStore"]
  });
};

export default plugin;
