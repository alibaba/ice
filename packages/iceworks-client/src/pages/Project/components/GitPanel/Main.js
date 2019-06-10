import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Checkbox } from '@alifd/next';
import styles from './Main.module.scss';

const { Group: CheckboxGroup } = Checkbox;

const originData = {};

function Main({ dataSource, onOk }) {
  const [data, setData] = useState(originData);
  const { message = '', files = [] } = data;

  function onMessageChange(value) {
    setData({
      ...data,
      message: value,
    });
  }

  function onFilesChange(selectedFiles) {
    setData({
      ...data,
      files: selectedFiles,
    });
  }

  async function onSubmit() {
    await onOk(data);
    setData(originData);
  }

  function onSelectAll() {
    if (files.length === 0) {
      setData({
        ...data,
        files: dataSource.map(({ file }) => file).slice(),
      });
    } else {
      setData({
        ...data,
        files: [],
      });
    }
  }

  const statusMap = {
    conflicted: ['#FA7070', '冲突'],
    not_added: ['#2ECA9C', '未添加'],
    modified: ['#FCDA52', '已变更'],
    created: ['#5485F7', '新创建'],
    deleted: ['#999999', '已删除'],
    renamed: ['#FA7070', '重命名'],
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <span>
          变更文件
          <span>({dataSource.length})</span>
        </span>
        <Button onClick={onSelectAll}>
          全选
        </Button>
      </div>
      <div className={styles.content}>
        <CheckboxGroup value={files} onChange={onFilesChange}>
          { dataSource.map((item, index) => {
            const { type, file } = item;
            const status = statusMap[type];
            const [color, text] = status;

            return (
              <div key={index} className={styles.item}>
                <Checkbox value={file}>
                  <span style={{ backgroundColor: color }}>
                    {text}
                  </span>
                  <span>{file}</span>
                </Checkbox>
              </div>
            );
          }) }
        </CheckboxGroup>
      </div>
      <div className={styles.opts}>
        <Input
          onChange={onMessageChange}
          value={message}
          placeholder="提交信息"
        />
        <Button
          type="primary"
          disabled={files.length === 0 || !message}
          onClick={onSubmit}
        >
          { dataSource.length === 0 && '提交' }
          { dataSource.length !== 0 && files.length === 0 && '选择文件提交' }
          { files.length !== 0 && !message && '输入信息提交' }
          { files.length !== 0 && message && '提交' }
        </Button>
      </div>
      <div className={styles.tips}>
        变更信息不会实时刷新，提交前请先通过右上角的按钮更新状态
      </div>
    </div>
  );
}

Main.propTypes = {
  dataSource: PropTypes.array.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default Main;
