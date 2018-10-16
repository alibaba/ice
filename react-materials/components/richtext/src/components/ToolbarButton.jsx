import {Component} from 'react';

import BoldIcon from '@material-ui/icons/FormatBold';
import ItalicIcon from '@material-ui/icons/FormatItalic';
import UnderlineIcon from '@material-ui/icons/FormatUnderlined';
import StrikethroughIcon from '@material-ui/icons/FormatStrikethrough';
import ColorTextIcon from '@material-ui/icons/FormatColorText';
import ColorFillIcon from '@material-ui/icons/FormatColorFill';
import LineSpacingIcon from '@material-ui/icons/FormatLineSpacing';
import AlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import AlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import AlignRightIcon from '@material-ui/icons/FormatAlignRight';
import AlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import H1Icon from '@material-ui/icons/LooksOne';
import H2Icon from '@material-ui/icons/LooksTwo';
import H3Icon from '@material-ui/icons/Looks3';
import H4Icon from '@material-ui/icons/Looks4';
import ListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ListBulletedIcon from '@material-ui/icons/FormatListBulleted';

const iconMap = {
  format_bold: BoldIcon,
  format_italic: ItalicIcon,
  format_underline: UnderlineIcon,
  format_strikethrough: StrikethroughIcon,
  format_color_text: ColorTextIcon,
  format_color_fill: ColorFillIcon,
  format_line_spacing: LineSpacingIcon,
  format_align_left: AlignLeftIcon,
  format_align_center: AlignCenterIcon,
  format_align_right: AlignRightIcon,
  format_align_justify: AlignJustifyIcon,
  looks_one: H1Icon,
  looks_two: H2Icon,
  looks_3: H3Icon,
  looks_4: H4Icon,
  format_list_numbered: ListNumberedIcon,
  format_list_bulleted: ListBulletedIcon,
};

class Button extends Component {
  render() {
    const {active, icon, title, onMouseDown, onClick, iconStyle} = this.props;
    const Icon = iconMap[icon];
    return (
      <span
        className="toolbar-button"
        style={{
          color: active ? 'black' : '#999',
        }}
        title={title}
        onMouseDown={onMouseDown}
        onClick={onClick}
      >
        <Icon
          className="material-icons"
          style={iconStyle}
        />
      </span>
    );
  }
}

export default Button;
