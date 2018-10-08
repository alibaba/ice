import React, { Component } from 'react';
import TopBar from '../../components/TopBar';
import PublishTable from './components/PublishTable';
import Overview from './components/Overview';

export default class Projects extends Component {
  static displayName = 'Projects';

  render() {
    return (
      <div>
        <TopBar
          style={styles.topbar}
          extraBefore={<Overview />}
          buttonText="发布项目"
        />
        <div style={{ height: '40px' }} />
        <PublishTable />
      </div>
    );
  }
}

const styles = {
  topbar: {
    height: '100px',
  },
};
