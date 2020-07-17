import * as path from 'path';
import * as fse from 'fs-extra';

export interface IParams {
  rootDir: string;
  tempDir: string;
  configPath: string;
  projectType: string;
  isMpa: boolean;
}

interface IResult {
  routesPath: string;
  isConfigRoutes: boolean;
}

function getRoutes({ rootDir, tempDir, configPath, projectType, isMpa }: IParams): IResult {
  // if is mpa use empty router file
  if (isMpa) {
    const routesTempPath = path.join(tempDir, 'routes.ts');
    fse.writeFileSync(routesTempPath, 'export default [];', 'utf-8');
    configPath = routesTempPath;
    return {
      routesPath: configPath,
      isConfigRoutes: true
    };
  }

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

export {
  getRoutes
};
