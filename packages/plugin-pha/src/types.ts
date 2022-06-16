interface PageHeader {
  url: string;
  height: number;
  backgroundColor: string;
  position: 'absolute' | 'static';
  source: string;
  html: string;
  includedSafeArea: boolean;
  heightUnit: 'rpx' | 'px';
}

interface Icon {
  src: string;
  type: string;
  sizes: string;
}

interface AppWorker {
  url: string;
}

interface DataPrefetchConfig {
  key: string;
  prefetchType: string;
  api: string;
  v: string;
  data: Record<string, any>;
  extHeaders: Record<string, string>;
}

type DataPrefetch = Partial<DataPrefetchConfig>;

interface TabItem {
  pageName: string;
  text?: string;
  icon: string;
  activeIcon: string;
}

type TabBar = Partial<{
  items?: TabItem[];
  textColor?: string;
  selectedColor?: string;
  backgroundColor?: string;
  borderStyle?: string;
  selectedIndex?: number;
  iconSize?: number;
  fontSize?: number;
  lineHeight?: number;
  height?: number;
  spacing?: number;
  position?: 'static' | 'absolute';
  name: string;
  url: string;
  html: string;
  custom: boolean;
}>;

type Priority = 'high' | 'normal' | 'low';

type FrameConfig = Partial<{
  url: string;
  priority?: Priority;
}> & WindowConfig;

type WindowConfig = Partial<{
  backgroundColor: string;
  enablePullRefresh: boolean;
  name: string;
  icons: Icon[];
  title: string;
}>;

type PHAWindowConfig = Partial<{
  backgroundColor: string;
  enablePullRefresh: boolean;
  name: string;
  icons: Icon[];
  title: string;
}>;

export interface PageConfig extends FrameConfig {
  pageHeader?: PageHeader;
  frames?: Frame;
  defaultFrameIndex?: number;
  // query_params should be queryParams?
  query_params?: string;
}

export type Page = 'string' | PageConfig;
export type Frame = 'string' | FrameConfig;
export interface PHAPage {
  key?: string;
  document?: string;
  path?: string;
  background_color?: string;
  pull_refresh?: boolean;
  priority?: Priority;
}

export type Manifest = Partial<{
  tabBar: TabBar;
  queryParamsPassKeys: string[];
  queryParamsPassIgnoreKeys: string[];
  offlineResources: string[];
  dataPrefetch: DataPrefetch;
  expires: string;
  maxAge: number;
  appWorker: AppWorker;
  pages: Page[];
}> & WindowConfig & Record<string, any>;

export type PHAManifest = Partial<{

}>;
