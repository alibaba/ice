/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Input,
  Button,
  Message,
  NumberPicker,
  DatePicker,
  Radio,
  Select,
} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import PageHead from '../../../../components/PageHead';

const { Option } = Select;
const { Group: RadioGroup } = Radio;
const { RangePicker } = DatePicker;

export default class GoodsForm extends Component {
  state = {
    value: {},
  };

  formChange = (value) => {
    console.log('value', value);
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      console.log({ values });
      Message.success('提交成功');
    });
  };

  render() {
    return (
      <div>
        <PageHead title="添加商品" />
        <IceContainer style={{ padding: '40px' }}>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formItem}>
              <div style={styles.formLabel}>商品名称：</div>
              <IceFormBinder name="goodsName" required message="商品名称必填">
                <Input
                  placeholder="请输入商品名称"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="goodsName" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>条形码：</div>
              <IceFormBinder name="code">
                <Input
                  placeholder="请输入数字条形码"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>库存量：</div>
              <IceFormBinder name="stock" required message="联系方式必填">
                <NumberPicker />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>商品标签：</div>
              <IceFormBinder name="bookName">
                <Select
                  placeholder="请选择"
                  mode="multiple"
                  style={{ width: '400px' }}
                >
                  <Option value="1">新品</Option>
                  <Option value="2">数码</Option>
                  <Option value="3">智能</Option>
                  <Option value="4">生活</Option>
                </Select>
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>商品价格：</div>
              <IceFormBinder name="price" required message="商品价格必填">
                <Input
                  placeholder="请输入商品价格: ￥199.99"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="price" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>预售时间：</div>
              <IceFormBinder name="reverseTime">
                <RangePicker style={{ width: '400px' }} />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>预约条件：</div>
              <IceFormBinder name="payment">
                <RadioGroup
                  dataSource={[
                    {
                      value: '1',
                      label: '需要支付',
                    },
                    {
                      value: '2',
                      label: '无需支付',
                    },
                  ]}
                />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>体验展示：</div>
              <IceFormBinder name="show">
                <RadioGroup
                  dataSource={[
                    {
                      value: '1',
                      label: '展示',
                    },
                    {
                      value: '2',
                      label: '不展示',
                    },
                  ]}
                />
              </IceFormBinder>
            </div>
            <Button type="primary" onClick={this.validateAllFormField}>
              提 交
            </Button>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formItem: {
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
  },
  formLabel: {
    fontWeight: '450',
    width: '80px',
  },
  formError: {
    marginTop: '10px',
  },
  button: {
    marginLeft: '100px',
  },
};
