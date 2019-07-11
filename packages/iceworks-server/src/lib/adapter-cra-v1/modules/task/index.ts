import { baseModules } from '../../../adapter';

export default class Task extends baseModules.Task {
  public cliConfPath: string;

  constructor(params) {
    super(params);
    // We will not be using the configuration file provided by create-react-app
    this.cliConfPath = "";
  }
}
