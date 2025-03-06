import type { Configuration as RspackConfiguration } from '@rspack/core';
import type { Configuration as WebpackConfiguration } from 'webpack';
import type { EnvironmentContext } from '../types';

type BundlerType = 'rspack' | 'webpack';
type BundlerConfig = RspackConfiguration | WebpackConfiguration;

export interface ModifyBundlerConfigOption {
  environment: EnvironmentContext;
  type: BundlerType;
}

type ModifyConfigFn = (
  config: BundlerConfig,
  options: ModifyBundlerConfigOption,
) => Promise<BundlerConfig | void> | void | BundlerConfig;

export type OnGetBundlerConfig = (cb: ModifyConfigFn) => void;

class BundlerConfigContext {
  private modifyConfigFns: ModifyConfigFn[] = [];

  onGetBundlerConfig(cb: ModifyConfigFn) {
    this.modifyConfigFns.push(cb);
  }

  async runOnGetBundlerConfig(config: BundlerConfig, options: ModifyBundlerConfigOption) {
    for (const fn of this.modifyConfigFns) {
      const result = await fn(config, options);
      if (result) {
        config = result;
      }
    }
    return config;
  }
}

export const bundlerConfigContext = new BundlerConfigContext();

export const onGetBundlerConfig: OnGetBundlerConfig =
  bundlerConfigContext.onGetBundlerConfig.bind(bundlerConfigContext);
