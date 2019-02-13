import React, { Component } from 'react';
import { Input, Grid, Select, Button, DatePicker } from '@alifd/next';

// form binder 详细用法请参见官方文档
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const { Option } = Select;

export default class Filter extends Component {
  static displayName = 'Filter';

  render() {
    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.onChange}
      >
        <div>
          <Row wrap>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>所属应用</label>
              <IceFormBinder>
                <Input name="app" />
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>分类ID</label>
              <IceFormBinder>
                <Input name="id" />
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>标签ID</label>
              <IceFormBinder>
                <Input name="tag" />
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>开始时间</label>
              <IceFormBinder
                valueFormatter={(date, strValue) => {
                  return strValue;
                }}
              >
                <DatePicker name="startTime" style={styles.filterTool} />
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>结束时间</label>
              <IceFormBinder
                valueFormatter={(date, strValue) => {
                  return strValue;
                }}
              >
                <DatePicker name="endTime" style={styles.filterTool} />
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>尺寸</label>
              <IceFormBinder>
                <Select
                  name="size"
                  placeholder="请选择"
                  style={styles.filterTool}
                >
                  <Option value="small">Small</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="large">Large</Option>
                </Select>
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>删除状态</label>
              <IceFormBinder>
                <Select name="status" style={styles.filterTool}>
                  <Option value="success">成功</Option>
                  <Option value="failed">失败</Option>
                </Select>
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>讨论ID</label>
              <IceFormBinder>
                <Input name="commentId" />
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>置顶</label>
              <IceFormBinder>
                <Select
                  name="isStick"
                  placeholder="请选择"
                  style={styles.filterTool}
                >
                  <Option value="all">不限</Option>
                  <Option value="stick">置顶</Option>
                  <Option value="not-stick">不置顶</Option>
                </Select>
              </IceFormBinder>
            </Col>
          </Row>
          <div
            style={{
              textAlign: 'left',
              marginLeft: '12px',
            }}
          >
            <Button onClick={this.props.onReset} type="normal">
              重置
            </Button>
            <Button
              onClick={this.props.onSubmit}
              type="primary"
              style={{ marginLeft: '10px' }}
            >
              确定
            </Button>
          </div>
        </div>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  filterCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },

  filterTitle: {
    width: '68px',
    textAlign: 'right',
    marginRight: '12px',
    fontSize: '14px',
  },

  filterTool: {
    width: '200px',
  },
};
