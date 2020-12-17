export default (pageTDKData) => {
  const appTDKData = (window as any).__ICE_APP_TDK__;
  const { title: appTitle, description: appDescription, keywords: appKeywords } = appTDKData;
  const { title, description, keywords } = pageTDKData;

  document.title = title || appTitle;

  const metas = document.getElementsByTagName('meta');
  Array.from(metas).forEach(meta => {
    const { name } = meta;
    if (name === 'description') {
      meta.content = description || appDescription;
    }
    if (name === 'keywords') {
      meta.content = keywords || appKeywords;
    }
  });
};
