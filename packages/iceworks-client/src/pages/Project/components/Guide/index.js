import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@alifd/next';
import ScaffoldCard from '@components/ScaffoldCard';
import Icon from '@components/Icon';
import styles from './index.module.scss';

const Guide = ({
  onOpenProject,
  onCreateProject,
  scaffolds,
  createProject,
}) => {
  return (
    <div className={styles.guide}>
      {
        scaffolds.length ?
          <div className={styles.scaffolds}>
            {
              scaffolds.map((scaffold) => {
                return (
                  <div className={styles.item}>
                    <ScaffoldCard dataSource={scaffold} onDownload={createProject} />
                  </div>
                );
              })
            }
          </div> : null
      }
      <div className={styles.text}>
        从热门模板开始初始化你的项目
      </div>
      <div className={styles.opts}>
        <Button className={styles.btn} type="secondary" size="large" onClick={onOpenProject}>
          <Icon type="package" size="small" />
          <span>打开项目</span>
        </Button>
        <Button className={styles.btn} type="primary" size="large" onClick={onCreateProject}>
          <Icon type="plus" size="small" />
          <span>更多模板</span>
        </Button>
      </div>
    </div>
  );
};

Guide.propTypes = {
  onCreateProject: PropTypes.func.isRequired,
  onOpenProject: PropTypes.func.isRequired,
  scaffolds: PropTypes.array.isRequired,
  createProject: PropTypes.func.isRequired,
};

export default Guide;
