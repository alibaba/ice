import * as React from 'react';
import { IGetApps, IAppRouter } from './base';

export { CompatibleAppConfig as IStarkAppConfig } from '@ice/stark/lib/AppRoute';
export interface IIceStark {
  type: 'framework' | 'child';
  getApps?: IGetApps;
  appRouter?: IAppRouter;
  removeRoutesLayout?: boolean;
  AppRoute?: React.ComponentType;
  Layout?: React.ComponentType;
  registerAppEnter?: (mountNode: HTMLElement, App: React.ComponentType, resolve: (value?: unknown) => void) => void;
  registerAppLeave?: (mountNode: HTMLElement) => void;

}

export interface IPrivateIceStark extends IIceStark {
  $$props: {
    container?: HTMLElement;
    customProps?: object;
  };
}
