import {Component} from 'react';
import ToolbarButton from '../../components/ToolbarButton';
import { haveDataKeyEqualValueInSomeBlocks } from '../../queries/have';
import blockAddData from '../../commands/block-adddata';
import blockClearDataByKey from '../../commands/block-cleardatabykey';

export const applyChange = (change, type, align) => {
  const isActive = haveDataKeyEqualValueInSomeBlocks(change, type, align);

  if (isActive) return change.call(blockClearDataByKey, type);
  return change.call(blockAddData, { data: { [type]: align } });
};

class AlignButton extends Component {

  typeName = '';

  constructor(props) {
    super(props);
    this.typeName = this.props.type || 'align';
  }

  onClick = (e) => {
    e.preventDefault();
    let { editor, align } = this.props;

    editor.change(change => {
      applyChange(change, this.typeName, align);
    });
  };

  render() {
    const { value, icon, title, align, type, ...rest } = this.props;
    const onClick = e => this.onClick(e);
    const isActive = haveDataKeyEqualValueInSomeBlocks({value}, type, align);

    return (
      <ToolbarButton
        icon={icon}
        title={title}
        onClick={onClick}
        active={isActive}
      />
    );
  }
}

const createButton = (align, icon, title) => {
  return ({value, editor, onChange}) => {
    return (
      <AlignButton
        icon={icon}
        title={title}
        align={align}
        value={value}
        editor={editor}
        onChange={onChange}
      />
    );
  };
};

function AlignPlugin() {
  return {
    toolbarButtons: [
      createButton('left', 'format_align_left', '左对齐'),
      createButton('center', 'format_align_center', '居中对齐'),
      createButton('right', 'format_align_right', '右对齐'),
      createButton('justify', 'format_align_justify', '两端对齐'),
    ]
  };
}

export default AlignPlugin;
