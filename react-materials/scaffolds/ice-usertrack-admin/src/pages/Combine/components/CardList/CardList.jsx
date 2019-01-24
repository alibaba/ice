import React, { Component } from 'react';
import { Icon, Grid, Balloon, Dialog } from '@alifd/next';
import FoundationSymbol from '@icedesign/foundation-symbol';
import { withRouter } from 'react-router-dom';

const { Row, Col } = Grid;

const getData = () => {
  return Array.from({ length: 11 }).map((item, index) => {
    return {
      title: `淘宝首页-P${index}`,
      creator: '张明',
      modifier: '淘小宝',
      scheme: index,
      track: index,
      createTime: '2018-08-10',
      updateTime: '2018-08-31',
    };
  });
};

@withRouter
export default class CardList extends Component {
  handleAdd = () => {
    Dialog.confirm({
      content: '只有管理员才能新增测试方案',
    });
  };

  handleEdit = () => {
    this.props.history.push('/application/edit');
  };

  render() {
    const data = getData();
    return (
      <div style={styles.container}>
        <Row wrap gutter="20">
          <Col l="6" onClick={this.handleAdd}>
            <div style={{ ...styles.card, ...styles.createScheme }}>
              <Icon type="add" style={styles.addIcon} />
              <span>新增埋点</span>
            </div>
          </Col>
          {data.map((item, index) => {
            return (
              <Col l="6" key={index}>
                <div style={styles.card}>
                  <div style={styles.head}>
                    <h4 style={styles.title}>{item.title}</h4>
                    <Balloon
                      trigger={
                        <FoundationSymbol
                          size="small"
                          type="eye"
                          style={{ ...styles.eyeIcon, ...styles.icon }}
                        />
                      }
                      align="t"
                      closable={false}
                      triggerType="hover"
                      style={{ width: 80 }}
                    >
                      监控
                    </Balloon>

                    <Balloon
                      trigger={
                        <FoundationSymbol
                          size="small"
                          type="edit2"
                          onClick={this.handleEdit}
                          style={{ ...styles.editIcon, ...styles.icon }}
                        />
                      }
                      align="t"
                      closable={false}
                      triggerType="hover"
                      style={{ width: 80 }}
                    >
                      编辑
                    </Balloon>
                  </div>
                  <div style={styles.body}>
                    <Row wrap>
                      <Col l="12">
                        <p style={{ ...styles.scheme, ...styles.info }}>
                          集成方案 <strong>{item.scheme}</strong> 个
                        </p>
                      </Col>
                      <Col l="12">
                        <p style={{ ...styles.track, ...styles.info }}>
                          共 <strong>{item.track}</strong> 个埋点
                        </p>
                      </Col>
                      <Col l="12">
                        <p style={{ ...styles.creator, ...styles.info }}>
                          创建人：
                          {item.creator}
                        </p>
                      </Col>
                      <Col l="12">
                        <p style={{ ...styles.modifier, ...styles.info }}>
                          修改人：
                          {item.modifier}
                        </p>
                      </Col>
                    </Row>

                    <p style={{ ...styles.time, ...styles.info }}>
                      创建日期：
                      {item.createTime}
                    </p>
                    <p style={{ ...styles.time, ...styles.info }}>
                      修改日期：
                      {item.updateTime}
                    </p>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '20px',
  },
  createScheme: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '190px',
    cursor: 'pointer',
  },
  card: {
    displayName: 'flex',
    marginBottom: '20px',
    background: '#fff',
    borderRadius: '6px',
  },
  head: {
    position: 'relative',
    padding: '16px 16px 8px',
    borderBottom: '1px solid #e9e9e9',
  },
  title: {
    margin: '0 0 5px',
    width: '90%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '16px',
    fontWeight: '500',
    color: 'rgba(0,0,0,.85)',
  },
  desc: {
    margin: '0',
    fontSize: '14px',
  },
  body: {
    position: 'relative',
    padding: '16px',
  },
  info: {
    margin: '0 0 8px',
    fontSize: '13px',
  },
  time: {
    position: 'relative',
  },
  eyeIcon: {
    right: '48px',
    top: '20px',
  },
  addIcon: {
    marginRight: '10px',
  },
  editIcon: {
    right: '17px',
    top: '20px',
  },
  icon: {
    position: 'absolute',
    cursor: 'pointer',
    fontSize: '12px',
  },
};
