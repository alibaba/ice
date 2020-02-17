import * as React from 'react'
import AppStore from '$ice/appModels'
import PageStores from '$ice/pageModels'

const wrapperComponent = (PageComponent) => {
  let initialStates = {}
  if (PageComponent.pageConfig && PageComponent.pageConfig.initialStates) {
    initialStates = PageComponent.pageConfig.initialStates
  }
  const StoreWrapperedComponent = () => {
    const pageComponentName = PageComponent.name
    const PageStore = PageStores[pageComponentName]
    if (PageStore) {
      return (
        <PageStore.Provider initialStates={initialStates}>
          <PageComponent />
        </PageStore.Provider>
      )
    }
    return <PageComponent />
  }
  return StoreWrapperedComponent
}


export default ({ addProvider, wrapperRouteComponent, appConfig }) => {
  wrapperRouteComponent(wrapperComponent);

  let initialStates = {}
  if (appConfig.store && appConfig.store.initialStates) {
    initialStates = appConfig.store.initialStates
  }

  const StoreProvider = ({children}) => {
    return (
      <AppStore.Provider initialStates={initialStates}>
        {children}
      </AppStore.Provider>
    )
  }

  addProvider(StoreProvider)
}
