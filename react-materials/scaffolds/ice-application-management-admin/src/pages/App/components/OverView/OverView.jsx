import React, { Component } from 'react';
import { Grid, Icon } from '@alifd/next';
import IceContainer from '@icedesign/container';
import './OverView.scss';

const { Row, Col } = Grid;
export default class History extends Component {
  static displayName = 'History';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer title="资源概览">
        <Row wrap gutter="20">
          <Col l="5">
            <div className="box">
              <div className="box-title">
                <span className="box-icon">
                  <Icon className="icon" type="upload" size="xs" />
                </span>
                <span>线上主机</span>
              </div>
              <div className="box-content">
                <div>
                  <span className="box-value">72</span>
                  <span className="box-label">台</span>
                </div>
                <div className="box-key">DOCKER</div>
              </div>
            </div>
          </Col>
          <Col l="8">
            <div className="box">
              <div className="box-title">
                <span
                  className="box-icon"
                  style={{ backgroundColor: '#ec7a0e' }}
                >
                  <Icon className="icon" type="download" size="xs" />
                </span>
                <span>主机预算</span>
              </div>
              <div className="box-list">
                <div className="box-content">
                  <div>
                    <span className="box-value">100</span>
                    <span className="box-label">台</span>
                  </div>
                  <div className="box-key">总预算</div>
                </div>
                <div className="box-content">
                  <div>
                    <span className="box-value">72</span>
                    <span className="box-label">台</span>
                  </div>
                  <div className="box-key">已用</div>
                </div>
                <div className="box-content">
                  <div>
                    <span className="box-value">28</span>
                    <span className="box-label">台</span>
                  </div>
                  <div className="box-key">剩余</div>
                </div>
              </div>
            </div>
          </Col>
          <Col l="5">
            <div className="box">
              <div className="box-title">
                <span
                  className="box-icon"
                  style={{ backgroundColor: '#5485F7' }}
                >
                  <Icon className="icon" type="refresh" size="xs" />
                </span>
                <span>应用基线</span>
              </div>
              <div className="box-content">
                <div>
                  <span className="box-value">4核 8G 60G</span>
                </div>
                <div className="box-key">机型</div>
              </div>
            </div>
          </Col>
          <Col l="6">
            <div className="box">
              <div className="box-title">
                <span
                  className="box-icon"
                  style={{ backgroundColor: '#f7da47' }}
                >
                  <Icon className="icon" type="attachment" size="xs" />
                </span>
                <span>负载均衡</span>
              </div>
              <div className="box-list">
                <div className="box-content">
                  <div>
                    <span className="box-value">0</span>
                    <span className="box-label">个</span>
                  </div>
                  <div className="box-key">Load Balancer 01</div>
                </div>
                <div className="box-content">
                  <div>
                    <span className="box-value">11</span>
                    <span className="box-label">个</span>
                  </div>
                  <div className="box-key">Load Balancer 02</div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </IceContainer>
    );
  }
}
