/* eslint-disable no-lonely-if */
import * as React from 'react';
import { useState, useEffect } from 'react';
import * as queryString from 'query-string';
// @ts-ignore
import ErrorBoundary from '$ice/ErrorBoundary';

export default ({ appConfig, wrapperPageComponent, buildConfig, context, applyRuntimeAPI, getRuntimeValue, addProvider }) => {
  const { app = {} } = appConfig;
  const { ErrorBoundaryFallback, onErrorBoundaryHandler, renderComponent, addProvider: customAddProvider } = app;

  if (customAddProvider) {
    addProvider(customAddProvider);
  }

  const { parseSearchParams = true } = app;
  if (parseSearchParams) {
    wrapperPageComponent(wrapperPageWithProps(applyRuntimeAPI));
  }

  wrapperPageComponent(process.env.__IS_SERVER__ ? wrapperPageWithSSR(context) : wrapperPageWithCSR());

  wrapperPageComponent(wrapperPageWithErrorBoundary(ErrorBoundaryFallback, onErrorBoundaryHandler));

  const enableRouter = getRuntimeValue('enableRouter');
  if (process.env.NODE_ENV !== 'production') {
    if (buildConfig.mpa) {
      if (enableRouter) {
        // MPA 启用路由
        if (renderComponent) {
          console.warn('[icejs]', '当前 MPA 页面已启用配置路由，app.renderComponent 将失效，建议移除 app.js 对应字段');
        }
        if (!appConfig.router?.routes) {
          throw new Error('当前 MPA 页面已启用配置路由但没有设置 routes 字段，请在 app.js 中引入 routes.js 并赋值给 router.routes 字段');
        }
      } else {
        // MPA 未启用路由
        if (!renderComponent) {
          throw new Error('当前 MPA 页面没有启用路由，需要结合 app.renderComponent 渲染应用，请在 app.js 中补充相关逻辑');
        }
        // TODO: appConfig.router 受 DEFAULT_APP_CONFIG 影响
        // if (appConfig.router) {
        //   console.warn('[icejs]', '当前 MPA 页面没有启用路由，router 配置失效，建议移除 app.js 对应字段');
        // }
      }
    } else {
      if (enableRouter) {
        // SPA 启用路由
        if (renderComponent) {
          console.warn('[icejs]', '当前 SPA 应用已启用配置路由，app.renderComponent 将失效，建议移除 app.js 对应字段');
        }
        if (appConfig.router?.routes) {
          // 手动配置了 routes 字段
          console.warn('[icejs]', '当前 SPA 应用手动配置了 router.routes 字段，配置路由/文件约定路由可能失效');
        }
      } else {
        // SPA 关闭路由
        if (!renderComponent) {
          throw new Error('当前 SPA 应用已通过 router: false 禁用路由，需要结合 app.renderComponent 渲染应用，请在 app.js 中补充相关逻辑');
        }
        // TODO: appConfig.router 受 DEFAULT_APP_CONFIG 影响
        // if (appConfig.router) {
        //   console.warn('[icejs]', '当前 SPA 应用已通过 router: false 禁用路由，router 配置失效，建议移除 app.js 对应字段');
        // }
      }
    }
  }
};

function wrapperPageWithProps(applyRuntimeAPI) {
  const WrapperPageFn = (PageComponent) => {
    const { pageConfig } = PageComponent;
    const PagePropsWrapper = (props) => {
      const searchParams = applyRuntimeAPI('getSearchParams');
      return <PageComponent {...Object.assign({}, props, { searchParams, pageConfig })} />;
    };
    return PagePropsWrapper;
  };
  return WrapperPageFn;
}

function wrapperPageWithErrorBoundary(ErrorBoundaryFallback, onErrorBoundaryHandler) {
  const WrapperPageFn = (PageComponent) => {
    const { pageConfig = {} } = PageComponent;
    const ErrorBoundaryWrapper = (props) => {
      if (pageConfig.errorBoundary) {
        return (
          <ErrorBoundary Fallback={ErrorBoundaryFallback} onError={onErrorBoundaryHandler}>
            <PageComponent {...props} />
          </ErrorBoundary>
        );
      }
      return <PageComponent {...props} />;
    };
    return ErrorBoundaryWrapper;
  };
  return WrapperPageFn;
}

function wrapperPageWithSSR(context) {
  const pageInitialProps = { ...context.pageInitialProps };
  const WrapperPageFn = (PageComponent) => {
    const ServerWrapper = (props) => {
      return <PageComponent {...Object.assign({}, props, pageInitialProps)} />;
    };
    return ServerWrapper;
  };
  return WrapperPageFn;
}

function wrapperPageWithCSR() {
  const wrapperPage = (PageComponent) => {
    const { pageConfig } = PageComponent;
    const { title, scrollToTop } = pageConfig || {};

    const ClientWrapper = (props) => {
      const [data, setData] = useState((window as any).__ICE_PAGE_PROPS__);
      useEffect(() => {
        if (title) {
          document.title = title;
        }

        if (scrollToTop) {
          window.scrollTo(0, 0);
        }

        // When enter the page for the first time, need to use window.__ICE_PAGE_PROPS__ as props
        // And don't need to re-request to switch routes
        // Set the data to null after use, otherwise other pages will use
        if ((window as any).__ICE_PAGE_PROPS__) {
          (window as any).__ICE_PAGE_PROPS__ = null;
        } else if (PageComponent.getInitialProps) {
          // When the server does not return data, the client calls getinitialprops
          (async () => {
            const { href, origin, pathname, search } = window.location;
            const curPath = href.replace(origin, '');
            const query = queryString.parse(search);
            const ssrError = (window as any).__ICE_SSR_ERROR__;
            const initialContext = {
              pathname,
              path: curPath,
              query,
              ssrError
            };
            const result = await PageComponent.getInitialProps(initialContext);
            setData(result);
          })();
        }
      }, []);
      return <PageComponent {...Object.assign({}, props, data)} />;
    };
    return ClientWrapper;
  };
  return wrapperPage;
}
