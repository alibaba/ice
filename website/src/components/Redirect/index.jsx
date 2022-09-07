import { useEffect } from 'react';

export default function Redirect(props) {
  const { location, history, redirectConfig = [] } = props;
  const { pathname } = location;

  useEffect(() => {
    const item = redirectConfig.find((item) => item.from === pathname.replace(/\/$/, ''));

    if (item) {
      history.push(item.to);
    } else {
      if (/^\/component/.test(pathname)) {
        // fusion 组件文档：/component/xxx -> /docs/fusion/about
        history.push('/docs/fusion/about');
      } else if (/^\/docs\/guide\/advance\//.test(pathname)) {
        // advance -> advanced: /docs/guide/advance/xxx -> /docs/guide/advanced/xxx
        history.push(pathname.replace('/advance/', '/advanced/'));
      } else if (/^\/docs\/materials\//.test(pathname)) {
        // 自定义物料迁移到单独站点：/docs/materials/xxx -> https://appworks.site/materials/xxx.html
        const targetUrl = `https://appworks.site/materials/${pathname.replace('/docs/materials/', '')}.html`;
        window.location.replace(targetUrl);
      } else if (/^\/docs\/icestark\//.test(pathname)) {
        // icestark 迁移到独立站点：/docs/icestark/xxx -> https://micro-frontends.ice.work/
        const targetUrl = 'https://micro-frontends.ice.work';
        window.location.replace(targetUrl);
      } else {
        console.log('未知路由', pathname);
      }
    }
  }, [location, history, pathname, redirectConfig]);

  return null;
}
