import { baseModules } from '../../../adapter';

export default class Router extends baseModules.Router {
  public noPathPrefix: boolean;

  constructor(params) {
    super(params);
    // cra only support 'src' as baseUrl, so the import dependency path has no prefix such as:
    // import foo from 'pages/foo';
    this.noPathPrefix = true;
  }
}
