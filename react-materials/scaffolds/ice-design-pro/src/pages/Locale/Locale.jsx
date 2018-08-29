import React, { Component } from 'react';
import { connect } from 'react-redux';
import IceContainer from '@icedesign/container';
import { Table } from '@icedesign/base';
import { FormattedMessage, injectIntl } from 'react-intl';

import { appLocales } from '../../i18n';
import { changeLocale } from '../../store/LanguageProvider/actions';
import Toggle from './components/Toggle';
import messages from './messages';

const generatorData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      id: `${index + 1}`,
      time: `${new Date()}`,
      description: '这里是一些描述',
    };
  });
};

class Locale extends Component {
  static displayName = 'Locale';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  onLocaleToggle = (value) => {
    this.props.changeLocale(value);
  };

  render() {
    const { locale, intl } = this.props;
    const dataSource = generatorData();
    return (
      <IceContainer>
        <h4 style={styles.title}>
          {/* 通过组件的形式调用: <FormattedMessage> */}
          <FormattedMessage {...messages.titleMessage} />
        </h4>

        <Toggle
          value={locale}
          values={appLocales}
          messages={messages}
          onChange={this.onLocaleToggle}
        />

        <Table dataSource={dataSource} style={{ marginTop: '20px' }}>
          {/* 通过 API 的形式调用: intl.formatMessage */}
          <Table.Column
            title={intl.formatMessage(messages.tableId)}
            dataIndex="id"
          />
          <Table.Column
            title={intl.formatMessage(messages.tableTime)}
            dataIndex="time"
            cell={(value) => intl.formatDate(value)}
          />
          <Table.Column
            title={intl.formatMessage(messages.tableDescription)}
            dataIndex="description"
            cell={(value) =>
              intl.formatMessage(messages.tableContent, { value })
            }
          />
        </Table>
      </IceContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  locale: state.language.locale,
});

const mapDispatchToProps = {
  changeLocale,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Locale));

const styles = {
  title: {
    margin: '0 0 20px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
  },
};
