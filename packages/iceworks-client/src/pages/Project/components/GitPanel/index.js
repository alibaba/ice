import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Input } from '@alifd/next';
import Panel from '../Panel';

const GitPanel = () => {
  return (
    <Panel header={<h3><FormattedMessage id="iceworks.project.panel.git.title" /></h3>}>
      <div>
        <div>关联仓库</div>
        <div>
          <Input />
        </div>
      </div>
    </Panel>
  );
};

export default GitPanel;
