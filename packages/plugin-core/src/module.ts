const module = ({ addProvider, appConfig }) => {
  const { addProvider: Provider } = appConfig || {};
  if (Provider) {
    addProvider(Provider);
  }
}

export default module;
