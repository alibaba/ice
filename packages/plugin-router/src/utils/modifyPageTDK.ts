interface IPageTDKData {
  title?: string;
  description?: string;
  keywords?: string;
}

export default (pageTDKData: IPageTDKData) => {
  const appTDKData = (window as any).__ICE_APP_TDK__;

  const { title: appTitle, description: appDescription, keywords: appKeywords } = appTDKData;
  const { title: pageTitle, description: pageDescription, keywords: pageKeywords } = pageTDKData;

  const description = pageDescription || appDescription;
  const keywords = pageKeywords || appKeywords;

  const metaElements = Array.from(document.getElementsByTagName('meta'));
  const descriptionMetaElement = metaElements.find(meta => meta.name === 'description');
  const keywordsMetaElement = metaElements.find(meta => meta.name === 'keywords');
  // modify title, description, keywords in head element
  document.title = pageTitle || appTitle;
  modifyMetaElement(descriptionMetaElement, 'description', description);
  modifyMetaElement(keywordsMetaElement, 'keywords', keywords);
};

function modifyMetaElement(element: HTMLMetaElement, name: string, content: string) {
  const head = document.getElementsByTagName('head')[0];
  if (!head) {
    return;
  }
  if (content) {
    if (element) {
      // update the meta content
      element.content = content;
    } else {
      // add a new meta element
      const metaElement = document.createElement('meta');
      metaElement.name = name;
      metaElement.content = content;
      head.appendChild(metaElement);
    }
  } else if (element){
    // remove the previous element
    head.removeChild(element);
  }
}
