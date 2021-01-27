export interface IEntry {
  entryPath: string;
  entryName: string;
  pageName?: string;
  source?: string;
  path?: string;
}

export interface IRoute {
  targets?: string[];
  source?: string;
  path?: string;
  name?: string;
  pageSource?: string;
  frames?: [];
  tabHeader?: {
    source: string;
    name?: string;
    height: number;
    position?: string;
  }
}
