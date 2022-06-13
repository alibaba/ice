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
}

interface AppWorker {
  url: string;
}

type DataPrefetch = Partial<{
  key: string;
  prefetchType: string;
  api: string;
  v: string;
  data: Record<string, any>;
  extHeaders: Record<string, string>;
}>;

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

type Frame = 'string' | (Partial<{
  url: string;
}> & WindowConfig);

type WindowConfig = Partial<{
  backgroundColor: string;
  enablePullRefresh: boolean;
  name: string;
  icons: Icon[];
  title: string;
}>;

export type PHAManifest = Partial<{
  pageHeader: PageHeader;
  tabBar: TabBar;
  queryParamsPassKeys: string[];
  queryParamsPassIgnoreKeys: string[];
  offlineResources: string[];
  dataPrefetch: DataPrefetch;
  expires: string;
  maxAge: number;
  appWorker: AppWorker;
  frames: Frame;
}> & WindowConfig & Record<string, any>;
