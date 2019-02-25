import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@icedesign/base';

import ExtraButton from '../ExtraButton/';
import Icon from '../Icon';
import terms from '../../terms';

import './index.scss';

class ProjectTerminal extends Component {
  static propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    closeLogs: PropTypes.func,
    shwoClose: PropTypes.bool
  };

  static defaultProps = {
    id: 'terminal',
    style: {},
    closeLogs: () => {},
    shwoClose: true
  };

  constructor(props) {
    super(props);

    this.state = {
      path: props.project.fullPath,
    };
  }

  clearLogs = () => {
    terms.getTerm(this.state.path).clear();
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
    const { id } = this.props;
    const terminalContainer = document.getElementById(id);
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
    const { id } = this.props;
    const container = document.getElementById(id);
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
    const { style, id, closeLogs, shwoClose } = this.props;
    return (
      <div
        className="project-terminal-wrapper"
        style={{ 
          zIndex: this.props.visible ? '0' : '-1',
          ...style
        }}
      >
        <div className="buttons">
          <ExtraButton
            onClick={this.clearLogs}
            tipText={'清空当前日志'}
            style={{ color: '#eee', marginRight: 10 }}
          >
            <Icon type="clear" size="small" />
          </ExtraButton>
          {
            shwoClose && (
              <Button
                type="dark" shape="ghost"
                onClick={closeLogs}
              >
                返回工作台
              </Button>
              // <ExtraButton
              //   onClick={closeLogs}
              //   tipText={'关闭日志面板'}
              //   style={{ color: '#eee' }}
              // >
              //   <Icon type="close" />
              // </ExtraButton>
            )
          }
        </div>
        <div id={id} className="project-terminal" />
      </div>
    );
  }
}

export default ProjectTerminal;
