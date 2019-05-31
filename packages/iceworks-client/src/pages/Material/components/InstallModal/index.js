import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@alifd/next';

const InstallModal = ({ type, ...other }) => {
  return (
    <Dialog {...other}>
      <div>
        install something
      </div>
    </Dialog>
  );
};

InstallModal.defaultProps = {
  type: 'scaffold',
};

InstallModal.propTypes = {
  type: PropTypes.string,
};

export default InstallModal;
