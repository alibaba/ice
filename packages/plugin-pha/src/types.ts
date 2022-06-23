export type PageHeader = Partial<{
  url: string;
  height: number;
  backgroundColor: string;
  position: 'absolute' | 'static';
  source: string;
  html: string;
  name: string;
  // only support Android 10.3.0+，iOS 10.2.0+
  includedSafeArea: boolean;
  heightUnit: 'rpx' | 'px';
}>;

interface Icon {
  src: string;
  type: string;
  sizes: string;
}

interface AppWorker {
  url?: string;
  source?: string;
  prefetch?: boolean;
}

interface DataPrefetchConfig {
  key: string;
  prefetchType: string;
  api: string;
  v: string;
  data: Record<string, any>;
  extHeaders: Record<string, any>;
  [key: string]: any;
}

type DataPrefetch = Partial<DataPrefetchConfig>;
type PHADataPrefetch = Partial<Omit<DataPrefetchConfig, 'prefetchType' | 'extHeaders'> & {
  prefetch_type: string;
  ext_headers: Record<string, any>;
  [key: string]: any;
}>;

interface TabItem {
  name?: string;
  pagePath?: string;
  path?: string;
  text?: string;
  icon: string;
  activeIcon: string;
}

type TabBar = Partial<{
  // list convert to items
  source: string;
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
  name: string;
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
  name?: string;
  pageHeader?: PageHeader;
  frames?: Frame[];
  defaultFrameIndex?: number;
  dataPrefetch?: DataPrefetch[];
  queryParams?: string;
}

export type Page = string | PageConfig;
export type Frame = string | FrameConfig;

export type PHAFrame = Partial<{
  key: string;
  path: string;
  background_color: string;
  header_position: 'absolute' | 'static';
  enable_pull_refresh: boolean;
  priority: Priority;
} & Omit<PHAPage, 'frames' | 'default_frame_index'>>;

type TabHeader = Partial<{
  key: string;
  html: string;
  url: string;
  height: number;
  background_color: string;
  position: 'absolute' | 'static';
  selected_index: number;
}>;

export type PHAPage = Partial<{
  key: string;
  document: string;
  path: string;
  background_color: string;
  enable_pull_refresh: boolean;
  priority: Priority;
  script: string;
  stylesheet: string;
  title: string;
  title_image: string;
  title_bar_color: string;
  external: string;
  request_headers: Record<string, string>;
  tab_header: TabHeader;
  default_frame_index: number;
  data_prefetch: PHADataPrefetch[];
  frames: PHAFrame[];
}>;

export type Manifest = Partial<{
  enablePoplayer: boolean;
  disableCapture: boolean;
  tabBar: TabBar;
  queryParamsPassKeys: string[];
  queryParamsPassIgnoreKeys: string[];
  offlineResources: string[];
  dataPrefetch: (DataPrefetch & Record<string, any>)[];
  expires: string;
  maxAge: number;
  appWorker: AppWorker;
  routes: Page[];
}> & WindowConfig & Record<string, any>;

export type PHAManifest = Partial<{
  name: string;
  background_color: string;
  splash_view_timeout: number;
  enable_poplayer: boolean;
  disable_capture: boolean;
  icons: Icon[];
  data_prefetch: PHADataPrefetch[];
  app_worker: AppWorker;
  tab_bar: PHATabBar;
  pages: PHAPage[];
  query_params_pass_keys: string[];
  query_params_pass_ignore_keys: string[];
  offline_resources: string[];
  built_in_library: string[];
  expires: string;
  max_age: number;
  package_resources: Record<string, string>;
}>;
