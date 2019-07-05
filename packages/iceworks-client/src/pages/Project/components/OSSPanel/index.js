import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Select, Message } from '@alifd/next';
import { injectIntl, FormattedMessage } from 'react-intl';
import Icon from '@components/Icon';
import Modal from '@components/Modal';
import socket from '@src/socket';
import cx from 'classnames';
import Panel from '../Panel';
import stores from '../../stores';
import regions from './dataSource';
import PanelHead from '../Panel/head';
import styles from './index.module.scss';

const OSSPanel = ({ intl, title, description }) => {
  const ossStore = stores.useStore('oss');
  const { dataSource } = ossStore;
  const {
    region,
    accessKeyId,
    accessKeySecret,
    bucket,
    directory,
  } = dataSource;
  const [buckets, setBuckets] = useState([]);
  const [results, setResults] = useState([]);

  async function refeshBucket() {
    try {
      const newBuckets = await socket.emit('adapter.oss.getBuckets');
      setBuckets(newBuckets.map(({ name }) => {
        return {
          label: name,
          value: name,
        };
      }));
    } catch (error) {
      setBuckets([]);
    }
  }

  async function onClear() {
    await ossStore.clearConfig();
  }

  async function onValueChange(field, value) {
    await ossStore.setConfig({ [field]: value });
  }

  async function onSubmit() {
    try {
      const result = await socket.emit('adapter.oss.upload');
      setResults(result);
    } catch (error) {
      Message.show({
        align: 'tr tr',
        type: 'error',
        title: '上传失败',
        content: error.message,
      });
    }
  }

  function onCancel() {
    setResults([]);
  }

  useEffect(() => {
    refeshBucket();
  }, []);

  const operations = [
    {
      type: 'clear',
      onClick: onClear,
      tip: intl.formatMessage({ id: 'iceworks.project.panel.oss.button.clear' }),
    },
  ];

  return (
    <Panel
      header={
        <PanelHead
          title={title}
          description={description}
          operations={operations}
        />
      }
    >
      <div className={styles.wrap}>
        <Form labelAlign="left" className={styles.form}>
          <div className={styles.item}>
            <div className={styles.label}><FormattedMessage id="iceworks.project.panel.oss.region.label" /></div>
            <Select
              size="medium"
              className={styles.field}
              value={region}
              onChange={(value) => onValueChange('region', value)}
              dataSource={regions}
            />
            <a
              className={styles.help}
              href="https://help.aliyun.com/document_detail/31837.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon type="help" />
            </a>
          </div>
          <div className={styles.item}>
            <div className={styles.label}>AccessKey ID:</div>
            <Input
              size="medium"
              className={styles.field}
              value={accessKeyId}
              onChange={(value) => onValueChange('accessKeyId', value)}
              placeholder="accessKeyId"
            />
            <a
              className={styles.help}
              href="https://help.aliyun.com/knowledge_detail/38738.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon type="help" />
            </a>
          </div>
          <div className={styles.item}>
            <div className={styles.label}>Secret:</div>
            <Input
              size="medium"
              className={styles.field}
              htmlType="password"
              value={accessKeySecret}
              onChange={(value) => onValueChange('accessKeySecret', value)}
              placeholder="accessKeySecret"
            />
          </div>
          <div className={styles.item}>
            <div className={styles.label}><FormattedMessage id="iceworks.project.panel.oss.bucket.label" /></div>
            <Select
              size="medium"
              className={styles.field}
              value={bucket}
              onChange={(value) => onValueChange('bucket', value)}
              dataSource={buckets || []}
            />
            <Icon
              type="reload"
              size="medium"
              className={styles.reload}
              onClick={refeshBucket}
            />
          </div>
          <div className={styles.item}>
            <div className={styles.label}><FormattedMessage id="iceworks.project.panel.oss.directory.label" /></div>
            <Input
              size="medium"
              className={styles.field}
              value={directory}
              onChange={(value) => onValueChange('directory', value)}
              placeholder={<FormattedMessage id="iceworks.project.panel.oss.directory.tip" />}
            />
          </div>
          <div className={styles.item}>
            <div className={styles.label} />
            <Button
              type="primary"
              onClick={onSubmit}
            >
              <FormattedMessage id="iceworks.project.panel.oss.button.upload" />
            </Button>
          </div>
        </Form>
        <Modal
          title="上传结果"
          visible={!!results.length}
          onCancel={onCancel}
          footer={false}
        >
          <div className={styles.modal}>
            <div className={styles.title}>
              <div>成功：({results.filter(({ success }) => success).length})</div>
              <div>失败: ({results.filter(({ success }) => !success).length})</div>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={cx({ [styles.td]: true, [styles.frist]: true })}>状态</th>
                  <th className={styles.td}>文件</th>
                  <th className={styles.td}>URL / 信息</th>
                </tr>
              </thead>
              <tbody>
                {results.map(({ path, success, url, message }) => {
                  return (
                    <tr key={path}>
                      <td className={styles.td}>
                        <span className={cx({ [styles.status]: true, [styles.success]: success })}>
                          {success ? '成功' : '失败'}
                        </span>
                      </td>
                      <td className={styles.td}>{path}</td>
                      <td className={styles.td}>
                        {
                          success ?
                            <a href={url} target="_blank" rel="noopener noreferrer">
                              {url}
                            </a> :
                            message
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Modal>
      </div>
    </Panel>
  );
};

OSSPanel.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(OSSPanel);
