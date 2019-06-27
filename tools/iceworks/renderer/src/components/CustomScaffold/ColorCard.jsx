import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from '@icedesign/base';

@inject('customScaffold')
@observer

/**
 * 显示色彩阶梯
 */
class ColorCard extends Component {
  render() {
    const { customScaffold } = this.props;
    const primaryColors = customScaffold.primaryColors;
    return (
      <div>
        <div
          style={{ display: 'flex', flexDirection: 'row', padding: '10px 0' }}
        >
          <div>主色阶：</div>
          {primaryColors.map((hex, i) => {
            return (
              <div
                title={hex}
                key={i}
                style={{ backgroundColor: hex, width: 16, height: 16 }}
              />
            );
          })}
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'row', padding: '5px 0' }}
        >
          <Button
            type="primary"
            size="small"
            style={{ backgroundColor: primaryColors[5] }}
          >
            主按钮
          </Button>
        </div>
      </div>
    );
  }
}

export default ColorCard;
