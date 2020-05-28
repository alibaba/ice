import useRequest from '@ahooksjs/use-request';
import request from './request';

function useIceRequest(service: any, options: any = {}) {
  const { run, ...rest } = useRequest(service, {
    ...options,
    manual: true,
    requestMethod: () => request(service)
  });
  return {
    request: run,
    ...rest
  };
}

export { useIceRequest as useRequest };
