/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Icon } from '@alifd/next';
import cloneDeep from 'lodash.clonedeep';
import CustomForm from '../CustomForm';

export default class SearchFilter extends Component {
  static displayName = 'SearchFilter';

  static propTypes = {};

  static defaultProps = {};

  initFields = {
    base: {
      id: '',
      archiveId: '',
      applyCode: '',
      name: '',
      otherCompany: '',
      principal: '',
    },
    advanced: {
      createTime: [],
      signTime: [],
      endTime: [],
      state: '',
      type: '',
      checkbox: 'false',
    },
  };

  state = {
    showAdvancedFields: false,
    value: cloneDeep(this.initFields),
  };

  /**
   * 提交回调函数
   */
  handleSubmit = (errors, value) => {
    if (errors) {
      console.log({ errors });
      return;
    }
    this.props.fetchData();
    console.log({ value });
  };

  /**
   * 重置表单
   */
  handleReset = () => {
    this.setState(
      {
        value: Object.assign(
          {},
          this.initFields.base,
          this.initFields.advanced
        ),
      },
      () => {
        this.props.fetchData();
      }
    );
  };

  /**
   * 高级搜索
   */
  handleAdvancedSearch = () => {
    const { showAdvancedFields } = this.state;
    this.setState({
      showAdvancedFields: !showAdvancedFields,
    });
  };

  /**
   * 渲染按钮
   */
  renderExtraContent = () => {
    return (
      <div style={styles.extraContent} onClick={this.handleAdvancedSearch}>
        高级搜索{' '}
        <Icon
          size="xs"
          type={this.state.showAdvancedFields ? 'arrow-up' : 'arrow-down'}
        />
      </div>
    );
  };

  /**
   * 获取渲染表单的字段
   */
  getFormFiled = (initConfig) => {
    const { showAdvancedFields } = this.state;
    const { initFields } = this;
    if (showAdvancedFields) {
      return {
        config: initConfig,
        fields: Object.assign({}, initFields.base, initFields.advanced),
      };
    }

    const config = initConfig.filter((item) => {
      const keys = Object.keys(initFields.base);
      return keys.includes(item.formBinderProps.name);
    });

    return {
      config,
      fields: initFields.base,
    };
  };

  render() {
    const config = [
      {
        label: '合同编号',
        component: 'Input',
        componentProps: {
          placeholder: '请输入合同编号',
          size: 'large',
        },
        formBinderProps: {
          name: 'id',
          required: false,
          message: '请输入正确的合同编号',
        },
      },
      {
        label: '归档号',
        component: 'Input',
        componentProps: {
          placeholder: '请输入归档号',
          size: 'large',
        },
        formBinderProps: {
          name: 'archiveId',
          required: false,
          message: '请输入正确的归档号',
        },
      },
      {
        label: '申请单号',
        component: 'Input',
        componentProps: {
          placeholder: '请输入申请单号',
          size: 'large',
        },
        formBinderProps: {
          name: 'applyCode',
        },
      },
      {
        label: '合同名称',
        component: 'Input',
        componentProps: {
          placeholder: '请输入合同名称',
          size: 'large',
        },
        formBinderProps: {
          name: 'name',
        },
      },
      {
        label: '对方公司',
        component: 'Select',
        componentProps: {
          placeholder: '请选择',
          size: 'large',
          dataSource: [
            { label: '杭州xxx科技有限公司', value: 'option1' },
            { label: '上海xxx科技有限公司', value: 'option2' },
          ],
        },
        formBinderProps: {
          name: 'otherCompany',
        },
      },
      {
        label: '负责人',
        component: 'Select',
        componentProps: {
          placeholder: '请选择',
          size: 'large',
          dataSource: [
            { label: '淘小宝', value: 'taoxiaobao' },
            { label: '淘二宝', value: 'taoerbao' },
          ],
        },
        formBinderProps: {
          name: 'principal',
        },
      },
      {
        label: '创建时间',
        component: 'RangePicker',
        componentProps: {
          placeholder: '请选择日期',
          size: 'large',
          defaultValue: [],
        },
        formBinderProps: {
          name: 'createTime',
        },
      },
      {
        label: '签订时间',
        component: 'RangePicker',
        componentProps: {
          placeholder: '请选择日期',
          size: 'large',
          defaultValue: [],
        },
        formBinderProps: {
          name: 'signTime',
        },
      },
      {
        label: '终止时间',
        component: 'RangePicker',
        componentProps: {
          placeholder: '请选择日期',
          size: 'large',
          defaultValue: [],
        },
        formBinderProps: {
          name: 'endTime',
        },
      },
      {
        label: '合同状态',
        component: 'Select',
        componentProps: {
          placeholder: '请选择',
          size: 'large',
          dataSource: [
            { value: 'draft', label: '起草中' },
            { value: 'approval', label: '审批中' },
            { value: 'effective', label: '待生效' },
            { value: 'abort', label: '终止' },
          ],
        },
        formBinderProps: {
          name: 'state',
        },
      },
      {
        label: '合同类型',
        component: 'Select',
        componentProps: {
          placeholder: '请选择',
          size: 'large',
          dataSource: [
            { label: '主合同', value: 'primary' },
            { label: '变更合同', value: 'change' },
          ],
        },
        formBinderProps: {
          name: 'type',
        },
      },
      {
        label: '查询我批准的合同',
        component: 'Checkbox',
        componentProps: {},
        formBinderProps: {
          name: 'checkbox',
        },
      },
    ];

    const getFormFiled = this.getFormFiled(config);
    return (
      <CustomForm
        value={this.state.value}
        config={getFormFiled.config}
        handleSubmit={this.handleSubmit}
        handleReset={this.handleReset}
        extraContent={this.renderExtraContent()}
      />
    );
  }
}

const styles = {
  extraContent: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    color: 'rgba(49, 128, 253, 0.65)',
    cursor: 'pointer',
  },
};
