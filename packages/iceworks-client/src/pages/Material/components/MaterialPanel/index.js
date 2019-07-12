import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@alifd/next';
import LazyLoad from 'react-lazyload';
import MaterialCategories from '@components/MaterialCategories';
import BlockCard from '@components/BlockCard';
import ComponentCard from '@components/ComponentCard';
import ScaffoldCard from '@components/ScaffoldCard';
import NoData from '@components/NoData';

import styles from './index.module.scss';

const { Row, Col } = Grid;

const MaterialPanel = ({ dataSource, currentCategory, onCategoryChange, type, onUse }) => {
  const { categories = [], materials = {} } = dataSource[type] || {};
  const currentMaterials = materials[currentCategory] || [];
  const showCategories = categories.length > 1;

  function renderCol(materialType, data, eventHandler) {
    if (data.length < 1) {
      return <Col span="24"><NoData /></Col>;
    }

    return data.map((item) => {
      const key = item.source && item.source.npm ? item.source.npm : item.title;

      if (materialType === 'components') {
        return (
          <Col l="8" m="8" s="12" xs="24" xxs="24" key={key}>
            <ComponentCard dataSource={item} onInstall={eventHandler} />
          </Col>
        );
      }
      if (materialType === 'blocks') {
        return (
          <Col l="8" m="8" s="12" xs="24" xxs="24" key={key}>
            <LazyLoad height={265} resize scrollContainer=".scollContainer">
              <BlockCard dataSource={item} />
            </LazyLoad>
          </Col>
        );
      }
      if (materialType === 'scaffolds') {
        return (
          <Col l="12" s="12" xs="24" xxs="24" key={key}>
            <ScaffoldCard dataSource={item} onDownload={eventHandler} />
          </Col>
        );
      }
      return null;
    });
  }

  return (
    <div className={styles.materialsPanel}>
      {
        showCategories
          ? (
            <MaterialCategories
              dataSource={categories}
              current={currentCategory}
              onChange={onCategoryChange}
            />
          )
          : null
      }
      <Row wrap gutter="20">
        {
          renderCol(type, currentMaterials, onUse)
        }
      </Row>
    </div>
  );
};

MaterialPanel.defaultProps = {
  dataSource: {
    categories: [],
    materials: {},
  },
  onUse: f => f,
};

MaterialPanel.propTypes = {
  dataSource: PropTypes.shape({
    categories: PropTypes.array,
    materials: PropTypes.object,
  }),
  currentCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['scaffolds', 'blocks', 'components']).isRequired,
  onUse: PropTypes.func,
};

export default MaterialPanel;
