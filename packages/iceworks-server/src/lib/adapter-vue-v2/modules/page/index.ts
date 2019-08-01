import { baseModules } from '../../../adapter';
import { IProject } from '../../../../interface';

export default class Page extends baseModules.Page {
  public readonly type: string;

  constructor(params: { project: IProject; storage: any }) {
    super(params);

    this.type = 'vue';
  }
}
