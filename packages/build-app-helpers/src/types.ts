export interface IEntry {
  entryPath: string;
  entryName: string;
  pageName?: string;
  source?: string;
  path?: string;
  url?: string;
  window?: {
    title?: string;
    [key: string]: string;
  };
  __frameIndex?: number;
  __pageHeader?: boolean;
}

export interface IPageHeader extends IRoute {
  height: number;
  position?: string;
}

export interface IRoute {
  targets?: string[];
  source?: string;
  path?: string;
  url?: string;
  name?: string;
  pageSource?: string;
  window?: {
    title?: string;
    [key: string]: string;
  };
  frames?: IRoute[];
  pageHeader?: IPageHeader;
}

export interface IRedirectImportOptions {
  source: string | Function;
  redirectImports: RedirectImportType[];
}

export type RedirectImportType = {
  name?: string;
  alias?: string;
  redirectPath: string;
  default: boolean;
}
