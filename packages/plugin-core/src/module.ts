const module = ({ addProvider, appConfig }) => {
  const { addProvider: Provider } = appConfig || {};
  addProvider(Provider);
}

export default module;
