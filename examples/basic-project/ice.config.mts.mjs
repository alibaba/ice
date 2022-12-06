// examples/basic-project/ice.config.mts
import { defineConfig } from "@ice/app";
import SpeedMeasurePlugin from "speed-measure-webpack-plugin";

// examples/basic-project/plugin.ts
import fs from "fs";
function createPlugin() {
  return {
    name: "custom-plugin",
    setup({ onGetConfig }) {
      onGetConfig((config) => {
        config.transformPlugins = [...config.transformPlugins || [], {
          name: "custom-transform",
          transformInclude(id) {
            return !!id.match(/app.tsx$/);
          },
          loadInclude(id) {
            return !!id.match(/app.tsx$/);
          },
          load(id) {
            return fs.readFileSync(id, "utf-8");
          },
          transform(code) {
            return code;
          }
        }];
      });
    }
  };
}

// examples/basic-project/ice.config.mts
var ice_config_default = defineConfig(() => ({
  publicPath: "/",
  polyfill: "entry",
  syntaxFeatures: {
    exportDefaultFrom: true
  },
  define: {
    HAHA: JSON.stringify(true),
    "process.env.HAHA": JSON.stringify(true)
  },
  transform: (code, id) => {
    if (id.includes("src/pages") && id.endsWith(".js")) {
      return code;
    }
    return null;
  },
  webpack: (webpackConfig) => {
    if (process.env.NODE_ENV !== "test") {
      webpackConfig.plugins?.push(new SpeedMeasurePlugin());
    }
    return webpackConfig;
  },
  dropLogLevel: process.env.ICE_ENV === "common" ? "warn" : "error",
  plugins: [
    createPlugin()
  ],
  eslint: true
}));
export {
  ice_config_default as default
};
