import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@alifd/next';
import styles from './index.module.scss';

export default class SmallCard extends Component {
  render() {
    const { data } = this.props;

    if (data) {
      return data.map((item, index) => (
        <div className={styles.card} key={index}>
          <div className={styles.container}>
            <div className={styles.image}>
              {item.name.substr(0, 1).toUpperCase()}
            </div>
            <div className={styles.content}>
              <h3 className={styles.name}>{item.name}</h3>
              <p className={styles.desc}>{item.desc}</p>
            </div>
            <Link to="/setting">
              <Icon type="set" size="small" className={styles.settingIcon} />
            </Link>
            {item.tag && <span className={styles.tag}>{item.tag}</span>}
          </div>
        </div>
      ));
    }
    return null;
  }
}
