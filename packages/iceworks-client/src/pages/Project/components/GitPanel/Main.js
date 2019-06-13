import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
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
    conflicted: ['#FA7070', <FormattedMessage id="iceworks.project.panel.git.main.status.conflicted" />],
    not_added: ['#2ECA9C', <FormattedMessage id="iceworks.project.panel.git.main.status.not_added" />],
    modified: ['#FCDA52', <FormattedMessage id="iceworks.project.panel.git.main.status.modified" />],
    created: ['#5485F7', <FormattedMessage id="iceworks.project.panel.git.main.status.created" />],
    deleted: ['#999999', <FormattedMessage id="iceworks.project.panel.git.main.status.deleted" />],
    renamed: ['#FA7070', <FormattedMessage id="iceworks.project.panel.git.main.status.renamed" />],
  };

  let btnId = '';
  if (dataSource.length === 0) {
    btnId = 'iceworks.global.button.submit';
  } else if (files.length === 0) {
    btnId = 'iceworks.project.panel.git.main.submit.file';
  } else if (message) {
    btnId = 'iceworks.global.button.submit';
  } else {
    btnId = 'iceworks.project.panel.git.main.submit.message';
  }

  const btnElement = <FormattedMessage id={btnId} />;

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <span className={styles.tip}>
          <FormattedMessage id="iceworks.project.panel.git.main.tip.unstagedFiles" />
          <span>({dataSource.length})</span>
        </span>
        <Button className={styles.btn} onClick={onSelectAll}>
          <FormattedMessage id="iceworks.global.button.selectAll" />
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
                  <span className={styles.label} style={{ backgroundColor: color }}>
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
          className={styles.input}
        />
        <Button
          type="primary"
          disabled={files.length === 0 || !message}
          onClick={onSubmit}
          className={styles.button}
        >
          { btnElement }
        </Button>
      </div>
      <div className={styles.tips}>
        <FormattedMessage id="iceworks.project.panel.git.main.tip.refresh" />
      </div>
    </div>
  );
}

Main.propTypes = {
  dataSource: PropTypes.array.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default Main;
