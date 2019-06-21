import { IProject } from '../../../interface';
import config from '../config';

const { title,  description, cover, isAvailable } = config['guide'];

export default class Guide {
  public readonly title: string = title;
  public readonly description: string = description;
  public readonly cover: string = cover;
  public readonly isAvailable: boolean = isAvailable;
  public readonly project: IProject;
  public readonly storage: any;
}
