import PropTypes from 'prop-types';
import * as React from 'react';
import { Grid, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import './InfiniteScrollCellMeasurer.scss';

export default class DynamicWidthGrid extends React.PureComponent {
  static propTypes = {
    getClassName: PropTypes.func.isRequired,
    getContent: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this._cache = new CellMeasurerCache({
      defaultWidth: 100,
      fixedHeight: true,
    });
  }

  render() {
    const { width } = this.props;

    return (
      <Grid
        className="BodyGrid"
        columnCount={1000}
        columnWidth={this._cache.columnWidth}
        deferredMeasurementCache={this._cache}
        height={400}
        overscanColumnCount={0}
        overscanRowCount={2}
        cellRenderer={this._cellRenderer}
        rowCount={50}
        rowHeight={35}
        width={width}
      />
    );
  }

  _cellRenderer = ({ columnIndex, key, parent, rowIndex, style }) => {
    const { getClassName, getContent, list } = this.props;

    const datum = list[(rowIndex + columnIndex) % list.length];
    const classNames = getClassName({ columnIndex, rowIndex });
    const content = getContent({ index: columnIndex, datum, long: false });

    return (
      <CellMeasurer
        cache={this._cache}
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
}
