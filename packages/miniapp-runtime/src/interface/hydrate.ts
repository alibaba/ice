import type { Shortcuts } from '@ice/shared';
import type { MiniappPageConfig } from '@ice/types';

export interface MpInstance {
  config: MiniappPageConfig;
  setData: (data: unknown, cb: () => void) => void;
  route?: string;
  __route__: string;
  $iceParams?: Record<string, unknown>;
  $icePath: string;
  __data__: any;
  data: any;
  exitState?: any;
  selectComponent: (selector: string) => any;
}

export interface MiniElementData {
  [Shortcuts.Childnodes]?: MiniData[];
  [Shortcuts.NodeName]: string;
  [Shortcuts.Class]?: string;
  [Shortcuts.Style]?: string;
  uid?: string;
  sid: string;
  [key: string]: unknown;
}

interface MiniTextData {
  [Shortcuts.Text]: string;
  [Shortcuts.NodeName]: string;
}

export type MiniData = MiniElementData | MiniTextData;

export type HydratedData = () => MiniData | MiniData[];
