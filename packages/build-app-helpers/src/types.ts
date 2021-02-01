export interface IEntry {
  entryPath: string;
  entryName: string;
  pageName?: string;
  source?: string;
  path?: string;
  window?: {
    title?: string;
    [key: string]: string
  }
}

export interface IRoute {
  targets?: string[];
  source?: string;
  path?: string;
  name?: string;
  pageSource?: string;
  window?: {
    title?: string;
    [key: string]: string
  }
  frames?: IRoute[];
  tabHeader?: {
    source: string;
    name?: string;
    height: number;
    position?: string;
  }
}
