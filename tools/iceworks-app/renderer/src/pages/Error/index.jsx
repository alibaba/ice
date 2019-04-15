import { remote, shell } from 'electron';
import ansiHtml from 'ansi-html';
import PrettyError from 'pretty-error';
import React, { Component } from 'react';
import stripAnsi from 'strip-ansi';

const pe = new PrettyError();

class index extends Component {
  report = () => {
    const error = this.props.error;

    const errorMsg = pe.render(error);
    const url = `https://github.com/alibaba/ice/issues/new?labels=iceworks&title=Iceworks 启动错误&assignee=noyobo&body=- version: ${remote.app.getVersion()}\n- platform: ${
      remote.process.platform
    }\n- error: \n\`\`\`\n${stripAnsi(errorMsg)}\n\`\`\``;

    shell.openExternal(encodeURI(url));
  };

  render() {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            padding: 40,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flex: '0 0 210px',
          }}
        >
          <img
            src={require('../../static/500.png')}
            style={{ height: 130, width: 130 }}
          />
          <div style={{ paddingLeft: 30 }}>
            <h1 style={{ margin: 0 }}>Sorry! </h1>
            <div>
              发生了未知的错误! 可以点击{' '}
              <a href="javascript:void(0);" onClick={this.report}>
                提交问题
              </a>{' '}
              反馈给我们，谢谢。
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: '#010100',
            padding: '10px 0',
            flex: 'auto',
            overflow: 'auto',
          }}
        >
          <pre
            dangerouslySetInnerHTML={{
              __html: ansiHtml(pe.render(this.props.error)),
            }}
          />
        </div>
      </div>
    );
  }
}

export default index;
