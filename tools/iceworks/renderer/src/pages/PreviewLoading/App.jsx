import classnames from 'classnames';
import DocumentTitle from 'react-document-title';
import { Loading } from '@icedesign/base';
import queryString from 'query-string';
import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';

import 'rc-tooltip/assets/bootstrap.css';
import QRCode from 'qrcode.react';

import BrowserLink from '../../components/BrowserLink';
import Icon from '../../components/Icon';

class PreviewLoading extends Component {
  constructor(props) {
    super(props);
    const queryObject = queryString.parse(window.location.search);
    const isMobile = decodeURIComponent(queryObject.mobile) == 'true';
    this.state = {
      dervice: isMobile ? 'mobile' : 'desktop',
    };
  }

  componentDidMount() {
    const queryObject = queryString.parse(window.location.search);
    const isMobile = decodeURIComponent(queryObject.mobile) == 'true';
    this.webviewLoaded = false;
    if (this.webview && isMobile) {
      this.webview.addEventListener('did-finish-load', () => {
        if (!this.webviewLoaded) {
          this.webviewLoaded = true;
          this.enableDeviceEmulation({ width: 375, height: 667 }, 1);
        }
      });
    }
  }

  disableDeviceEmulation() {
    const wc = this.webview.getWebContents();
    wc.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
    );
    wc.disableDeviceEmulation();

    const isDebuggerAttached = wc.debugger.isAttached();

    if (isDebuggerAttached) {
      wc.debugger.detach();
    }

    wc.reload();
  }

  enableDeviceEmulation(size, scale = 1) {
    const wc = this.webview.getWebContents();
    wc.setUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
    );

    wc.enableDeviceEmulation({
      screenPosition: 'mobile',
      deviceScaleFactor: 0,
      screenSize: size,
      viewSize: size,
      scale: scale,
      fitToView: true,
    });

    const isDebuggerAttached = wc.debugger.isAttached();

    if (!isDebuggerAttached) {
      try {
        wc.debugger.attach();
      } catch (e) {}
    }

    wc.debugger.sendCommand('Emulation.setTouchEmulationEnabled', {
      enabled: true,
      configuration: 'mobile',
    });

    wc.reload();
  }

  changePageSize = (type) => {
    if (type !== this.state.dervice) {
      this.setState({ dervice: type }, () => {
        const dervice = this.state.dervice;
        if (dervice == 'mobile') {
          this.enableDeviceEmulation({ width: 375, height: 667 });
        } else if (dervice == 'pad') {
          this.enableDeviceEmulation({ width: 768, height: 1024 }, 0.75);
        } else {
          this.disableDeviceEmulation();
        }
      });
    }
  };

  handleDebugger = () => {
    const wc = this.webview.getWebContents();
    wc.openDevTools();
  };

  handleReload = () => {
    const wc = this.webview.getWebContents();
    wc.reload();
  };

  render() {
    const queryObject = queryString.parse(window.location.search);
    const hasIframeUrl = !!queryObject.iframeUrl;
    const iframeUrl = decodeURIComponent(queryObject.iframeUrl);

    return (
      <DocumentTitle title={hasIframeUrl ? '' : '预览启动中...'}>
        {hasIframeUrl ? (
          <div
            className={classnames({
              'previewer-wrapper': true,
              'previewer-wrapper-mobile': this.state.dervice == 'mobile',
              'previewer-wrapper-pad': this.state.dervice == 'pad',
              'previewer-wrapper-desktop': this.state.dervice == 'desktop',
            })}
          >
            <div className="previewer-header">
              <div className="previewer-switcher">
                <Tooltip
                  placement="bottomLeft"
                  overlay={
                    <div style={{ width: 200 }}>
                      <QRCode size={200} value={iframeUrl} />
                      <div style={{ wordBreak: 'break-all' }}>
                        <BrowserLink href={iframeUrl} target="_blank">
                          {iframeUrl}
                        </BrowserLink>
                      </div>
                    </div>
                  }
                >
                  <div className="previewer-tools-item">
                    <Icon size="large" type="qr-code" />
                  </div>
                </Tooltip>
              </div>
              <div className="previewer-switcher">
                <div
                  className="previewer-tools-item"
                  onClick={this.changePageSize.bind(this, 'mobile')}
                >
                  <Icon size="large" type="mobile" />
                </div>
                <div
                  className="previewer-tools-item"
                  onClick={this.changePageSize.bind(this, 'pad')}
                >
                  <Icon size="large" type="ipad" />
                </div>
                <div
                  className="previewer-tools-item"
                  onClick={this.changePageSize.bind(this, 'desktop')}
                >
                  <Icon size="large" type="pc" />
                </div>
              </div>
              <div className="previewer-debugger">
                <div
                  className="previewer-tools-item"
                  onClick={this.handleReload}
                >
                  <Icon size="large" type="reload" />
                </div>
                <div
                  className="previewer-tools-item"
                  onClick={this.handleDebugger}
                >
                  <Icon size="large" type="debug" />
                </div>
              </div>
            </div>
            <div className="previewer-body">
              <webview
                ref={(webview) => {
                  this.webview = webview;
                }}
                src={iframeUrl}
                className="previewer-content"
              />
            </div>
          </div>
        ) : (
          <div className="loading-wrapper">
            <Loading shape="fusion-reactor" size="large" color="#2077ff">
              <div style={{ width: 200, height: 60 }} />
            </Loading>
            <div style={{ paddingTop: 30 }}>正在下载区块依赖，请稍等...</div>
          </div>
        )}
      </DocumentTitle>
    );
  }
}

export default PreviewLoading;
