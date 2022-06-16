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
  source: string;
  prefetch: boolean;
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
  pagePath: string;
  path?: string;
  text?: string;
  icon: string;
  activeIcon: string;
}

type TabBar = Partial<{
  // list convert to items
  items: (string | TabItem)[];
  textColor: string;
  selectedColor: string;
  backgroundColor: string;
  borderStyle: string;
  selectedIndex: number;
  iconSize: number;
  fontSize: number;
  lineHeight: number;
  height: number;
  spacing: number;
  position: 'static' | 'absolute';
  name: string;
  url: string;
  html: string;
  custom: boolean;
}>;

type PHAItem = Partial<Pick<TabItem, 'path' | 'icon'> & {
  name: string;
  page_key: string;
  active_icon: string;
}>;

type PHATabBar = Partial<Pick<TabBar, 'html' | 'url' | 'position' | 'spacing'> & {
  key: string;
  text_color: string;
  selected_color: string;
  selected_index: number;
  background_color: string;
  border_style: string;
  icon_size: number;
  font_size: number;
  line_height: number;
  height: number;
  spacing: number;
  items: PHAItem[];
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
  enablePoplayer: boolean;
  disableCapture: boolean;
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
  name: string;
  background_color: string;
  splash_view_timeout: number;
  enable_poplayer: boolean;
  disable_capture: boolean;
  icons: Icon[];
  data_prefetch: Omit<DataPrefetch, 'prefetchType' | 'extHeaders'> & {
    prefetch_type: string;
    ext_headers: Record<string, string>;
  };
  app_worker: AppWorker;
  tab_bar: PHATabBar;
}>;
