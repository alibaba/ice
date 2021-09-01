import type {
  HSFClient,
  TairManager,
  DiamondClient,
  TairClient,
  VIPClient,
} from '@ali/faas-middleware-interface';
import { FaaSContext } from '@midwayjs/faas';

declare module '@midwayjs/faas' {
  interface FaaSContext {
    hsfClient: HSFClient;
    tairManager: TairManager;
    diamond: DiamondClient;
    tair: TairClient | Map<string, TairClient>;
    vipClient: VIPClient;
  }
}

declare module '@midwayjs/hooks' {
  export function useContext<T = FaaSContext>(): T;
}
