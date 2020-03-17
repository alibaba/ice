import * as React from 'react'
import AppStore from '$ice/appModels'
import PageStores from '$ice/pageModels'

const wrapperComponent = (PageComponent) => {
  const { pageConfig = {} } = PageComponent
  const StoreWrapperedComponent = (props) => {
    const pageComponentName = pageConfig.componentName
    const PageStore = PageStores[pageComponentName]
    if (PageStore) {
      return (
        <PageStore.Provider initialStates={pageConfig.initialStates}>
          <PageComponent {...props}/>
        </PageStore.Provider>
      )
    }
    return <PageComponent {...props} />
  }
  return StoreWrapperedComponent
}


export default ({ addProvider, wrapperRouteComponent, appConfig }) => {
  wrapperRouteComponent(wrapperComponent);

  const StoreProvider = ({children}) => {
    let initialStates = {}
    if (appConfig.store && appConfig.store.initialStates) {
      initialStates = appConfig.store.initialStates
    }
    return (
      <AppStore.Provider initialStates={initialStates}>
        {children}
      </AppStore.Provider>
    )
  }

  if (AppStore) {
    addProvider(StoreProvider)
  }
}
