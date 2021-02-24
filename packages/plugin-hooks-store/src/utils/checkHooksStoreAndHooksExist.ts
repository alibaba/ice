//@ts-ignore
import * as fse from "fs-extra";
import { getAppHooksStorePath, getAppHooksPath } from "./getPath";
//@ts-ignore
export default ({ rootDir, srcDir, projectType, applyMethod }) => {
  const appHooksStorePath = getAppHooksStorePath({
    rootDir,
    srcDir,
    projectType
  });
  const appHooksPath = getAppHooksPath({ rootDir, srcDir });

  return (
    fse.pathExistsSync(appHooksStorePath) || fse.pathExistsSync(appHooksPath)
  );
};
