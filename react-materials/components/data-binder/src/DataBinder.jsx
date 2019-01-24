/* eslint-disable no-underscore-dangle, no-nested-ternary */
import React, { Component } from 'react';
import axios from 'axios';
import { Message } from '@alifd/next';
import pureRender from 'pure-render-decorator';
import merge from 'deepmerge';

/**
 * 初始化对象的加载状态，错误状态等，并且该值不能枚举
 * @param {Object|Array} target  目标对象
 */
function initializeRequestStatus(
  target,
  requestStatus = { __loading: false, __error: null }
) {
  Object.defineProperty(target, '__loading', {
    value:
      typeof requestStatus.__loading !== 'undefined'
        ? requestStatus.__loading
        : target.__loading !== 'undefined'
          ? target.__loading
          : false,
    writable: true,
    enumerable: false,
    configurable: false,
  });

  Object.defineProperty(target, '__error', {
    value:
      typeof requestStatus.__error !== 'undefined'
        ? requestStatus.__error
        : target.__error !== 'undefined'
          ? target.__error
          : null,
    writable: true,
    configurable: false,
    enumerable: false,
  });
  return target;
}

/**
 * merge array use override
 */
const overwriteMerge = (destArray, sourceArray) => sourceArray;

const defaultOpts = {
  requestClient: axios,
  arrayMerge: overwriteMerge,
};

/**
 * DataBinder 的 HOC 创建函数，预先做一些数据整理
 *
 * @param  {Object} sourceConfig 为各个模块的 DataSource 配置，详情参见 README.md 和 Demo
 * @return {function}
 */

export default function dataBinder(sourceConfig, opts = {}) {
  opts.__proto__ = defaultOpts; // apply default opts

  const requestOptions = {}; // 请求参数 map 数据结构
  // 请求数据 map 数据结构
  const defaultBindingDatas = initializeRequestStatus({});
  // initial merge option
  // ref: https://www.npmjs.com/package/deepmerge
  const mergeOption = { arrayMerge: opts.arrayMerge };

  // 根据传入数据进行初始化
  Object.keys(sourceConfig).forEach((dataSourceKey) => {
    const { defaultBindingData = {}, ...others } = sourceConfig[dataSourceKey];

    defaultBindingDatas[dataSourceKey] = initializeRequestStatus(
      defaultBindingData
    );
    requestOptions[dataSourceKey] = others;
  });

  /**
   * Core HOC 函数
   *
   * @param  {ReactElement} WrappedComponent 被包裹的 React Element
   * @return {ReactElement}                  IceDataBinderWrapper React Element
   */
  return function dataBinderHOC(WrappedComponent) {
    return @pureRender
    class IceDataBinderWrapper extends Component {
      static displayName = `IceDataBinderWrapper(${getDisplayName(
        WrappedComponent
      )})`;

      constructor(props) {
        super(props);
        // state 默认包含所有的 DataSource 中的 defaultBindingData 数据
        this.state = {
          ...defaultBindingDatas,
        };
      }

      /**
       * 更新某个 DataSource 的数据，混合原始数据、新数据来更新
       *
       * @private
       * @param  {String} dataSourceKey 要更新的 DataSource key
       * @param  {Object} originDatas   等待被更新的所有 DataSource 数据
       * @param  {Object} newData       新的 DataSource 数据
       * @return undefined
       */
      updateStateWithDataSource = (
        dataSourceKey,
        originDatas,
        newData,
        requestStatus
      ) => {
        // 变成数据的请求状态
        initializeRequestStatus(originDatas[dataSourceKey], requestStatus);
        const tmpObj = {};
        if (newData) {
          if (
            Object.prototype.toString.call(originDatas[dataSourceKey]) ===
            '[object Array]'
          ) {
            tmpObj[dataSourceKey] = initializeRequestStatus(
              newData,
              requestStatus
            );
          } else {
            // Object 是一个浅拷贝操作，保留原数据的其他一级字段
            tmpObj[dataSourceKey] = initializeRequestStatus({
              ...originDatas[dataSourceKey],
              ...newData,
            });
          }
        }
        this.setState({
          ...this.state,
          ...tmpObj,
          ...requestStatus,
        });
      };

      /**
       * 传递参数更新当前 DataSource 数据
       *
       * @param  {String}   dataSourceKey      当前 DataSource 模块 dataSourceKey
       * @param  {Object}   newDataSource   更新的数据，会和默认的 Data 进行 merge 然后触发 AJAX
       * @param  {Function} callback 请求完成的回调方法
       * @return undefined
       */
      updateBindingData = (dataSourceKey, newDataSource = {}, callback) => {
        if (!dataSourceKey && typeof dataSourceKey !== 'string') {
          // eslint-disable-next-line no-console
          console.error('必须指明一个 dataSourceKey，并且值类型为 String。');
          return;
        }

        const newRequestOptions = merge(
          // 参数每次跟初始化的配置进行 merge
          requestOptions[dataSourceKey],
          newDataSource,
          mergeOption
        );

        // 如果更新时同时附带 defaultBindingData 则先同步更新一次数据，再请求更新
        // 没有 url 配置走同步修改逻辑，只修改 DataSource defaultBindingData 的数据，不进行异步请求
        if (!newRequestOptions.url) {
          if (newDataSource.defaultBindingData) {
            this.updateStateWithDataSource(
              dataSourceKey,
              defaultBindingDatas,
              newDataSource.defaultBindingData
            );
          } else {
            // eslint-disable-next-line no-console
            console.error(
              '要更新的 DataSource 必须要有一个 url 或者 defaultBindingData 配置。'
            );
          }

          return;
        }

        // 这里只需要改变模块的 __loading 属性，不涉及数据 merge
        // 因此要获取当前最新的 state 否则界面会突然切换回默认数据，然后再生效
        this.updateStateWithDataSource(
          dataSourceKey,
          this.state,
          newDataSource.defaultBindingData,
          { __loading: true }
        );

        const customSuccess = newRequestOptions.success;
        const customError = newRequestOptions.error;
        const defaultErrorCallback = () => {
          Message.error('网络问题，请稍后重试！');
        };

        opts.requestClient({
          // withCredentials: true,
          ...newRequestOptions,
        })
          // network error
          .catch((err) => {
            // eslint-disable-next-line
            const __error = {
              message: '网络问题，请稍后重试！',
            };

            this.updateStateWithDataSource(
              dataSourceKey,
              defaultBindingDatas,
              (err.response || {}).data,
              { __loading: false, __error }
            );

            if (customError) {
              customError(err.response, defaultErrorCallback, err);
            } else {
              // 如果没有自定义回调，那么就执行默认的 callback 提示
              defaultErrorCallback();
            }

            if (typeof callback === 'function') {
              callback(err.response, err);
            }
          })
          .then((res) => {
            const responseHandler = (responseData, originResponse) => {
              if (!responseData.data) {
                // eslint-disable-next-line no-console
                console.error(
                  '警告：接口必须返回一个 data 字段作为新数据！如果接口无法改动，请配置 responseFormatter 进行数据格式调整！'
                );
                responseData.data = {};
              }

              // eslint-disable-next-line
              let __error = null;

              // 兼容 status: "SUCCESS" 和 success: true 的情况
              if (responseData.status === 'SUCCESS' || responseData.success) {
                const defaultCallback = () => {
                  if (responseData.message) {
                    Message.success(responseData.message);
                  }
                };

                if (customSuccess) {
                  // 传递 defaultCallback 第二个参数是为了让用户可以在现有默认逻辑上执行其他
                  // 自定义逻辑
                  customSuccess(responseData, defaultCallback, originResponse);
                } else {
                  defaultCallback();
                }
              } else {
                __error = {
                  message: responseData.message,
                };

                const defaultCallback = () => {
                  if (responseData.message) {
                    Message.error(responseData.message);
                  }
                };

                // 这里的 success 是请求成功的意思，并不表示业务逻辑执行成功
                if (customSuccess) {
                  customSuccess(responseData, defaultCallback, originResponse);
                } else {
                  defaultCallback();
                }
              }

              // 更新数据重新渲染，不确定失败的情况下是否要更新
              // 但是失败可能需要某些状态来显示报错信息，所以保留了
              this.updateStateWithDataSource(
                dataSourceKey,
                defaultBindingDatas,
                responseData.data,
                { __loading: false, __error }
              );
            };

            userFormatterIfExist(
              newRequestOptions.responseFormatter,
              responseHandler,
              res.data,
              res
            );

            if (typeof callback === 'function') {
              callback(res.data, res);
            }
          });
      };

      getDataSource = (dataSourceKey) => {
        return sourceConfig[dataSourceKey];
      };

      render() {
        return (
          <WrappedComponent
            {...this.props}
            getDataSource={this.getDataSource}
            updateBindingData={this.updateBindingData}
            bindingData={this.state}
            updateStateWithDataSource={this.updateStateWithDataSource}
          />
        );
      }
    };
  };
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
function userFormatterIfExist(funca, funcb, responseData, originResponse) {
  if (funca) {
    funca(funcb, responseData, originResponse);
  } else {
    funcb(responseData, originResponse);
  }
}
