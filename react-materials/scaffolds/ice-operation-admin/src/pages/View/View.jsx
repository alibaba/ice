/**
 * 行业级设备模型查看页
 */
import React, { Component } from 'react';
import { Table, Dialog, Breadcrumb } from '@alifd/next';
import FormView from '../../components/FormView';
import {
  formConfig,
  mockFormData,
  mockTableData,
  dialogFormConfig,
} from './data';
import styles from './index.module.scss';

const { Column } = Table;

class DeviceModelView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      formData: mockFormData,
      tableData: mockTableData,
      dialogData: {},
    };
  }

  onClickView = (value) => {
    this.setState({
      visible: true,
      dialogData: value,
    });
  };

  onOk = () => {
    this.setState({
      visible: false,
    });
  };

  onCancel = () => {
    this.setState({
      visible: false,
    });
  };

  renderStatus = (value, index, record) => {
    const view = (
      <a href="javascrpt:void(0)" onClick={this.onClickView.bind(this, record)}>
        查看
      </a>
    );
    return <div>{view}</div>;
  };

  render() {
    const { formData, tableData, visible, dialogData } = this.state;
    return (
      <div className={styles.container}>
        <Dialog
          visible={visible}
          title="查看详情"
          footer={false}
          onOk={this.onOk}
          onCancel={this.onCancel}
          onClose={this.onCancel}
          style={{
            width: '400px',
          }}
        >
          <FormView
            colspanType={[[6, 18]]}
            data={dialogData}
            config={dialogFormConfig}
          />
        </Dialog>
        <Breadcrumb className={styles.Breadcrumb}>
          <Breadcrumb.Item link="/">型号管理</Breadcrumb.Item>
          <Breadcrumb.Item>查看详情</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.content}>
          <h2 className={styles.headTitle}>基础信息</h2>
          <div className={styles.section}>
            <FormView config={formConfig} data={formData} />
          </div>
          <h2 className={styles.headTitle}>基础列表信息</h2>
          <div className={styles.section}>
            <Table hasBorder={false} dataSource={tableData}>
              <Column title="类型" dataIndex="typeName" />
              <Column title="名称" dataIndex="name" />
              <Column title="标识符" dataIndex="identifier" />
              <Column title="描述" dataIndex="desc" />
              <Column title="操作" cell={this.renderStatus} width={200} />
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default DeviceModelView;
