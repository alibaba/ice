/* eslint quote-props:0 */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Grid, Radio } from '@alifd/next';
import { injectIntl, FormattedMessage } from 'react-intl';
import { LocalContext, localeInfos } from '@components/Locale';
import socket from '@src/socket';
import styles from './index.module.scss';

const { Row, Col } = Grid;
const RadioGroup = Radio.Group;
const LOCALE_MAP = {
  '中文': 'iceworks.setting.general.language.zh',
  'English': 'iceworks.setting.general.language.en',
};

const General = ({ intl }) => {
  const { locale, setLocale } = useContext(LocalContext);

  // language options
  const languageOptions = Object.keys(localeInfos).map(key => {
    return {
      value: key,
      label: intl.formatMessage({ id: LOCALE_MAP[localeInfos[key].label]}),
    };
  });


  // theme options
  const themeOptions = [
    {
      label: intl.formatMessage({ id: 'iceworks.setting.general.theme.light' }),
      value: 'light',
    },
    {
      label: intl.formatMessage({ id: 'iceworks.setting.general.theme.dark' }),
      value: 'dark',
    },
  ];

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
        <FormattedMessage id="iceworks.setting.general.language.title" />
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
        <FormattedMessage id="iceworks.setting.general.theme.title" />
      </Col>
      <Col span="22">
        <RadioGroup
          dataSource={themeOptions}
          shape="button"
          value={locale}
          onChange={onThemeChange}
        />
      </Col>
    </Row>,
  ];
};


General.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(General);
