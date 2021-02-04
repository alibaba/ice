import { InspectParams } from 'react-dev-inspector';

export interface IInspectorProps {
  // inspector toggle hotkeys
  keys?: string[];
  // whether disable click react component to open IDE for view component code
  disableLaunchEditor?: boolean;
  // triggered while inspector start and mouse hover in a HTMLElement
  onHoverElement?: (params: InspectParams) => void;
  // triggered while inspector start and mouse click on a HTMLElement
  onClickElement?: (params: InspectParams) => void;
}
