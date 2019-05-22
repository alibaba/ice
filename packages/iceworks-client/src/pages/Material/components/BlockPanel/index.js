import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@alifd/next';
import MaterialCategories from '@components/MaterialCategories';
import BlockCard from '@components/BlockCard';

import styles from '../ScaffoldPanel/index.module.scss';

const { Row, Col } = Grid;

const BlockPanel = ({ dataSource, current }) => {
  const { categories = [], materials = {} } = dataSource;
  const cueeMaterials = materials[current] || [];

  return (
    <div className={styles.materialsPanel}>
      <MaterialCategories dataSource={categories} current={current} />
      <Row wrap gutter="20">
        {cueeMaterials.map((data, index) => {
          return (
            <Col l="8" xs="8" xxs="24" key={index}>
              <BlockCard dataSource={data} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

BlockPanel.defaultProps = {
  dataSource: {
    categories: [],
    materials: {},
  },
  current: 'all',
};

BlockPanel.propTypes = {
  dataSource: PropTypes.shape({
    categories: PropTypes.array.isRequired,
    materials: PropTypes.object.isRequired,
  }),
  current: PropTypes.string,
};

export default BlockPanel;
