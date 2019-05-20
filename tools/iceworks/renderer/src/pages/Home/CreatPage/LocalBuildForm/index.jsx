/* eslint react/destructuring-assignment: 0 */
import { Dialog, Button, Form, Input, Field, Radio, Icon, Balloon } from '@icedesign/base';
import { observer, inject } from 'mobx-react';
import React, { Component } from 'react';

// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.scss';

const { Group: RadioGroup } = Radio;
const FormItem = Form.Item;

@inject('newpage', 'localBlocks')
@observer
class PageConfig extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    newpage: PropTypes.object,
  };
  /* eslint-enable react/require-default-props */

  constructor(props) {
    super(props);
    this.field = new Field(this);
  }

  handleClose = () => {
    if (!this.props.newpage.isCreating) {
      this.props.newpage.closeLocalBuildForm();
    }
  };

  handleOk = () => {
    const { localBlocks, newpage } = this.props;
    this.field.validate((errors, values) => {
      if (errors) {
        // 表单验证失败
      } else {
        localBlocks.setBlockName(values.name);
        localBlocks.openWorkBench();
        localBlocks.close();
        newpage.closeLocalBuildForm();
      }
    });
  };

  validatorName = (rule, value, callback) => {
    if (Object.prototype.hasOwnProperty.call(this.props.localBlocks.blocksStorage, value)) {
      callback([new Error('区块名重复，请修改名字！')]);
    } else {
      callback();
    }
  };

  onChangeBlockName = (value) => {
    this.field.setValue('name', value);
    this.props.localBlocks.setBlockName(value);
  };

  render() {
    const { init } = this.field;
    const { localBlocks, newpage } = this.props;

    const formItemLayout = {
      labelCol: {
        fixedSpan: 5,
      },
    };

    return (
      <Dialog
        title="填写区块信息"
        visible={newpage.localBuildFormVisible}
        onClose={this.handleClose}
        onCancel={this.handleClose}
        // afterClose={this.handleAfterClose}
        footer={(
          <div>
            <Button
              disabled={newpage.isCreating}
              size="small"
              onClick={this.handleClose}
            >
              取消
            </Button>
            <Button
              loading={newpage.isCreating}
              size="small"
              type="primary"
              onClick={this.handleOk}
            >
              确定
            </Button>
          </div>
)}
      >
        <Form
          size="small"
          direction="ver"
          style={{ width: 320, paddingTop: '30px' }}
          field={this.field}
        >
          <FormItem {...formItemLayout} required label="区块名">
            <Input
              style={{ width: 200 }}
              {...init('name', {
                initValue: localBlocks.blockName,
                rules: [
                  {
                    required: true,
                    message: '不能为空',
                    trigger: ['onChange'],
                  },
                  {
                    pattern: /^[a-z]([-_a-z0-9]*)$/i,
                    message: '请输入字母与数字组合，字母开头',
                    trigger: ['onChange'],
                  },
                  {
                    validator: this.validatorName,
                  },
                ],
              })}
              placeholder="请输入区块名，字母与数字组合，字母开头"
              onChange={this.onChangeBlockName}
              value={localBlocks.blockName}
            />
          </FormItem>
          <FormItem {...formItemLayout} required label="类型">
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 3 }}>
              <RadioGroup {...init('type', { initValue: 'form' })}>
                <Radio value="form" size="small">表单</Radio>
              </RadioGroup>
              <Balloon
                trigger={<Icon type="help" size="xs" />}
              >
                当前版本只提供表单搭建，未来会支持更多。
              </Balloon>
            </div>
          </FormItem>
        </Form>
      </Dialog>
    );
  }
}

export default PageConfig;
