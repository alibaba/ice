import React, { Component } from 'react';

import ExtraButton from '../../../components/ExtraButton/';
import Icon from '../../../components/Icon';
import terms from '../../../terms';

import './index.scss';

class ProjectTerminal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: props.project.fullPath,
    };
  }

  clearLogs = () => {
    terms.getTerm(this.state.path).clear();
  };

  closeLogs = () => {
    this.props.project.toggleTerminal();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.project.fullPath !== this.state.path) {
      this.setState({ path: nextProps.project.fullPath }, () => {
        this.createTerm();
      });
    }
  }

  componentDidMount() {
    this.createTerm();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillMount() {
    window.removeEventListener('resize', this.handleResize);
  }

  createTerm() {
    const terminalContainer = document.getElementById('terminal');
    terminalContainer.innerHTML = '';
    terms.new(this.state.path, terminalContainer);
  }

  handleResize = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setTerminalSize();
    }, 1000 / 30);
  };

  setTerminalSize() {
    const container = document.getElementById('terminal');
    if(!container){
      return null;
    }
    const { width, height } = container.getBoundingClientRect();
    const charMeasure = terms.getTerm(this.state.path).charMeasure;
    const cols = Math.floor(width / (charMeasure.width || 9.015625));
    const rows = Math.floor(height / 21);
    terms.resize(this.state.path, cols, rows);
  }

  render() {
    return (
      <div
        className="project-terminal-wrapper"
        style={{ zIndex: this.props.visible ? '0' : '-1' }}
      >
        <div className="buttons">
          <ExtraButton
            onClick={this.clearLogs}
            tipText={'清空当前日志'}
            style={{ color: '#eee' }}
          >
            <Icon type="clear" size="small" />
          </ExtraButton>
          <ExtraButton
            onClick={this.closeLogs}
            tipText={'关闭日志面板'}
            style={{ color: '#eee' }}
          >
            <Icon type="close" />
          </ExtraButton>
        </div>
        <div id="terminal" className="project-terminal" />
      </div>
    );
  }
}

export default ProjectTerminal;
