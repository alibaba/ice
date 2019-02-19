import { Base64 } from 'js-base64';
import { Form, Input, Select, Button, Feedback } from '@icedesign/base';
import { inject, observer } from 'mobx-react';
import co from 'co';
import fs from 'fs';
import junk from 'junk';
import oss from 'ali-oss';
import path from 'path';
import pathExists from 'path-exists';
import React, { Component } from 'react';

import BrowserLink from '../../../components/BrowserLink';
import DashboardCard from '../../../components/DashboardCard/';
import dialog from '../../../components/dialog';
import ExtraButton from '../../../components/ExtraButton/';
import Icon from '../../../components/Icon';

const STORE_KEY = 'extension:aliyun:data';

const regionList = [
  { value: 'oss-cn-hangzhou', label: '华东 1' },
  { value: 'oss-cn-shanghai', label: '华东 2' },
  { value: 'oss-cn-qingdao', label: '华北 1' },
  { value: 'oss-cn-beijing', label: '华北 2' },
  { value: 'oss-cn-zhangjiakou', label: '华北 3' },
  { value: 'oss-cn-huhehaote', label: '华北 5' },
  { value: 'oss-cn-shenzhen', label: '华南 1' },
  { value: 'oss-cn-hongkong', label: '香港' },
  { value: 'oss-us-west-1', label: '美国西部 1' },
  { value: 'oss-us-east-1', label: '美国东部 1' },
  { value: 'oss-ap-southeast-1', label: '亚太东南 1' },
  { value: 'oss-ap-southeast-2', label: '亚太东南 2' },
  { value: 'oss-ap-southeast-3', label: '亚太东南 3' },
  { value: 'oss-ap-southeast-5', label: '亚太东南 5' },
  { value: 'oss-ap-northeast-1', label: '亚太东北 1' },
  { value: 'oss-ap-south-1', label: '亚太南部 1' },
  { value: 'oss-eu-central-1', label: '欧洲中部 1' },
  { value: 'oss-me-east-1', label: '中东东部 1' },
];
// https://help.aliyun.com/document_detail/31837.html
const regionMap = {
  'oss-cn-hangzhou': {
    endpoint: 'oss-cn-hangzhou.aliyuncs.com',
    name: '华东 1',
  },
  'oss-cn-shanghai': {
    endpoint: 'oss-cn-shanghai.aliyuncs.com',
    name: '华东 2',
  },
  'oss-cn-qingdao': {
    endpoint: 'oss-cn-qingdao.aliyuncs.com',
    name: '华北 1',
  },
  'oss-cn-beijing': {
    endpoint: 'oss-cn-beijing.aliyuncs.com',
    name: '华北 2',
  },
  'oss-cn-zhangjiakou': {
    endpoint: 'oss-cn-zhangjiakou.aliyuncs.com',
    name: '华北 3',
  },
  'oss-cn-huhehaote': {
    endpoint: 'oss-cn-huhehaote.aliyuncs.com',
    name: '华北 5',
  },
  'oss-cn-shenzhen': {
    endpoint: 'oss-cn-shenzhen.aliyuncs.com',
    name: '华南 1',
  },
  'oss-cn-hongkong': {
    endpoint: 'oss-cn-hongkong.aliyuncs.com',
    name: '香港',
  },
  'oss-us-west-1': {
    endpoint: 'oss-us-west-1.aliyuncs.com',
    name: '美国西部 1',
  },
  'oss-us-east-1': {
    endpoint: 'oss-us-east-1.aliyuncs.com',
    name: '美国东部 1',
  },
  'oss-ap-southeast-1': {
    endpoint: 'oss-ap-southeast-1.aliyuncs.com',
    name: '亚太东南 1',
  },
  'oss-ap-southeast-2': {
    endpoint: 'oss-ap-southeast-2.aliyuncs.com',
    name: '亚太东南 2',
  },
  'oss-ap-southeast-3': {
    endpoint: 'oss-ap-southeast-3.aliyuncs.com',
    name: '亚太东南 3',
  },
  'oss-ap-southeast-5': {
    endpoint: 'oss-ap-southeast-5.aliyuncs.com',
    name: '亚太东南 5',
  },
  'oss-ap-northeast-1': {
    endpoint: 'oss-ap-northeast-1.aliyuncs.com',
    name: '亚太东北 1',
  },
  'oss-ap-south-1': {
    endpoint: 'oss-ap-south-1.aliyuncs.com',
    name: '亚太南部 1',
  },
  'oss-eu-central-1': {
    endpoint: 'oss-eu-central-1.aliyuncs.com',
    name: '欧洲中部 1',
  },
  'oss-me-east-1': {
    endpoint: 'oss-me-east-1.aliyuncs.com',
    name: '中东东部 1',
  },
};

@inject('projects')
@observer
class Aliyun extends Component {
  static extensionName = 'aliyun';

  constructor(props) {
    super(props);

    const base64Value = localStorage.getItem(STORE_KEY);
    let initState = {};
    if (base64Value) {
      try {
        initState = JSON.parse(Base64.decode(base64Value));
      } catch (e) {}
    }

    this.state = initState;
  }

  ossValueChange = (key, value) => {
    this.setState(
      {
        [key]: value,
      },
      this.saveAliossData
    );
  };

  saveAliossData = () => {
    const {
      region,
      accessKeyId,
      accessKeySecret,
      selectedBucket,
      bucketDirectory,
      bucketOptions,
      // cdn,
    } = this.state;
    const base64Value = Base64.encode(
      JSON.stringify({
        region,
        accessKeyId,
        accessKeySecret,
        selectedBucket,
        bucketDirectory,
        bucketOptions,
        // cdn,
      })
    );
    localStorage.setItem(STORE_KEY, base64Value);
  };

  getOssStore = () => {
    return new Promise((resolve, reject) => {
      if (!this.state.accessKeyId || !this.state.accessKeySecret) {
        Feedback.toast.error('请先输入 accessKeyId、accessKeySecret');
        reject();
      } else {
        try {
          var ossStore = oss({
            region: this.state.region,
            endpoint: regionMap[this.state.region].endpoint,
            accessKeyId: this.state.accessKeyId,
            accessKeySecret: this.state.accessKeySecret,
            time: '200s',
          });
          ossStore.agent = false;
          resolve(ossStore);
        } catch (e) {
          reject(e);
        }
      }
    });
  };

  handleClear = () => {
    this.setState(
      {
        region: 'oss-cn-hangzhou',
        accessKeyId: '',
        accessKeySecret: '',
        selectedBucket: undefined,
        bucketDirectory: '',
        bucketOptions: [],
        // cdn: '',
      },
      () => {
        localStorage.removeItem(STORE_KEY);
      }
    );
  };

  hadnleRefeshBucket = () => {
    this.getOssStore()
      .then((ossStore) => {
        co(ossStore.listBuckets())
          .then((result) => {
            const buckets = result.buckets;
            const bucketOptions = buckets.map((bucket) => {
              return {
                label: bucket.name,
                value: bucket.name,
              };
            });
            Feedback.toast.success('Bucket 列表已刷新');
            this.setState(
              {
                bucketOptions,
                selectedBucket: bucketOptions[0].value,
              },
              this.saveAliossData
            );
          })
          .catch((err = {}) => {
            dialog.alert({
              title: 'Bucket 列表刷新失败',
              content: err.message,
            });
          });
      })
      .catch((e) => {
        dialog.alert({ title: 'Bucket 列表刷新失败', content: e.message });
      });
  };

  handleUploadOss = () => {
    const { currentProject } = this.props.projects;
    const buildDir = path.join(currentProject.clientPath, 'build');
    if (pathExists.sync(buildDir)) {
      const assets = this.recursiveAssets();
      if (assets.length == 0) {
        Feedback.toast.error('当前构建结果为空');
      } else {
        if (!this.state.selectedBucket) {
          Feedback.toast.error('未选择 bucket');
        } else {
          this.setState({ isUploading: true });
          dialog.confirm(
            {
              title: '上传到阿里云 OSS',
              content: (
                <div>
                  <div>是否将构建结果上传到:</div>
                  <div style={{ paddingLeft: '2em' }}>
                    区域: {regionMap[this.state.region].name}
                    {' - '}
                    {this.state.region}
                  </div>
                  <div style={{ paddingLeft: '2em' }}>
                    终端: {regionMap[this.state.region].endpoint}
                  </div>
                  <div style={{ paddingLeft: '2em' }}>
                    存储空间: {this.state.selectedBucket}
                  </div>
                  <div style={{ paddingLeft: '2em' }}>
                    存储路径: {this.state.bucketDirectory || '/'}
                  </div>
                </div>
              ),
            },
            (ok) => {
              if (ok) {
                this.getOssStore()
                  .then((ossStore) => {
                    ossStore.setBucket(this.state.selectedBucket);
                    Promise.all(
                      assets.map((file) => {
                        return this.upload2oss(
                          ossStore,
                          this.state.bucketDirectory,
                          file
                        );
                      })
                    ).then((uploadResult) => {
                      this.renderUploadResult(uploadResult);
                    });
                  })
                  .catch((e) => {
                    dialog.alert({ title: '上传失败', content: e.message });
                    this.setState({ isUploading: false });
                  });
              } else {
                this.setState({ isUploading: false });
              }
            }
          );
        }
      }
    } else {
      Feedback.toast.error('暂无构建结果');
    }
  };

  upload2oss = (ossStore, paths, file) => {
    let storeFilepath = path.join(paths, file.path);
    storeFilepath = storeFilepath.replace(/\\/g, '/');
    storeFilepath = storeFilepath.replace(/^\//, '');
    return co(ossStore.put(storeFilepath, file.fullPath))
      .then((object = {}) => {
        if (object.res && object.res.status == 200) {
          return Promise.resolve({
            code: 0,
            url: object.url,
            path: file.path,
          });
        } else {
          return Promise.resolve({
            code: 1,
            message: `上传失败，请检查网络连接 (${(object.res &&
              object.res.status) ||
              0})。`,
          });
        }
      })
      .catch((err) => {
        return Promise.resolve({
          code: 1,
          message: err.message,
          path: file.path,
        });
      });
  };

  recursiveAssets = () => {
    const { projects } = this.props;
    const { currentProject } = projects;
    const cwd = currentProject.client;
    const distPath = path.join(cwd, 'build');
    const assets = this.recursiveReaddirSync(distPath, distPath);
    return assets;
  };

  recursiveReaddirSync = (dirPath, rootDir) => {
    var stats;
    var list = [];
    var files = fs.readdirSync(dirPath).filter(junk.not);

    files.forEach((file) => {
      let fullPath = path.join(dirPath, file);
      stats = fs.lstatSync(fullPath);
      if (stats.isDirectory()) {
        list = list.concat(this.recursiveReaddirSync(fullPath, rootDir));
      } else {
        list.push({
          path: path.relative(rootDir, fullPath),
          fullPath,
        });
      }
    });
    list = list.sort((a, b) => {
      return a.path.localeCompare(b.path);
    });
    return list;
  };

  renderUploadResult = (result) => {
    let successCount = 0;
    let faildCount = 0;
    const content = result.map((item) => {
      const success = item.code == 0;
      if (success) {
        successCount += 1;
      } else {
        faildCount = 0;
      }
      return (
        <tr key={item.path}>
          <td style={{ padding: 3 }}>
            <span
              style={{
                color: '#fff',
                padding: '3px 4px',
                backgroundColor: success ? '#2ECA9C' : '#FA7070',
              }}
            >
              {success ? '成功' : '失败'}
            </span>
          </td>
          <td style={{ padding: 3, wordBreak: 'break-all' }}>{item.path}</td>
          <td style={{ padding: 3, wordBreak: 'break-all' }}>
            {success ? (
              <BrowserLink href={item.url}>{item.url}</BrowserLink>
            ) : (
              <span>{item.message}</span>
            )}
          </td>
        </tr>
      );
    });

    dialog.alert(
      {
        title: (
          <div>
            上传结果
            <span style={{ fontSize: 12, paddingLeft: 10, color: '#666' }}>
              成功：(
              {successCount}) 失败：(
              {faildCount})
            </span>
          </div>
        ),
        content: (
          <table style={{ width: '75%' }}>
            <thead>
              <tr>
                <th style={{ padding: 3, width: 40 }}>状态</th>
                <th style={{ padding: 3 }}>文件</th>
                <th style={{ padding: 3 }}>URL / 信息</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        ),
        fullWidth: true,
      },
      () => {
        this.setState({ isUploading: false });
      }
    );
  };

  render() {
    return (
      <DashboardCard>
        <DashboardCard.Header>
          <div>阿里云 OSS</div>
          <div>
            <ExtraButton
              style={{ color: '#3080FE' }}
              placement={'topRight'}
              tipText={'清空数据'}
              onClick={this.handleClear}
            >
              <Icon type="clear" style={{ fontSize: 18 }} />
            </ExtraButton>
          </div>
        </DashboardCard.Header>
        <DashboardCard.Body>
          <Form direction="ver" field={this.field}>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>区域:</div>
              <Select
                size="small"
                style={{ width: '60%' }}
                placeholder="请选择 region"
                value={this.state.region}
                onChange={this.ossValueChange.bind(this, 'region')}
                dataSource={regionList}
              />
              <BrowserLink
                style={{ color: '#3080FE', marginLeft: 10, padding: '2px 4px' }}
                href="https://help.aliyun.com/document_detail/31837.html"
              >
                <Icon type="help" />
              </BrowserLink>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>AccessKey ID:</div>
              <Input
                size="small"
                style={{ width: '60%' }}
                value={this.state.accessKeyId}
                onChange={this.ossValueChange.bind(this, 'accessKeyId')}
                placeholder="accessKeyId"
              />
              <BrowserLink
                style={{ color: '#3080FE', marginLeft: 10, padding: '2px 4px' }}
                href="https://help.aliyun.com/knowledge_detail/38738.html"
              >
                <Icon type="help" />
              </BrowserLink>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>Secret:</div>
              <Input
                size="small"
                style={{ width: '60%' }}
                htmlType="password"
                value={this.state.accessKeySecret}
                onChange={this.ossValueChange.bind(this, 'accessKeySecret')}
                placeholder="accessKeySecret"
              />
            </div>
            {/* <div style={styles.formItem}>
              <Input
                size="small"
                style={{ width: '75%' }}
                value={this.state.cdn}
                onChange={this.ossValueChange.bind(this, 'cdn')}
                placeholder="CDN 域名没有可不填"
              />
            </div> */}
            <div style={styles.formItem}>
              <div style={styles.formLabel}>存储空间:</div>
              <Select
                size="small"
                style={{ width: '60%' }}
                placeholder="请选择 bucket"
                value={this.state.selectedBucket}
                onChange={this.ossValueChange.bind(this, 'selectedBucket')}
                dataSource={this.state.bucketOptions || []}
              />
              <ExtraButton
                style={{ color: '#3080FE', marginLeft: 10 }}
                placement={'top'}
                tipText={'刷新 bukcet 列表'}
                onClick={this.hadnleRefeshBucket}
              >
                <Icon type="reload" />
              </ExtraButton>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>存储路径:</div>
              <Input
                size="small"
                style={{ width: '60%' }}
                value={this.state.bucketDirectory}
                onChange={this.ossValueChange.bind(this, 'bucketDirectory')}
                placeholder="存储路径（不填则默认在根目录）"
              />
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel} />
              <Button
                size="small"
                type="primary"
                onClick={this.handleUploadOss}
                loading={this.state.isUploading}
              >
                提交上传
              </Button>
            </div>
          </Form>
        </DashboardCard.Body>
      </DashboardCard>
    );
  }
}

const styles = {
  formItem: {
    width: '100%',
    paddingBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  formLabel: {
    textAlign: 'right',
    paddingRight: 10,
    width: 100,
  },
};

export default Aliyun;
