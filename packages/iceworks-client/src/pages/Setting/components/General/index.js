/* eslint quote-props:0 */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Radio } from '@alifd/next';
import { injectIntl, FormattedMessage } from 'react-intl';
import { LocalContext, localeInfos } from '@components/Locale';
import { ThemeContext } from '@components/ThemeProvider';
import useTermTheme from '@hooks/useTermTheme';
import Card from '@components/Card';
import { THEMES } from '@src/appConfig';
import socket from '@src/socket';
import styles from './index.module.scss';

const { Row, Col } = Grid;
const RadioGroup = Radio.Group;
const DEFAULT_EDITOR = 'vscode';

const General = ({ intl }) => {
  const { locale, setLocale } = useContext(LocalContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [editor, setEditor] = useState(DEFAULT_EDITOR);
  const { setTermTheme } = useTermTheme(theme);

  // language options
  const languageOptions = Object.keys(localeInfos).map(key => {
    return {
      value: key,
      label: localeInfos[key].label,
    };
  });


  // theme options
  const themeOptions = [
    {
      label: intl.formatMessage({ id: 'iceworks.setting.general.theme.light' }),
      value: THEMES.light,
    },
    {
      label: intl.formatMessage({ id: 'iceworks.setting.general.theme.dark' }),
      value: THEMES.dark,
    },
  ];

  // editor options
  // ref: https://github.com/yyx990803/launch-editor/tree/master/packages/launch-editor/editor-info
  const editorOptions = [
    {
      label: 'Visual Studio Code',
      value: 'code',
    },
    {
      label: 'Sublime Text',
      value: 'subl',
    },
    {
      label: 'Atom',
      value: 'atom',
    },
    {
      label: 'WebStorm',
      value: 'webstorm',
    },
  ];

  async function onLocaleChange(currentLocale) {
    await socket.emit('home.setting.setLocale', { locale: currentLocale });
    setLocale(currentLocale);
  }

  async function onThemeChange(currentTheme) {
    await socket.emit('home.setting.setTheme', { theme: currentTheme });
    setTheme(currentTheme);
    setTermTheme(theme);
  }

  async function getEditor() {
    const currentLocale = await socket.emit('home.setting.getEditor');
    setEditor(currentLocale);
  }

  async function onEditorChange(currentEditor) {
    await socket.emit('home.setting.setEditor', { editor: currentEditor });
    setEditor(currentEditor);
  }

  useEffect(() => {
    getEditor();
  }, []);

  return (

    <Card title={intl.formatMessage({ id: 'iceworks.setting.general.title' })} contentHeight="100%">
      <Row className={styles.row} key="language">
        <Col span="2" className={styles.label}>
          <FormattedMessage id="iceworks.setting.general.language.title" />
        </Col>
        <Col span="22">
          <RadioGroup
            dataSource={languageOptions}
            shape="button"
            defaultValue={locale}
            value={locale}
            onChange={onLocaleChange}
          />
        </Col>
      </Row>

      <Row className={styles.row} key="theme">
        <Col span="2" className={styles.label}>
          <FormattedMessage id="iceworks.setting.general.theme.title" />
        </Col>
        <Col span="22">
          <RadioGroup
            dataSource={themeOptions}
            shape="button"
            value={theme}
            onChange={onThemeChange}
          />
        </Col>
      </Row>

      <Row className={styles.row} style={{ alignItems: 'flex-start' }} key="editor">
        <Col span="2" className={styles.label}>
          <FormattedMessage id="iceworks.setting.general.editor.title" />
        </Col>
        <Col span="22">
          <RadioGroup
            dataSource={editorOptions}
            value={editor}
            onChange={onEditorChange}
          />
        </Col>
      </Row>
    </Card>
  );
};


General.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(General);
