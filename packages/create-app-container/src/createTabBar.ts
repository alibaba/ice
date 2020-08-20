import { isWeex } from 'universal-env';
import transformToVw from './transformToVw';
import getSafeAreaInsetBottom from './getSafeAreaInsetBottom';

const MAPING = {
  tarBarHeight: 98 + getSafeAreaInsetBottom(),
  tarBarPaddingBottom: getSafeAreaInsetBottom(),
  tarBarItemText: 24,
  TarBarItemImgWidth: 30,
  TarBarItemImgHight: 30,
  TarBarItemMarginBottom: 8
};

Object.keys(MAPING).forEach(key => {
  if (!isWeex) {
    MAPING[key] = transformToVw(MAPING[key]);
  }
});

const styles = {
  tabBar: {
    position: 'fixed',
    left: '0',
    right: '0',
    bottom: '0',
    height: MAPING.tarBarHeight,
    paddingBottom: MAPING.tarBarPaddingBottom,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1rpx solid #eee',
    backgroundColor: '#fff',
  },

  tabBarItem: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabBarItemText: {
    fontSize: MAPING.tarBarItemText
  },

  tabBarItemImg: {
    marginBottom: MAPING.TarBarItemMarginBottom,
    width: MAPING.TarBarItemImgWidth,
    height:  MAPING.TarBarItemImgHight
  }
};

const createTabBar = (api) => (props) => {
  const { createElement, useEffect, useState, Fragment } = api;
  const [pathname, setPathname] = useState('');
  const { config = {}, history, onClick } = props;

  if (!history || !history.location) {
    throw new Error('TabBar should have a props of "history". See https://github.com/ReactTraining/history.');
  }

  const showTabBar =
    // Have tabBar config
    typeof config === 'object' && Array.isArray(config.items)
    // Current page need show tabBar
    && config.items.find(item => item.path === pathname);

  const {
    backgroundColor = '#FFF',
    items = [],
    selectedColor = '#333',
    textColor = '#666',
  } = config || {};

  useEffect(() => {
    setPathname(history.location.pathname);
    history.listen((location) => {
      setPathname(location.pathname);
    });
  }, []);

  return createElement(
    Fragment,
    null,
    showTabBar
      ? createElement(
        'div',
        {
          style: {
            ...styles.tabBar,
            backgroundColor
          }
        },
        items.map(function (item, index) {
          const selected = item.path === pathname;
          const itemTextColor = item.textColor || textColor;
          const itemSelectedColor = item.selectedColor || selectedColor;
          return createElement(
            'div',
            {
              key: `tab-${index}`,
              style: styles.tabBarItem,
              onClick: () => {
                onClick && onClick(item);
                if (!item.path) {
                  console.warn(`TabBar item ${item.name} need set path`);
                } else {
                  history.push(item.path);
                }
              }
            },
            selected && item.activeIcon
              ? createElement('img', {
                style: styles.tabBarItemImg,
                src: item.activeIcon
              })
              : null,
            !selected && item.icon
              ? createElement('img', {
                style: styles.tabBarItemImg,
                src: item.icon
              })
              : null,
            createElement(
              'span',
              {
                style: {
                  ...styles.tabBarItemText,
                  color: selected ? itemSelectedColor : itemTextColor
                }
              },
              item.name
            )
          );
        })
      )
      : null
  );
};

export default createTabBar;
