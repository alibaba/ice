import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Grid, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import './InfiniteScrollCellMeasurer.scss';

export default class DynamicWidthGrid extends Component {
  static propTypes = {
    getClassName: PropTypes.func.isRequired,
    getContent: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.cache = new CellMeasurerCache({
      defaultWidth: 100,
      fixedHeight: true,
    });
  }

  cellRenderer = ({ columnIndex, key, parent, rowIndex, style }) => {
    const { getClassName, getContent, list } = this.props;

    const datum = list[(rowIndex + columnIndex) % list.length];
    const classNames = getClassName({ columnIndex, rowIndex });
    const content = getContent({ index: columnIndex, datum, long: false });

    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={columnIndex}
        key={key}
        parent={parent}
        rowIndex={rowIndex}
      >
        <div
          className={classNames}
          style={{
            ...style,
            height: 35,
            whiteSpace: 'nowrap',
          }}
        >
          {content}
        </div>
      </CellMeasurer>
    );
  };

  render() {
    const { width } = this.props;

    return (
      <Grid
        className="body-grid"
        columnCount={1000}
        columnWidth={this.cache.columnWidth}
        deferredMeasurementCache={this.cache}
        height={400}
        overscanColumnCount={0}
        overscanRowCount={2}
        cellRenderer={this.cellRenderer}
        rowCount={50}
        rowHeight={35}
        width={width}
      />
    );
  }
}
