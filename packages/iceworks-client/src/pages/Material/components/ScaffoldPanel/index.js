import React from 'react';
import { Grid } from '@alifd/next';
import PropTypes from 'prop-types';
import ScaffoldCard from '@components/ScaffoldCard';
import MaterialCategories from '@components/MaterialCategories';
import styles from './index.module.scss';

const { Row, Col } = Grid;

const ScaffoldPanel = ({ dataSource }) => {
  const { categories, scaffolds } = dataSource;
  return (
    <div className={styles.scaffoldPanel}>
      <MaterialCategories dataSource={categories} />
      <Row wrap gutter="40">
        {scaffolds.map((scaffod, index) => {
          return (
            <Col l="12" xs="12" xxs="24" key={index}>
              <ScaffoldCard dataSource={scaffod} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

ScaffoldPanel.defaultProps = {
  dataSource: {
    categories: [],
    scaffolds: [],
  },
};

ScaffoldPanel.propTypes = {
  dataSource: PropTypes.shape({
    categories: PropTypes.array.isRequired,
    scaffolds: PropTypes.array.isRequired,
  }),
};

export default ScaffoldPanel;
