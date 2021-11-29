import * as React from 'react';
import { useState, useEffect } from 'react';
import * as queryString from 'query-string';
// @ts-ignore
import ErrorBoundary from '$ice/ErrorBoundary';

export default ({ appConfig, wrapperPageComponent, buildConfig, context, applyRuntimeAPI, addProvider }) => {
  const { app = {}, addProvider: customAddProvider } = appConfig;
  const { ErrorBoundaryFallback, onErrorBoundaryHandler, renderComponent } = app;

  if (customAddProvider) {
    addProvider(customAddProvider);
  }

  // MPA 下当前页面下是否有 routes 文件：routes.js / app.json
  // TODO: 这个信息怎么取？this.modifyRoutesRegistration.length > 0 时机不对好像
  const hasPageRoutesFile = false;
  if (buildConfig.mpa && !hasPageRoutesFile) {
    if (appConfig.router || !renderComponent) {
      console.warn('[icejs]', '当前页面下没有 routes.[j|t]s 文件，路由功能已关闭');
      console.warn('    ', '1. 定义  ');
      console.warn('    ', '2. ');
    }
  }

  if (!buildConfig.mpa && buildConfig.router === false) {
    if (!renderComponent) {
      throw new Error('已通过 router: false 禁用路由，需要结合 app.renderComponent 渲染应用，请在 src/app 中补充相关逻辑');
    }
    // TODO: appConfig.router 受 DEFAULT_APP_CONFIG 影响
    if (appConfig.router) {
      console.warn('[icejs]', '已通过 router: false 禁用路由，src/app router 配置失效，建议删除对应字段。');
    }
  }

  const { parseSearchParams = true } = app;
  if (parseSearchParams) {
    wrapperPageComponent(wrapperPageWithSearchParams(applyRuntimeAPI));
  }

  wrapperPageComponent(process.env.__IS_SERVER__ ? wrapperPageWithSSR(context) : wrapperPageWithCSR());

  wrapperPageComponent(wrapperPageWithErrorBoundary(ErrorBoundaryFallback, onErrorBoundaryHandler));

  // setRenderApp();
};

function wrapperPageWithSearchParams(applyRuntimeAPI) {
  const WrapperPageFn = (PageComponent) => {
    const SearchParamsWrapper = (props) => {
      const searchParams = applyRuntimeAPI('getSearchParams');
      return <PageComponent {...Object.assign({}, props, { searchParams })} />;
    };
    return SearchParamsWrapper;
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
