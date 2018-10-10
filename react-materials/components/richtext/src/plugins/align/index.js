import ToolbarButton from '../../components/ToolbarButton';

const hasAlign = (value, foundAlign) => {
  return value.blocks.some(node => node.data.get('align') === foundAlign);
};

// If we have an alignment, clear out the data attribute
const alignStrategy = (change, align) => {
  if (hasAlign(change.value, align)) {
    return change.setBlocks({
      data: { align: null },
    }).focus();
  }
  return change.setBlocks({
    data: { align },
  }).focus();
};

const createButton = (align, icon, title) => {
  return ({value, onChange}) => {
    return (
      <ToolbarButton
        icon={icon}
        title={title}
        onMouseDown={e => {
          return onChange(alignStrategy(value.change(), align));
        }}
        active={hasAlign(value, align)}
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
