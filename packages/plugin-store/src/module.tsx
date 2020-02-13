import * as React from 'react'
import AppStore from '$ice/appModels'
import PageStores from '$ice/pageModels'

const wrapperComponent = (PageComponent) => () => {
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
