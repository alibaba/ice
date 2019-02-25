import React, { Component } from 'react';
import { Button } from '@icedesign/base';
import { inject, observer } from 'mobx-react';
import electron from 'electron';
import Tooltip from 'rc-tooltip';

import { isIceMaterial } from '../../lib/utils';
import services from '../../services';
import Icon from '../../components/Icon';

const { interaction } = services;

import './item.scss';

const shell = electron.shell;
const clipboard = electron.clipboard;

@inject('projects', 'component')
@observer
class Item extends Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  download = () => {
    const { data, download } = this.props;
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
    const { iceVersion } = projects.currentProject;
    const isAlibaba = services.settings.get('isAlibaba');
    let url = 'https://github.com/alibaba/ice', preUrl;
    if (data.source) {
      const {npm, version} = data.source;
      if (isAlibaba || data.source.npm.includes('@ali/')) {
        preUrl = "https://unpkg.alibaba-inc.com/";
      } else {
        preUrl = "https://unpkg.com/";
      }
      url = `${preUrl}${npm}@${version}/build/index.html`;
    } else  {
      // 没有source字段但是属于飞冰物料源，则判断是 飞冰基础组件
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
                overlay={'已下载'}
              >
                <Icon type="yixiazai" />
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
                引用复制
              </Button>
            ) : (
              <Button 
                size="small" 
                onClick={this.download} 
                type="primary">
                下载
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
