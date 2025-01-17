import type { TaskConfig } from 'build-scripts';
import type { Config, EnvironmentContext } from '../types';

interface ModifyEnvironmentConfigOption {
  environment: EnvironmentContext;
}

export type OnGetEnvironmentConfig = (cb: ModifyEnvironmentConfigFn) => void;

type ModifyEnvironmentConfigFn = (
  config: Config,
  options: ModifyEnvironmentConfigOption,
) => Promise<Config | void> | void | Config;

class EnvironmentConfigContext {
  private modifyConfigFns: ModifyEnvironmentConfigFn[] = [];

  onGetEnvironmentConfig(cb: ModifyEnvironmentConfigFn) {
    this.modifyConfigFns.push(cb);
  }

  async runOnGetEnvironmentConfig(taskConfigs: TaskConfig<Config>[]) {
    for (const fn of this.modifyConfigFns) {
      taskConfigs.forEach(async (taskConfig) => {
        const result = await fn(taskConfig.config, { environment: { name: taskConfig.name } });
        if (result) {
          taskConfig.config = result;
        }
      });
    }
  }
}

export const environmentConfigContext = new EnvironmentConfigContext();
export const onGetEnvironmentConfig: OnGetEnvironmentConfig =
  environmentConfigContext.onGetEnvironmentConfig.bind(environmentConfigContext);
