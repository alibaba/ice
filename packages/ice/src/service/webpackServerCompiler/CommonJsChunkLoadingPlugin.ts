/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

'use strict';

import webpack from 'webpack';
import type { Compiler, Chunk } from 'webpack';
import StartupChunkDependenciesPlugin from 'webpack/lib/runtime/StartupChunkDependenciesPlugin.js';
import WormholeChunkLoadingRuntimeModule from './WormholeChunkLoadingRuntimeModule.js';

const { RuntimeGlobals } = webpack;

class CommonJsChunkLoadingPlugin {
	apply(compiler: Compiler) {
    webpack.javascript.EnableChunkLoadingPlugin.setEnabled(compiler, 'async-wormhole');
		const ChunkLoadingRuntimeModule = WormholeChunkLoadingRuntimeModule;
		const chunkLoadingValue = 'async-wormhole';
		new StartupChunkDependenciesPlugin({
			chunkLoading: 'async-wormhole',
			asyncChunkLoading: true,
		}).apply(compiler);
		compiler.hooks.thisCompilation.tap(
			'CommonJsChunkLoadingPlugin',
			compilation => {
				const globalChunkLoading = compilation.outputOptions.chunkLoading;
				const isEnabledForChunk = (chunk: Chunk) => {
					const options = chunk.getEntryOptions();
					const chunkLoading =
						options && options.chunkLoading !== undefined
							? options.chunkLoading
							: globalChunkLoading;
					return chunkLoading === chunkLoadingValue;
				};
				const onceForChunkSet = new WeakSet();
				const handler = (chunk: Chunk, set: Set<string>) => {
					if (onceForChunkSet.has(chunk)) return;
					onceForChunkSet.add(chunk);
					if (!isEnabledForChunk(chunk)) return;
					set.add(RuntimeGlobals.moduleFactoriesAddOnly);
					set.add(RuntimeGlobals.hasOwnProperty);
          set.add(RuntimeGlobals.moduleCache);
					compilation.addRuntimeModule(
						chunk,
						new ChunkLoadingRuntimeModule(set),
					);
				};

				compilation.hooks.runtimeRequirementInTree
					.for(RuntimeGlobals.ensureChunkHandlers)
					.tap('CommonJsChunkLoadingPlugin', handler);
				compilation.hooks.runtimeRequirementInTree
					.for(RuntimeGlobals.hmrDownloadUpdateHandlers)
					.tap('CommonJsChunkLoadingPlugin', handler);
				compilation.hooks.runtimeRequirementInTree
					.for(RuntimeGlobals.hmrDownloadManifest)
					.tap('CommonJsChunkLoadingPlugin', handler);
				compilation.hooks.runtimeRequirementInTree
					.for(RuntimeGlobals.baseURI)
					.tap('CommonJsChunkLoadingPlugin', handler);
				compilation.hooks.runtimeRequirementInTree
					.for(RuntimeGlobals.externalInstallChunk)
					.tap('CommonJsChunkLoadingPlugin', handler);
				compilation.hooks.runtimeRequirementInTree
					.for(RuntimeGlobals.onChunksLoaded)
					.tap('CommonJsChunkLoadingPlugin', handler);

				compilation.hooks.runtimeRequirementInTree
					.for(RuntimeGlobals.ensureChunkHandlers)
					.tap('CommonJsChunkLoadingPlugin', (chunk, set) => {
						if (!isEnabledForChunk(chunk)) return;
						set.add(RuntimeGlobals.getChunkScriptFilename);
					});
				compilation.hooks.runtimeRequirementInTree
					.for(RuntimeGlobals.hmrDownloadUpdateHandlers)
					.tap('CommonJsChunkLoadingPlugin', (chunk, set) => {
						if (!isEnabledForChunk(chunk)) return;
						set.add(RuntimeGlobals.getChunkUpdateScriptFilename);
						set.add(RuntimeGlobals.moduleCache);
						set.add(RuntimeGlobals.hmrModuleData);
						set.add(RuntimeGlobals.moduleFactoriesAddOnly);
					});
				compilation.hooks.runtimeRequirementInTree
					.for(RuntimeGlobals.hmrDownloadManifest)
					.tap('CommonJsChunkLoadingPlugin', (chunk, set) => {
						if (!isEnabledForChunk(chunk)) return;
						set.add(RuntimeGlobals.getUpdateManifestFilename);
					});
			},
		);
	}
}

export default CommonJsChunkLoadingPlugin;
