import React from 'react';
import { Balloon } from '@icedesign/base';
import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import Menu from '@icedesign/menu';
import AwesomeIcon from '@icedesign/awesome-icon';
import { Link } from 'react-router';
import { headerNavs } from './__navs__';
import Logo from './__components_Logo__';

export default ({ width, theme }) => {
  return (
    <Layout.Header
      theme={theme}
      className="ice-design-layout-header"
      style={{ width }}
    >
      <Logo />
      <div className="ice-design-layout-header-menu" style={{ display: 'flex' }}>
        {/* Header 菜单项 begin */}
        {headerNavs && headerNavs.length > 0 ? (
          <Menu mode="horizontal" selectedKeys={[]}>
            {headerNavs.map((nav, idx) => {
              const linkProps = {};
              if (nav.newWindow) {
                linkProps.href = nav.to;
                linkProps.target = '_blank';
              } else if (nav.external) {
                linkProps.href = nav.to;
              } else {
                linkProps.to = nav.to;
              }
              return (
                <Menu.Item key={idx}>
                  <Link {...linkProps}>
                    {nav.icon ? (
                      <AwesomeIcon type={nav.icon} size="small" />
                    ) : null}
                    {nav.text}
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu>
        ) : null}
        {/* Header 菜单项 end */}

        {/* Header 右侧内容块 */}

        <Balloon
          trigger={
            <span
              className="ice-design-layout-header-userpannel"
              style={{
                marginLeft: 20,
                display: 'flex',
                alignItems: 'center',
                fontSize: 12,
              }}
            >
              <IceImg
                height={40}
                width={40}
                src="https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png"
                style={{ marginRight: '12px', borderRadius: 8 }}
              />
              <span className="ice-design-layout-header-username">淘小宝</span>
              <AwesomeIcon type="down" size="xs" className="icon-down" />
            </span>
          }
          closable={false}
          triggerType="click"
          className="balloon-container"
        >
          <ul className="balloon-content">
            <li className="balloon-item">
              <Link to="/">
                <AwesomeIcon type="person" size="small" />我的主页
              </Link>
            </li>
            <li className="balloon-item">
              <Link to="/">
                <AwesomeIcon type="repair" size="small" />设置
              </Link>
            </li>
            <li className="balloon-item">
              <Link to="/">
                <AwesomeIcon type="compass" size="small" />退出
              </Link>
            </li>
          </ul>
        </Balloon>
      </div>
    </Layout.Header>
  );
};
