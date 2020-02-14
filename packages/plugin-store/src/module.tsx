import * as React from 'react'
import AppStore from '$ice/appModels'
import PageStores from '$ice/pageModels'

const wrapperComponent = (PageComponent) => {
  const StoreWrapperedComponent = () => {
    const pageComponentName = PageComponent.name
    const PageStore = PageStores[pageComponentName]
    if (PageStore) {
      return (
        <PageStore.Provider>
          <PageComponent />
        </PageStore.Provider>
      )
    }
    return <PageComponent />
  }

  StoreWrapperedComponent.pageConfig = PageComponent.pageConfig
  StoreWrapperedComponent.getInitialProps = PageComponent.getInitialProps
  return StoreWrapperedComponent
}


export default ({ addProvider, wrapperRouteComponent }) => {
  wrapperRouteComponent(wrapperComponent);

  const StoreProvider = ({children}) => {
    return (
      <AppStore.Provider>
        {children}
      </AppStore.Provider>
    )
  }

  addProvider(StoreProvider)
}
