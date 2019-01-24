import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import styles from './index.module.scss';

const { Row, Col } = Grid;

export default class RealTimeStatistics extends Component {
  render() {
    return (
      <Row wrap gutter="20">
        <Col xxs="24" s="12" l="6">
          <div className={styles.itemBody1}>
            <div className={styles.itemTitle}>
              <p className={styles.titleText}>分类统计</p>
              <span className={styles.tag}>实时</span>
            </div>
            <div className={styles.itemContent}>
              <h2 className={styles.itemNum}>7,993</h2>
              <div className={styles.itemMeta}>
                <p className={styles.total}>7,993</p>
                <p className={styles.desc}>当前分类总记录数</p>
              </div>
            </div>
          </div>
        </Col>
        <Col xxs="24" s="12" l="6">
          <div className={styles.itemBody2}>
            <div className={styles.itemTitle}>
              <p className={styles.titleText}>附件统计</p>
              <span className={styles.tag}>实时</span>
            </div>
            <div className={styles.itemContent}>
              <h2 className={styles.itemNum}>3,112</h2>
              <div className={styles.itemMeta}>
                <p className={styles.total}>3,112</p>
                <p className={styles.desc}>当前上传的附件数</p>
              </div>
            </div>
          </div>
        </Col>
        <Col xxs="24" s="12" l="6">
          <div className={styles.itemBody3}>
            <div className={styles.itemTitle}>
              <p className={styles.titleText}>文章统计</p>
              <span className={styles.tag}>实时</span>
            </div>
            <div className={styles.itemRow}>
              <div className={styles.itemCol}>
                <h2 className={styles.itemNum}>908</h2>
                <p className={styles.desc}>评论次数</p>
              </div>
              <div className={styles.itemCol}>
                <h2 className={styles.itemNum}>263</h2>
                <p className={styles.desc}>点赞次数</p>
              </div>
            </div>
          </div>
        </Col>
        <Col xxs="24" s="12" l="6">
          <div className={styles.itemBody4}>
            <div className={styles.itemTitle}>
              <p className={styles.titleText}>新闻统计</p>
              <span className={styles.tag}>实时</span>
            </div>
            <div className={styles.itemRow}>
              <div className={styles.itemCol}>
                <h2 className={styles.itemNum}>908</h2>
                <p className={styles.desc}>评论次数</p>
              </div>
              <div className={styles.itemCol}>
                <h2 className={styles.itemNum}>263</h2>
                <p className={styles.desc}>点赞次数</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}
