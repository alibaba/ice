import React, { Component } from 'react';
import dialog from '../dialog';
import services from '../../services';

const { settings } = services;
const currentRegistry = settings.get('registry');
const isAlibaba = settings.get('isAlibaba');
const taobaoRegistry = 'https://registry.npm.taobao.org';

class RegistryNotice extends Component {
  isTaobaoRegistry = () => {
    if (currentRegistry.includes('taobao')) {
      return true;
    }
    return false;
  };

  settingRegistry = () => {
    settings.set('registry', taobaoRegistry);
    settings.set('checkedRegistry', true);
  };

  handleCancel = () => {
    settings.set('checkedRegistry', true);
  };

  render() {
    const checked = settings.get('checkedRegistry');

    return (
      <div className="setting-registy-dialog">
        {!this.isTaobaoRegistry() && !checked && !isAlibaba
          ? dialog.confirm(
              {
                title: '提示',
                content:
                  '检测到当前下载源不是淘宝源，建议切换到 npm 淘宝镜像源，下载体验更加。',
              },
              (ok) => {
                if (ok) {
                  this.settingRegistry();
                } else {
                  this.handleCancel();
                }
              }
            )
          : null}
      </div>
    );
  }
}

export default RegistryNotice;
