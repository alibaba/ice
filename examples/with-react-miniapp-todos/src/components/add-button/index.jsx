import React from 'react';
import styles from './index.module.scss';

function AddButton (props) {
  const { text, onClickMe } = props;

  return (
    <button type='button' className={styles['add-button']} onClick={onClickMe}>
      <text className={styles['add-icon']}>+</text>
      <text>{text}</text>
    </button>
  );
}

export default AddButton;
