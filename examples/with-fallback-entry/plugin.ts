export default function createPlugin() {
  return {
    name: 'custom-plugin',
    setup({ onGetConfig }) {
      onGetConfig((config) => {
        config.server = {
          fallbackEntry: true,
        };
      });
    },
  };
}
