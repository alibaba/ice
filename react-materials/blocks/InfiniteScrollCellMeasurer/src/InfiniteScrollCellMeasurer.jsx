import * as React from 'react';
import IceContainer from '@icedesign/container';
import { AutoSizer } from 'react-virtualized';
import cn from 'classnames';
import './InfiniteScrollCellMeasurer.scss';
import DynamicWidthGrid from './DynamicWidthGrid';
import data from './data';

export default class CellMeasurerExample extends React.PureComponent {
  static displayName = 'InfiniteScrollCellMeasurer';

  constructor(props) {
    super(props);
  }

  render() {
    const { list } = data;

    const DemoComponent = DynamicWidthGrid;

    return (
      <IceContainer className="InfiniteScrollCellMeasurer">
        <AutoSizer disableHeight>
          {({ width }) => (
            <div style={{ width }}>
              <DemoComponent
                getClassName={getClassName}
                getContent={getContent}
                list={list}
                width={width}
              />
            </div>
          )}
        </AutoSizer>
      </IceContainer>
    );
  }
}

function getClassName({ columnIndex, rowIndex }) {
  const rowClass = rowIndex % 2 === 0 ? 'evenRow' : 'oddRow';

  return cn(rowClass, 'cell', {
    centeredCell: columnIndex > 2,
  });
}

function getContent({ index, datum, long = true }) {
  switch (index % 3) {
    case 0:
      return datum.color;
    case 1:
      return datum.name;
    case 2:
      return long ? datum.randomLong : datum.random;
  }
}
