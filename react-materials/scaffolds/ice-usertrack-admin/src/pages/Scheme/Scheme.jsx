import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import Filter from './Components/Filter';
import CardList from './Components/CardList';

export default class Scheme extends Component {
  static displayName = 'Scheme';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      {
        link: '/#/maintain/scheme',
        text: '埋点维护',
      },
      {
        link: '',
        text: '方案管理',
      },
    ];
    return (
      <div>
        <CustomBreadcrumb items={breadcrumb} title="方案管理" />
        <Filter />
        <CardList />
      </div>
    );
  }
}
