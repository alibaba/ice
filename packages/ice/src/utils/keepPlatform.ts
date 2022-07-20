export default function keepPlatform(target: string) {
  // config for swc transform
  // https://swc.rs/docs/configuration/compilation#jsctransformconstmodules
  const env = {
    isWeex: 'false',
    isWeb: 'false',
    isMiniApp: 'false',
    isNode: 'false',
    isWeChatMiniProgram: 'false',
    isByteDanceMicroApp: 'false',
    isBaiduSmartProgram: 'false',
    isKuaiShouMiniProgram: 'false',
  };

  const platform = `is${target[0].toUpperCase()}${target.slice(1)}`;

  env[platform] = 'true';

  return env;
}