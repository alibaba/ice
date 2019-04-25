import React, { Component } from 'react';
import { Button } from '@icedesign/base';
import { inject, observer } from 'mobx-react';
import { shell, clipboard } from 'electron';
import Tooltip from 'rc-tooltip';

import { isIceMaterial } from '../../lib/utils';
import services from '../../services';
import Icon from '../../components/Icon';
import dialog from '../../components/dialog';

const { interaction } = services;

import './item.scss';

@inject('projects', 'component')
@observer
class Item extends Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  download = () => {
    const { data, download, component, projects } = this.props;
    const { currentProject } = projects;
    if (!currentProject) {
      dialog.alert({
        title: '提示',
        content: (
          <div> 请先新建项目 </div>
        )
      });
      return;
    }
    component.currentComponent = data;
    download(data);
  }

  import = () => {
    const { data } = this.props;
    clipboard.writeText(data.importStatement || '');
    interaction.notify({
      title: '复制成功，请到对应的文件黏贴引入',
      body: `引用方法：${data.importStatement}`,
      type: 'success',
    });
  }

  openInBrowser = () => {
    // https://github.com/alibaba/ice/issues/219
    // sometimes data is not trustable
    // make sure url is a valid URL any time
    const { data = {}, material, projects } = this.props;
    const { currentProject } = projects;
    const iceVersion = currentProject ? currentProject.iceVersion : '1.x';
    const isAlibaba = services.settings.get('isAlibaba');
    let url = 'https://github.com/alibaba/ice';
    let preUrl;
    if (data.homepage) {
      url = data.homepage;
    } else  {
      // 没有homepage字段但是属于飞冰物料源，则判断是 飞冰基础组件
      if(isIceMaterial(material.source)) {
        preUrl = iceVersion === '0.x' ?
          "https://alibaba.github.io/ice/0.x/component/" :
          "https://alibaba.github.io/ice/component/";
        url = preUrl + data.name.toLocaleLowerCase();
      }
    }

    shell.openExternal(url);
  };

  render() {

    const { data } = this.props;

    return (
      <div className="component-card" onClick={this.handleClick}>
        <h2 className="component-card-title">{data.title}</h2>
        <div className="component-card-name">{data.name}</div>
        {
          data.isDownloaded && (
            <div className="component-downloaded">
              <Tooltip
                placement={'top'}
                overlay={'当前项目已依赖'}
              >
                <Icon type="yixiazai" style={{color: 'rgb(48, 128, 254)'}} />
              </Tooltip>
            </div>
          )
        }
        <div  className="component-card-opts">
          <div  className="component-card-opt">
          {
            data.isDownloaded ? (
              <Button
                size="small"
                onClick={this.import}
                type="primary">
                复制引入代码
              </Button>
            ) : (
              <Button
                size="small"
                onClick={this.download}
                type="primary">
                安装
              </Button>
            )
          }
            &nbsp;&nbsp;
            <Button size="small" onClick={this.openInBrowser} type="normal">
              文档
            </Button>
          </div>
        </div>

      </div>
    )
  }
}

export default Item;
