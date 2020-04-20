import * as path from 'path';
import * as fse from 'fs-extra';

interface IParams {
  rootDir: string;
  tempDir: string;
  configPath: string;
  projectType: string;
}

interface IResult {
  routesPath: string;
  isConfigRoutes: boolean;
}

function getRoutes({ rootDir, tempDir, configPath, projectType }: IParams): IResult {
  const routesPath = configPath
    ? path.join(rootDir, configPath)
    : path.join(rootDir, `src/routes.${projectType}`);

  // 配置式路由
  const configPathExists = fse.existsSync(routesPath);
  if (configPathExists) {
    return {
      routesPath,
      isConfigRoutes: true
    };
  }

  // 约定式路由
  return {
    routesPath: path.join(tempDir, `routes.${projectType}`),
    isConfigRoutes: false
  };
}

export default getRoutes;
