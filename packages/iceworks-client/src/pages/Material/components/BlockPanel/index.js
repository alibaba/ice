import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@alifd/next';
import MaterialCategories from '@components/MaterialCategories';
import BlockCard from '@components/BlockCard';

const { Row, Col } = Grid;

const BlockPanel = ({ dataSource }) => {
  const { categories = [], blocks = [] } = dataSource;
  return (
    <div className="block-panel">
      <MaterialCategories dataSource={categories} />
      <Row wrap gutter="40">
        {blocks.map((data, index) => {
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
    blocks: [],
  },
};

BlockPanel.propTypes = {
  dataSource: PropTypes.shape({
    categories: PropTypes.array.isRequired,
    blocks: PropTypes.array.isRequired,
  }),
};

export default BlockPanel;
