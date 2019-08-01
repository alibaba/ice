import * as path from 'path';
import { baseModules } from '../../../adapter';
import { IProject } from '../../../../interface';

export default class Page extends baseModules.Page {
  public readonly templateFileName: string;

  public readonly templateFilePath: string;

  public readonly prettierParseType: string;

  constructor(params: { project: IProject; storage: any }) {
    super(params);

    this.templateFileName = 'template.vue';
    this.templateFilePath = path.join(__dirname, `${this.templateFileName}.ejs`);
    this.prettierParseType = 'vue';
  }
}
