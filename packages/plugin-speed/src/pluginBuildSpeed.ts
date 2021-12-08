import { performance } from 'perf_hooks';
import type { Plugin } from 'vite';
import chalk from 'chalk';

interface SpeedData {
  [pluginName: string]: {
    [fileId: string]: number;
  }
}

class PluginSpeed {
  private speedData: SpeedData = {};

  public record(pluginName: string, id: string, time: number) {
    if (!this.speedData[pluginName]) {
      this.speedData[pluginName] = {};
    }
    this.speedData[pluginName][id] = Number(time.toFixed(2));
  }

  public clear() {
    this.speedData = {};
  }

  public colors(text: string, time: number) {
    let textModifier = chalk.bold;
    if (time > 100) textModifier = textModifier.red;
    else if (time > 50) textModifier = textModifier.yellow;
    else textModifier = textModifier.green;

    return textModifier(String(text));
  }

  public formateMsg() {
    // calculate time cost of each plugin
    const pluginMsg = {};
    const pluginNames = Object.keys(this.speedData);
    pluginNames.forEach((pluginName) => {
      const pluginData = this.speedData[pluginName];
      const ids = Object.keys(pluginData);
      ids.sort((a, b) => {
        return pluginData[b] - pluginData[a];
      });
      const timeCost = ids.reduce((pre, curr) => pre + pluginData[curr], 0);
      pluginMsg[pluginName] = {
        timeCost,
        msg: [
          `\nplugin name: ${chalk.bold(pluginName)}`,
          `time cost: ${this.colors(`${timeCost.toFixed(2)}ms`, timeCost)}`,
          `files that take the most time per plugin (TOP 5): ${ids.slice(0, 5).map((id) => `\n${id} (${this.colors(`${pluginData[id]}ms`, pluginData[id])})`)}`
        ].join('\n'),
      };
    });
    pluginNames.sort((a, b) => {
      return pluginMsg[b].timeCost - pluginMsg[a].timeCost;
    });
    pluginNames.forEach((pluginName) => {
      console.log(pluginMsg[pluginName].msg);
    });
    // clear data after log
    this.clear();
  }
}

const pluginSpeed = new PluginSpeed();

export function wrapPlugin(plugin: Plugin): Plugin {
  if (plugin.transform) {
    const _transform = plugin.transform;
    plugin.transform = async function (code, id, options) {
      const transformStart = performance.now();
      const result = await _transform.call(this, code, id, options);
      pluginSpeed.record(plugin.name, id, performance.now() - transformStart);
      return result;
    };
  }

  return plugin;
}

export function pluginBuildSpeed(): Plugin {
  return {
    name: 'vite-plugin-build-speed',
    enforce: 'pre',
    configureServer({ middlewares: app }) {
      // clear data before every start
      pluginSpeed.clear();
      return () => {
        app.use(async (req, res, next) => {
          if (req.originalUrl === '/__log_speed__') {
            pluginSpeed.formateMsg();
          }
          next();
        });
      };
    }
  };
}