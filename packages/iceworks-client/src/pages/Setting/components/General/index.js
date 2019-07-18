/* eslint quote-props:0 */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Radio, Select, Input } from '@alifd/next';
import showMessage from '@utils/showMessage';
import { injectIntl, FormattedMessage } from 'react-intl';
import { LocalContext, localeInfos } from '@components/Locale';
import { ThemeContext } from '@components/ThemeProvider';
import Card from '@components/Card';
import appConfig, { THEMES } from '@src/appConfig';
import socket from '@src/socket';
import goldlog from '@utils/goldlog';
import styles from './index.module.scss';

const { Row, Col } = Grid;
const RadioGroup = Radio.Group;
const DEFAULT_EDITOR = 'vscode';

const General = ({ intl }) => {
  const { locale, setLocale } = useContext(LocalContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [editor, setEditor] = useState(DEFAULT_EDITOR);
  const [npmClient, setNpmClient] = useState('');
  const [registry, setRegistry] = useState('');
  
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
      value: THEMES.light.themePackage,
    },
    {
      label: intl.formatMessage({ id: 'iceworks.setting.general.theme.dark' }),
      value: THEMES.dark.themePackage,
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

  // npm clients
  const npmClients = [
    {
      label: 'npm',
      value: 'npm',
    },
    {
      label: 'tnpm',
      value: 'tnpm',
    },
    {
      label: 'cnpm',
      value: 'cnpm',
    },
    {
      label: intl.formatMessage({ id: 'iceworks.setting.general.custom.registry' }),
      value: 'custom',
    },
  ].filter(({ value }) => {
    return value !== 'tnpm' || appConfig.isAliInternal;
  });

  async function onLocaleChange(currentLocale) {
    goldlog({
      namespace: 'home',
      module: 'setting',
      action: 'set-locale',
      data: {
        locale: currentLocale,
      },
    });

    try {
      await socket.emit('home.setting.setLocale', { locale: currentLocale });
      setLocale(currentLocale);
    } catch (error) {
      showMessage(error);
    }
  }

  async function onThemeChange(currentTheme) {
    goldlog({
      namespace: 'home',
      module: 'setting',
      action: 'set-theme',
      data: {
        theme: currentTheme,
      },
    });

    try {
      await socket.emit('home.setting.setTheme', { theme: currentTheme });
      setTheme(currentTheme);
    } catch (error) {
      showMessage(error);
    }
  }

  async function getEditor() {
    const currentLocale = await socket.emit('home.setting.getEditor');
    setEditor(currentLocale);
  }

  async function onEditorChange(currentEditor) {
    goldlog({
      namespace: 'home',
      module: 'setting',
      action: 'set-editor',
      data: {
        editor: currentEditor,
      },
    });

    try {
      await socket.emit('home.setting.setEditor', { editor: currentEditor });
      setEditor(currentEditor);
    } catch (error) {
      showMessage(error);
    }
  }

  async function getNpmClient() {
    const currentNpmClient = await socket.emit('home.setting.getNpmClient');
    setNpmClient(currentNpmClient);
  }

  async function onClientChange(currentNpmClient) {
    goldlog({
      namespace: 'home',
      module: 'setting',
      action: 'set-npm-client',
      data: {
        npmClient: currentNpmClient,
      },
    });

    try {
      await socket.emit('home.setting.setNpmClient', { npmClient: currentNpmClient });
      setNpmClient(currentNpmClient);
    } catch (error) {
      showMessage(error);
    }
  }

  async function getRegistry() {
    const currentRegistry = await socket.emit('home.setting.getRegistry');
    setRegistry(currentRegistry);
  }

  async function onRegistryChange(value) {
    try {
      await socket.emit('home.setting.setRegistry', { registry: value });
      setRegistry(value);
    } catch (error) {
      showMessage(error);
    }
  }

  useEffect(() => {
    try {
      getEditor();
      getNpmClient();
      getRegistry();
    } catch (error) {
      showMessage(error);
    }
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
      
      <Row className={styles.row} key="client">
        <Col span="2" className={styles.label}>
          <FormattedMessage id="iceworks.setting.general.npm.client.title" />
        </Col>
        <Col span="22">
          <Select className={styles.select} dataSource={npmClients} value={npmClient} onChange={onClientChange} />
        </Col>
      </Row>
      {npmClient === 'custom' &&
        <Row className={styles.row} key="cuntom">
          <Col span="2" className={styles.label} />
          <Col span="22">
            <Input
              onChange={onRegistryChange}
              style={{ minWidth: 300 }}
              value={registry}
              placeholder={intl.formatMessage({ id: 'iceworks.setting.general.custom.placeholder' })}
            />
          </Col>
        </Row>
      }
    </Card>
  );
};


General.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(General);
