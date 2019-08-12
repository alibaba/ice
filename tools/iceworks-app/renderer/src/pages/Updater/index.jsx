/* eslint-disable react/self-closing-comp */

import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Progress } from '@alifd/next';
import isInElectron from '../../utils/isInElectron';
import '../../global.scss';
import './index.scss';

const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

const OSS_CDN_DOMAIN = 'https://iceworks.oss-cn-hangzhou.aliyuncs.com';

let ipcRenderer;
if (isInElectron) {
  const electron = window.require('electron');
  ipcRenderer = electron.ipcRenderer;
}

function Main() {
  const [state, setState] = useState({
    event: '',
    updating: false,
    log: [],
    meta: { percent: 0 },
  });

  useEffect(() => {
    ipcRenderer.on('updater-message', (e, data) => {
      const { event, meta } = data;
      if (event === 'download-progress' && meta && meta.percent > 99) {
        setState({
          ...state,
          event: 'unpack-updater',
          meta: {
            percent: 50,
          },
        });
        return;
      }

      const newState = {
        ...state,
        event,
        meta,
      };

      setState(newState);

      if (event === 'update-available' || event === 'update-not-available') {
        fetchVersionLog(newState);
      }
    });

    ipcRenderer.send('updater-checkForUpdates');

    return () => {
      ipcRenderer.removeAllListeners('message');
    };
  }, []);

  useEffect(() => {
    setUpdateWindowSize();
  });

  function onUpdaterClose() {
    ipcRenderer.send('updater-close');
  }

  function onUpdatesFound() {
    ipcRenderer.send('updater-downloadUpdate');
    setState({ ...state, updating: true });
  }

  function onUpdaterInstall() {
    ipcRenderer.send('updater-quitAndInstall');
  };

  function setUpdateWindowSize() {
    const width = document.documentElement.scrollWidth;
    const height = document.documentElement.scrollHeight;
    ipcRenderer.send('updater-setContentSize', { width, height });
  }

  function fetchVersionLog(newState) {
    const { meta } = newState;
    if (meta.version) {
      const updateLogUrl = `${OSS_CDN_DOMAIN}/changelog/${meta.version}.json`;
      axios({
        url: updateLogUrl,
        method:'get',
        timeout: 5000,
      })
        .then((res) => {
          if (res && res.data && Array.isArray(res.data.log)) {
            setState({
              ...newState,
              log: res.data.log,
            });
          }
        })
        .catch((err) => {
          console.info(err);
        });
    }
  };

  function renderUpdater() {
    const { event, meta, updating } = state;
    if (event === 'update-available') {
      return (
        <div className="updater-content">
          <div className="event-wrapper">
            检查到可用版本 ( {meta.version} )，是否更新？
          </div>
          <div className="btn-wrapper">
            <Button onClick={onUpdaterClose} size="small">
              取消
            </Button>
            <Button
              onClick={onUpdatesFound}
              loading={updating}
              size="small"
              type="primary"
            >
              确定
            </Button>
          </div>
        </div>
      );
    }

    if (event === 'update-not-available') {
      return (
        <div className="updater-content">
          <div className="event-wrapper">当前已经是最新的版本。</div>
          <div className="btn-wrapper">
            <Button
              onClick={onUpdaterClose}
              size="small"
              type="primary"
            >
              确定
            </Button>
          </div>
        </div>
      );
    }

    if (event === 'download-progress') {
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
    }

    if (event === 'unpack-updater') {
      return (
        <div className="updater-content">
          <div className="event-wrapper">正在解压更新...</div>
          <Progress showInfo={false} percent={100} size="medium" />
        </div>
      );
    }

    if (event === 'update-downloaded') {
      return (
        <div className="updater-content">
          <div className="event-wrapper">更新已完成。</div>
          <div className="btn-wrapper">
            <Button
              onClick={onUpdaterInstall}
              size="small"
              type="primary"
            >
              安装并重启应用
            </Button>
          </div>
        </div>
      );
    }

    if (event === 'error') {
      return (
        <div className="updater-content">
          <div className="event-wrapper">更新失败!</div>
          <div className="btn-wrapper">
            <Button
              onClick={onUpdaterClose}
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
  }

  function renderChangelog() {
    const { log, meta } = state;
    if (log.length) {
      return (
        <div className="changelog">
          <strong>
            {meta.version}
            {' '}更新日志
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

  return (
    <div className="main">
      {renderUpdater()}
      {renderChangelog()}
    </div>
  );
}

ReactDOM.render(<Main />, ICE_CONTAINER);