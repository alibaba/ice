import { Dialog, Button } from '@icedesign/base';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

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
            <Button 
              onClick={handleDownloadComponent} 
              loading={component.isDownloading}
              type="primary"
            >
              下载
            </Button>
            <Button
              disabled={component.isDownloading}
              onClick={this.dialogClose}
            >
              取消
            </Button>
          </div>
        }
      >
        <p>组件包名: {component.source && component.source.npm}</p>
        {
          component.source && component.source.version && (
            <p>组件版本: {component.source && component.source.version}</p> 
          )
        }
        <p>引用方法: {component.importStatement}</p>
      </Dialog>
    )
  }
}

export default DownloadDialog;
