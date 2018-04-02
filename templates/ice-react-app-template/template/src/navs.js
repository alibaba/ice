// <!-- auto generated navs start -->
const autoGenHeaderNavs = [];
const autoGenAsideNavs = [];
// <!-- auto generated navs end -->

// <!-- custom generated navs start -->
const customHeaderNavs = [];
const customAsideNavs = [];
// <!-- custom generated navs end -->

function transform(navs) {
  return [...navs];
}

export const headerNavs = transform([
  ...autoGenHeaderNavs,
  ...customHeaderNavs,
]);

export const asideNavs = transform([...autoGenAsideNavs, ...customAsideNavs]);
