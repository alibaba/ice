export interface StoreConfig {
  initialStates: Record<string, any>;
}

type Store = ((data?: any) => Promise<StoreConfig>) | StoreConfig;

function defineStoreConfig(fn: Store) {
  return fn;
}

export {
  defineStoreConfig,
};
