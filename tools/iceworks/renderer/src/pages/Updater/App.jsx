/* eslint no-undef:0 */
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { ipcRenderer, remote } from 'electron';
import semver from 'semver';
import { Button, Progress } from '@icedesign/base';
import requestMaterial from '../../lib/request-material';
import logger from '../../lib/logger';
import services from '../../services';

// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/reset.scss';
import './App.scss';

const { settings } = services;
const OSS_CDN_DOMAIN = __OSS_CDN_DOMAIN__;

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
          event,
          meta,
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
    this.checkRaxMaterials();

    ipcRenderer.send('app-quit-install');
    ipcRenderer.send('updater-install');
  };

  /**
   * 2.19.0 版本删除小程序的物料源，旧版本升级会进行检查并删除
   */
  checkRaxMaterials = () => {
    const { meta = {} } = this.state;
    const materials = settings.get('materials');
    const APP_VERSION = remote.app.getVersion();
    const CHECK_VERSION = '2.19.0';

    if (
      semver.lt(APP_VERSION, CHECK_VERSION)
      && semver.gte(meta.version, CHECK_VERSION)
    ) {
      if (materials && materials.length) {
        settings.set(
          'materials',
          materials.filter((material) => {
            if (['rax'].includes(material.key) && material.builtIn) {
              return false;
            }
            return true;
          })
        );
      }
    }
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
            logger.info(res);
          }
        })
        .catch((err) => {
          logger.info(err);
        });
    }
  };

  renderUpdater = () => {
    const { event, meta } = this.state;
    if (event === 'update-available') {
      return (
        <div className="updater-content">
          <div className="event-wrapper">
            检查到可用版本 (
            {meta.version}
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
    } if (event === 'update-not-available') {
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
    } if (event === 'download-progress') {
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
    } if (event === 'unpack-updater') {
      return (
        <div className="updater-content">
          <div className="event-wrapper">正在解压更新...</div>
          <Progress showInfo={false} percent={100} size="medium" />
        </div>
      );
    } if (event === 'update-downloaded') {
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
    } if (event === 'error') {
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
    }
    return (
      <div className="updater-content">
        <div className="event-wrapper">正在检查更新...</div>
      </div>
    );
  };

  renderChangelog = () => {
    const { log, meta } = this.state;
    if (log.length) {
      return (
        <div className="changelog">
          <strong>
            {meta.version}
            {' '}
更新日志
          </strong>
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
