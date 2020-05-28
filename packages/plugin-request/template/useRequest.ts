/* eslint @typescript-eslint/no-empty-interface: 0 */
import useBaseRequest from '@ahooksjs/use-request';
import { BaseOptions, BasePaginatedOptions, BaseResult, CombineService, LoadMoreFormatReturn, LoadMoreOptions, LoadMoreOptionsWithFormat, LoadMoreParams, OptionsWithFormat, PaginatedFormatReturn, PaginatedOptionsWithFormat, PaginatedParams } from '@ahooksjs/use-request/lib/types';
import request from './request';

type OmitBaseResult<R, P extends any[]> = Omit<BaseResult<R, P>, 'run'>;

interface IceBaseResult<R, P extends any[]> extends OmitBaseResult<R, P> {
  request: (...args: P) => Promise<R>;
}

interface IceLoadMoreResult<R> extends OmitBaseResult<R, LoadMoreParams<R>>  {

}

interface IcePaginatedResult<Item> extends OmitBaseResult<PaginatedFormatReturn<Item>, PaginatedParams> {

}

function useRequest<R = any, P extends any[] = any, U = any, UU extends U = any>(
  service: CombineService<R, P>,
  options: OptionsWithFormat<R, P, U, UU>
): IceBaseResult<U, P>
function useRequest<R = any, P extends any[] = any>(
  service: CombineService<R, P>,
  options?: BaseOptions<R, P>
): IceBaseResult<R, P>

function useRequest<R extends LoadMoreFormatReturn, RR>(
  service: CombineService<RR, LoadMoreParams<R>>,
  options: LoadMoreOptionsWithFormat<R, RR>
): IceLoadMoreResult<R>
function useRequest<R extends LoadMoreFormatReturn, RR extends R>(
  service: CombineService<R, LoadMoreParams<R>>,
  options: LoadMoreOptions<RR>
): IceLoadMoreResult<R>

function useRequest<R = any, Item = any, U extends Item = any>(
  service: CombineService<R, PaginatedParams>,
  options: PaginatedOptionsWithFormat<R, Item, U>
): IcePaginatedResult<Item>
function useRequest<R = any, Item = any, U extends Item = any>(
  service: CombineService<PaginatedFormatReturn<Item>, PaginatedParams>,
  options: BasePaginatedOptions<U>
): IcePaginatedResult<Item>
function useRequest(service: any, options: any = {}) {
  const { run, ...rest } = useBaseRequest(service, {
    manual: true,
    requestMethod: () => request(service),
    ...options,
  });
  return {
    request: run,
    ...rest
  };
}

export default useRequest;
