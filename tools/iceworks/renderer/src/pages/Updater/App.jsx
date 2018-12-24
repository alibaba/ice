import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import { Button, Progress } from '@icedesign/base';
import requestMaterial from '../../lib/request-material';
import { hot } from 'react-hot-loader';

const OSS_CDN_DOMAIN = __OSS_CDN_DOMAIN__;

// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/reset.scss';
import './App.scss';

class Updater extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: 'init',
      updating: false,
      log: [],
      meta: {
        percent: 0,
      },
    };
  }

  componentDidMount() {
    ipcRenderer.on('updater-message', (e, data) => {
      const { event, meta } = data;
      if (event === 'download-progress' && meta && meta.percent > 99) {
        this.setState({
          event: 'unpack-updater',
          meta: {
            percent: 50,
          },
        });
      } else {
        // 存在可用更新
        if (event === 'update-available' || event === 'update-not-available') {
          this.fetchVersionLog(meta);
        }
        this.setState({
          event: event,
          meta: meta,
        });
      }
    });

    ipcRenderer.send('updater-check');
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners('message');
  }

  componentDidUpdate() {
    // 更新视图窗口大小

    this.setUpdateWindowSize();
  }

  setUpdateWindowSize() {
    const width = document.documentElement.scrollWidth;
    const height = document.documentElement.scrollHeight;
    ipcRenderer.send('set-updater-window-size', { width, height });
  }

  handleUpdatesFound = () => {
    // 开始更新
    ipcRenderer.send('updater-start');
    this.setState({ updating: true });
  };

  handleUpdaterClose = () => {
    ipcRenderer.send('updater-close');
  };

  handleUpdaterInstall = () => {
    ipcRenderer.send('app-quit-install');
    ipcRenderer.send('updater-install');
  };

  fetchVersionLog = (meta) => {
    if (meta.version) {
      const updateLogUrl = `${OSS_CDN_DOMAIN}/changelog/${meta.version}.json`;
      requestMaterial(updateLogUrl)
        .then((res) => {
          if (typeof res === 'object') {
            if (Array.isArray(res.log)) {
              this.setState({
                log: res.log,
              });
            }
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  renderUpdater = () => {
    const { event, meta } = this.state;
    if (event == 'update-available') {
      return (
        <div className="updater-content">
          <div className="event-wrapper">
            检查到可用版本 ({meta.version}
            )，是否更新？
          </div>
          <div className="btn-wrapper">
            <Button onClick={this.handleUpdaterClose} size="small">
              取消
            </Button>
            <Button
              onClick={this.handleUpdatesFound}
              loading={this.state.updating}
              size="small"
              type="primary"
            >
              确定
            </Button>
          </div>
        </div>
      );
    } else if (event == 'update-not-available') {
      return (
        <div className="updater-content">
          <div className="event-wrapper">当前已经是最新的版本。</div>
          <div className="btn-wrapper">
            <Button
              onClick={this.handleUpdaterClose}
              size="small"
              type="primary"
            >
              确定
            </Button>
          </div>
        </div>
      );
    } else if (event == 'download-progress') {
      return (
        <div className="updater-content">
          <div className="event-wrapper">正在下载更新...</div>
          <Progress
            showInfo={false}
            percent={parseInt(meta.percent, 10)}
            size="medium"
          />
        </div>
      );
    } else if (event == 'unpack-updater') {
      return (
        <div className="updater-content">
          <div className="event-wrapper">正在解压更新...</div>
          <Progress showInfo={false} percent={100} size="medium" />
        </div>
      );
    } else if (event == 'update-downloaded') {
      return (
        <div className="updater-content">
          <div className="event-wrapper">更新已完成。</div>
          <div className="btn-wrapper">
            <Button
              onClick={this.handleUpdaterInstall}
              size="small"
              type="primary"
            >
              安装并重启应用
            </Button>
          </div>
        </div>
      );
    } else if (event == 'error') {
      return (
        <div className="updater-content">
          <div className="event-wrapper">更新失败!</div>
          <div className="btn-wrapper">
            <Button
              onClick={this.handleUpdaterClose}
              size="small"
              type="primary"
            >
              确定
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="updater-content">
          <div className="event-wrapper">正在检查更新...</div>
        </div>
      );
    }
  };

  renderChangelog = () => {
    const { log, meta } = this.state;
    if (log.length) {
      return (
        <div className="changelog">
          <strong>{meta.version} 更新日志</strong>
          <ul>
            {log.map((text, index) => {
              return (
                <li
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: text,
                  }}
                />
              );
            })}
          </ul>
        </div>
      );
    }
    return null;
  };

  render() {
    return (
      <div className="container">
        {this.renderUpdater()}
        {this.renderChangelog()}
      </div>
    );
  }
}

export default hot(module)(Updater);
