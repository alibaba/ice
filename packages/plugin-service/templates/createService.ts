import * as React from 'react';
import * as merge from 'lodash.merge';
import * as transform from 'lodash.transform';
import { request as iceRequest } from 'ice';

type IOptions = Record<string, any>;
type IDataHandler = (response: any, error?: Error) => any;

interface IBaseConfing {
  type?: string;
  options?: IOptions;
  dataHandler?: IDataHandler;
}

interface IApiConfig extends IBaseConfing {
  options: IOptions;
  isInit?: boolean;
}

export interface IApiConfigs {
  [name: string]: IApiConfig;
}

interface IResult {
  status: 'init'|'loaded'|'loading'|'error';
  data: any;
  error: Error | null;
}

interface IUseInitData {
  (model: any): void;
}

interface IReloadInitData {
  (): void;
}

interface IService {
  useInitData: IUseInitData;
  reloadInitData: IReloadInitData;
}

export default function<S>(apiConfigs: IApiConfigs, defaultConfig?: IBaseConfing, dataHandler?: IDataHandler) {
  type T<R> = {
    [K in keyof R]: R[K] & IResult;
  }
  const service = transform(apiConfigs, (result, config, name) => {
    const { options, dataHandler: configDataHandler } = getConfig(name);
    result[name] = async function(params?, setOptions?) {
      let data;
      let error;
      result[name].status = 'loading';

      const finallyOptions = merge({}, options, { params }, setOptions);
      try {
        data = await iceRequest(finallyOptions);
        result[name].status = 'loaded';
      } catch (e) {
        result[name].status = 'error';
        error = e;
        // TODO 抛出错误才是更合理的，但是目前 iceluna 中 catch 了错误
        // throw error;
      }

      if (configDataHandler) {
        // TODO 抛出错误才是更合理的，但是目前 iceluna 中 catch 了错误
        try {
          data = configDataHandler(data, error);
        } catch (err) { /** Ignore */ }
      }

      result[name].data = data;
      result[name].error = error;
      return data;
    };

    result[name].status = 'init';
    result[name].data = null;
    result[name].error = null;
  });

  function getConfig(name) {
    const config = merge({}, defaultConfig, apiConfigs[name]);
    return config;
  }

  function getInitAPIs() {
    const initAPIs = {};
    Object.keys(apiConfigs).forEach((name) => {
      if (apiConfigs[name].isInit) {
        initAPIs[name] = service[name];
      }
    });
    return initAPIs;
  }

  async function requestInitData() {
    const initAPIs = getInitAPIs();
    const dataMap = {};
    let error;
    await Promise.all(Object.keys(initAPIs).map(async (name) => {
      const initAPI = initAPIs[name];
      try {
        dataMap[name] = await initAPI();
      } catch (e) {
        error = e;
      }
    }));
    return {
      dataMap,
      error,
    };
  }

  let dispatchers;
  function useInitData([, value]) {
    dispatchers = value;
    React.useEffect(() => {
      reloadInitData();
    }, []);
  }

  async function reloadInitData() {
    const { dataMap, error } = await requestInitData();
    let nextState = dataMap;
    if (dataHandler) {
      nextState = dataHandler(dataMap, error);
    }

    if (dispatchers) {
      dispatchers.setState(nextState);
    }
  }

  service.useInitData = useInitData;
  service.reloadInitData = reloadInitData;
  return service as (T<S> & IService);
}
