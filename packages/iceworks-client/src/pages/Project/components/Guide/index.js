import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from '@alifd/next';
import styles from './index.module.scss';

const Guide = ({ onOpenProject, onCreateProject }) => {
  return (
    <div className={styles.guide}>
      <div className={styles.text}>
        从热门模板开始初始化你的项目
      </div>
      <div className={styles.opts}>
        <Button className={styles.btn} type="secondary" size="large" onClick={onOpenProject}>
          <Icon type="download" size="xl" />
          <span>打开项目</span>
        </Button>
        <Button className={styles.btn} type="primary" size="large" onClick={onCreateProject}>
          <Icon type="add" size="xl" />
          <span>更多模板</span>
        </Button>
      </div>
    </div>
  );
};

Guide.propTypes = {
  onCreateProject: PropTypes.func.isRequired,
  onOpenProject: PropTypes.func.isRequired,
};

export default Guide;
