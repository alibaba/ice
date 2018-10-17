import {Component} from 'react';
import omit from 'lodash.omit';
import { Select, Input, Dropdown, Menu } from '@icedesign/base';
import ToolbarButton from '../../components/ToolbarButton';
import { FONTSIZE } from '../../constants/marks';
import SharedMarkSelectorDecoration from '../shared/markSelectorDecoration';
import commonMark from '../../renderer/commonMark';
import {markAttrs} from '../../utils/getAttrs';

@SharedMarkSelectorDecoration(FONTSIZE)
class FontSizeButton extends Component {
  static defaultProps = {
    options: [12, 14, 16, 18, 20, 24, 28, 32]
  };

  state = {
    inputValue: this.props.defaultValue
  }

  componentWillReceiveProps(nextProps) {
    let defaultFont = 14;
    if (nextProps.defaultValue) {
      defaultFont = nextProps.defaultValue.split('px')[0];
    }
    this.setState({
      inputValue: defaultFont
    });
  }

  render() {
    const {
      options,
      defaultValue,
      onChange,
      displayType,
      icon,
      ...rest
    } = this.props;
    const {
      inputValue
    } = this.state;

    return (
      <span title="字体大小"
        className="toolbar-select-input">
        <Input
          className="select-input"
          value={inputValue}
          onChange={(value) => {
            if (!value.match(/[^0-9]/)) {
              this.setState({inputValue: value});
            }
          }}
          onKeyDown={(e) => {
            // Enter Key
            if (e.keyCode === 13) {
              const {inputValue} = this.state;
              this.onChangeValue(inputValue);
              e.preventDefault();
            }
          }}
        />
        <Dropdown triggerType="click"
          align="tr br"
          trigger={
            <span className="select-icon material-icons">
              expand_more
            </span>
          }
        >
          <Menu onClick={(value) => {
            this.setState({inputValue: value});
            this.onChangeValue(value);
          }}>
            {options.map(item => (
              <Menu.Item onMouseDown={e => e.preventDefault()} key={item}>
                {item}
              </Menu.Item>
            ))}
          </Menu>
        </Dropdown>
      </span>
    );
  }

  onChangeValue = (value) => {
    const {onChange} = this.props;
    onChange({value: `${value}px`});
  }

}

function FontSizePlugin() {
  return {
    toolbarButtons: [
      FontSizeButton
    ],
    plugins: [
      {
        renderMark: props => {
          if (props.mark.type === FONTSIZE)
            return commonMark('span', {fontSize: markAttrs.fontSize})(
              props
            );
        }
      }
    ]
  };
}

export default FontSizePlugin;
