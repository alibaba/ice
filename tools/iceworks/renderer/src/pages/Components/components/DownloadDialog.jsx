import { Dialog, Button, Balloon } from '@icedesign/base';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Progress from '../../../components/Progress';


@inject('component')
@observer
class DownloadDialog extends Component {
  static displayName = 'DownloadDialog';

  static propTypes = {
    handleDownloadComponent: PropTypes.func,
  };

  static defaultProps = {
    handleDownloadComponent: () => {},
  };

  dialogClose = () => {
    this.props.component.close();
  }

  render() {
    const { component, handleDownloadComponent } = this.props;
    const { currentComponent } = component;
    return (
      <Dialog
        title='组件下载'
        visible={component.visible}
        onClose={this.dialogClose}
        style={{
          width: '500px',
          height: '306px',
        }}
        footerAlign="center"
        footer={
          <div >
            <Balloon
              trigger={
                <Button 
                  onClick={handleDownloadComponent} 
                  loading={component.isDownloading}
                  type="primary"
                >
                  下载
                </Button>
              }
              align="t"
              alignment="normal"
              triggerType="hover"
              style={{ width: 350, height: 85 }}
              visible={component.isDownloading}
            >
              <div>
                <Progress
                  styleOffset={[-350, 0]}
                />
              </div>
            </Balloon>
            <Button
              disabled={component.isDownloading}
              onClick={this.dialogClose}
            >
              取消
            </Button>
          </div>
        }
      >
        <p>组件包名: {currentComponent.source && currentComponent.source.npm}</p>
        {
          currentComponent.source && currentComponent.source.version && (
            <p>组件版本: {currentComponent.source && currentComponent.source.version}</p> 
          )
        }
        <p>引用方法: {currentComponent.importStatement}</p>
      </Dialog>
    )
  }
}

export default DownloadDialog;
