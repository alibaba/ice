

import React, { Component } from 'react';
import IceCard from '@icedesign/card';
import Monaco from 'react-monaco-editor';
import 'regenerator-runtime/runtime';
import './MonacoEditor.scss';

function getScript(uri) {
  return new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.type = 'text/javascript';
    const head = document.head ||
      document.head.getElementsByTagName('head')[0];
    el.onerror = function onerror(e) {
      reject(new URIError(`${uri} could not be loaded`), e);
    };
    el.onload = function onload(e) {
      resolve({ uri, event: e });
    };
    head.appendChild(el);
    el.src = uri;
  });
}

export default class MonacoEditor extends Component {
  static displayName = 'MonacoEditor';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      monacoReady: false,
    };
  }

  // ICE: React Component 的生命周期

  async componentWillMount() {
    const vsBasePath = '//unpkg.com/monaco-editor@0.10.1/min/vs';

    await getScript(`${vsBasePath}/loader.js`);
    const monacoRequire = window.require;
    monacoRequire.config({ paths: { vs: vsBasePath } });
    // monaco editor 的跨域解决方案：https://github.com/Microsoft/monaco-editor#integrate-cross-domain
    window.MonacoEnvironment = {
      getWorkerUrl() {
        return '/monaco-editor-worker-loader-proxy.js';
      },
    };
    monacoRequire(['vs/editor/editor.main'], () => {
      this.setState({
        monacoReady: true,
      });
    });
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  onChange = (newValue, e) => {
    console.log('onChange', newValue, e);
  };
  editorDidMount = (editor) => {
    console.log('editorDidMount', editor);
    editor.focus();
  };

  render() {
    const code = `console.log('hello world');

function foo() {
  // hello world
}
`;
    const options = {
      selectOnLineNumbers: true,
    };
    const { monacoReady } = this.state;

    return (
      <div className="monaco-editor-container" style={styles.monacoEditorContainer}>
        <IceCard style={styles.container}>
          {
            monacoReady ? <Monaco
              height="600"
              language="javascript"
              theme="vs-dark"
              value={code}
              options={options}
              onChange={this.onChange}
              editorDidMount={this.editorDidMount}
            /> : 'loading...'
          }
        </IceCard>
      </div>
    );
  }
}

const styles = {
  container: { overflow: 'hidden', position: 'relative' },
  monacoEditorContainer: {},
};
