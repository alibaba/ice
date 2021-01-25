import { createStore, IStoreModels, IStoreRootState, IStoreDispatch } from 'ice';
import modelAbout from './model';

interface IAppStoreModels extends IStoreModels {
  about: typeof modelAbout;
}

const appModels: IAppStoreModels = {
  about: modelAbout
};

export default createStore(appModels);

// 导出 IRootDispatch 类型
export type IRootDispatch = IStoreDispatch<typeof appModels>;

// 导出 IRootState 类型
export type IRootState = IStoreRootState<typeof appModels>;
