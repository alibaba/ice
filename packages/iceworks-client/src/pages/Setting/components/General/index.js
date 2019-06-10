import React, { useContext } from 'react';
import { Grid, Radio } from '@alifd/next';
import { LocalContext, localeInfos } from '@components/Locale';
import socket from '@src/socket';
import styles from './index.module.scss';

const { Row, Col } = Grid;
const RadioGroup = Radio.Group;

// language options
const languageOptions = Object.keys(localeInfos).map(key => {
  return {
    value: key,
    label: localeInfos[key].label
  };
});


// theme options
const themeOptions = [
  {
    label: '浅色',
    value: 'light'
  },
  {
    label: '深色',
    value: 'dark'
  }
];

const General = () => {
  const { locale, setLocale } = useContext(LocalContext);

  async function onLocaleChange(currentLocale) {
    await socket.emit('home.setting.setLocale', { locale: currentLocale });
    setLocale(currentLocale);
  }

  function onThemeChange(value) {
    console.log(value);
  }

  return [
    <Row className={styles.row} key="language">
      <Col span="2" className={styles.label}>
        语言
      </Col>
      <Col span="22">
        <RadioGroup
          dataSource={languageOptions}
          shape="button"
          value={locale}
          onChange={onLocaleChange}
        />
      </Col>
    </Row>,
    <Row className={styles.row} key="theme">
      <Col span="2" className={styles.label}>
        主题
      </Col>
      <Col span="22">
        <RadioGroup
          dataSource={themeOptions}
          shape="button"
          value={locale}
          onChange={onThemeChange}
        />
      </Col>
    </Row>
  ];
};

export default General;
