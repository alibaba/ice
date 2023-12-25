"use strict";
/**
 * The following code is modified based on
 * https://github.com/webpack/webpack/blob/4b4ca3b/lib/config/normalization.js
 *
 * MIT Licensed
 * Author Tobias Koppers @sokra
 * Copyright (c) JS Foundation and other contributors
 * https://github.com/webpack/webpack/blob/main/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNormalizedRspackOptions = void 0;
const util_1 = require("../util");
const getNormalizedRspackOptions = (config) => {
    return {
        features: config.features,
        ignoreWarnings: config.ignoreWarnings !== undefined
            ? config.ignoreWarnings.map(ignore => {
                if (typeof ignore === "function") {
                    return ignore;
                }
                else {
                    return (warning) => {
                        return ignore.test(warning.message);
                    };
                }
            })
            : undefined,
        name: config.name,
        dependencies: config.dependencies,
        context: config.context,
        mode: config.mode,
        entry: config.entry === undefined
            ? { main: {} }
            : getNormalizedEntryStatic(config.entry),
        output: nestedConfig(config.output, output => {
            var _a;
            const { library } = output;
            const libraryAsName = library;
            const libraryBase = typeof library === "object" &&
                library &&
                !Array.isArray(library) &&
                "type" in library
                ? library
                : libraryAsName || output.libraryTarget
                    ? {
                        name: libraryAsName
                    }
                    : undefined;
            // DEPRECATE: remove this in after version
            {
                const ext = "[ext]";
                const filenames = [
                    "filename",
                    "chunkFilename",
                    "cssFilename",
                    "cssChunkFilename"
                ];
                const checkFilename = (prop) => {
                    const oldFilename = output[prop];
                    if (typeof oldFilename === "string" && oldFilename.endsWith(ext)) {
                        const newFilename = oldFilename.slice(0, -ext.length) +
                            (prop.includes("css") ? ".css" : ".js");
                        (0, util_1.deprecatedWarn)(`Deprecated: output.${prop} ends with [ext] is now deprecated, please use ${newFilename} instead.`);
                        output[prop] = newFilename;
                    }
                };
                filenames.forEach(checkFilename);
            }
            return {
                path: output.path,
                publicPath: output.publicPath,
                filename: output.filename,
                clean: output.clean,
                chunkFormat: output.chunkFormat,
                chunkLoading: output.chunkLoading,
                chunkFilename: output.chunkFilename,
                crossOriginLoading: output.crossOriginLoading,
                cssFilename: output.cssFilename,
                cssChunkFilename: output.cssChunkFilename,
                hotUpdateMainFilename: output.hotUpdateMainFilename,
                hotUpdateChunkFilename: output.hotUpdateChunkFilename,
                hotUpdateGlobal: output.hotUpdateGlobal,
                assetModuleFilename: output.assetModuleFilename,
                wasmLoading: output.wasmLoading,
                enabledChunkLoadingTypes: output.enabledChunkLoadingTypes
                    ? [...output.enabledChunkLoadingTypes]
                    : ["..."],
                enabledWasmLoadingTypes: output.enabledWasmLoadingTypes
                    ? [...output.enabledWasmLoadingTypes]
                    : ["..."],
                webassemblyModuleFilename: output.webassemblyModuleFilename,
                uniqueName: output.uniqueName,
                chunkLoadingGlobal: output.chunkLoadingGlobal,
                enabledLibraryTypes: output.enabledLibraryTypes
                    ? [...output.enabledLibraryTypes]
                    : ["..."],
                globalObject: output.globalObject,
                importFunctionName: output.importFunctionName,
                iife: output.iife,
                module: output.module,
                sourceMapFilename: output.sourceMapFilename,
                library: libraryBase && {
                    type: output.libraryTarget !== undefined
                        ? output.libraryTarget
                        : libraryBase.type,
                    auxiliaryComment: output.auxiliaryComment !== undefined
                        ? output.auxiliaryComment
                        : libraryBase.auxiliaryComment,
                    amdContainer: output.amdContainer !== undefined
                        ? output.amdContainer
                        : libraryBase.amdContainer,
                    export: output.libraryExport !== undefined
                        ? output.libraryExport
                        : libraryBase.export,
                    name: libraryBase.name,
                    umdNamedDefine: output.umdNamedDefine !== undefined
                        ? output.umdNamedDefine
                        : libraryBase.umdNamedDefine
                },
                strictModuleErrorHandling: (_a = output.strictModuleErrorHandling) !== null && _a !== void 0 ? _a : output.strictModuleExceptionHandling,
                trustedTypes: optionalNestedConfig(output.trustedTypes, trustedTypes => {
                    if (trustedTypes === true)
                        return {};
                    if (typeof trustedTypes === "string")
                        return { policyName: trustedTypes };
                    return { ...trustedTypes };
                }),
                hashDigest: output.hashDigest,
                hashDigestLength: output.hashDigestLength,
                hashFunction: output.hashFunction,
                hashSalt: output.hashSalt,
                asyncChunks: output.asyncChunks,
                workerChunkLoading: output.workerChunkLoading,
                workerWasmLoading: output.workerWasmLoading,
                workerPublicPath: output.workerPublicPath,
                scriptType: output.scriptType
            };
        }),
        resolve: nestedConfig(config.resolve, resolve => ({
            ...resolve
        })),
        resolveLoader: nestedConfig(config.resolveLoader, resolve => ({
            ...resolve
        })),
        module: nestedConfig(config.module, module => ({
            parser: keyedNestedConfig(module.parser, cloneObject, {}),
            generator: keyedNestedConfig(module.generator, cloneObject, {}),
            defaultRules: optionalNestedArray(module.defaultRules, r => [...r]),
            rules: nestedArray(module.rules, r => [...r])
        })),
        target: config.target,
        externals: config.externals,
        externalsType: config.externalsType,
        externalsPresets: cloneObject(config.externalsPresets),
        infrastructureLogging: cloneObject(config.infrastructureLogging),
        devtool: config.devtool,
        node: nestedConfig(config.node, node => node && {
            ...node
        }),
        snapshot: nestedConfig(config.snapshot, snapshot => ({
            resolve: optionalNestedConfig(snapshot.resolve, resolve => ({
                timestamp: resolve.timestamp,
                hash: resolve.hash
            })),
            module: optionalNestedConfig(snapshot.module, module => ({
                timestamp: module.timestamp,
                hash: module.hash
            }))
        })),
        cache: optionalNestedConfig(config.cache, cache => cache),
        stats: nestedConfig(config.stats, stats => {
            if (stats === false) {
                return {
                    preset: "none"
                };
            }
            if (stats === true) {
                return {
                    preset: "normal"
                };
            }
            if (typeof stats === "string") {
                return {
                    preset: stats
                };
            }
            return {
                ...stats
            };
        }),
        optimization: nestedConfig(config.optimization, optimization => {
            return {
                ...optimization,
                runtimeChunk: getNormalizedOptimizationRuntimeChunk(optimization.runtimeChunk),
                splitChunks: nestedConfig(optimization.splitChunks, splitChunks => splitChunks && {
                    ...splitChunks,
                    cacheGroups: cloneObject(splitChunks.cacheGroups)
                })
            };
        }),
        plugins: nestedArray(config.plugins, p => [...p]),
        experiments: nestedConfig(config.experiments, experiments => ({
            ...experiments,
            incrementalRebuild: optionalNestedConfig(experiments.incrementalRebuild, options => (options === true ? {} : options))
        })),
        watch: config.watch,
        watchOptions: cloneObject(config.watchOptions),
        devServer: config.devServer,
        profile: config.profile,
        builtins: nestedConfig(config.builtins, builtins => ({
            ...builtins
        }))
    };
};
exports.getNormalizedRspackOptions = getNormalizedRspackOptions;
const getNormalizedEntryStatic = (entry) => {
    if (typeof entry === "string") {
        return {
            main: {
                import: [entry]
            }
        };
    }
    if (Array.isArray(entry)) {
        return {
            main: {
                import: entry
            }
        };
    }
    const result = {};
    for (const key of Object.keys(entry)) {
        const value = entry[key];
        if (typeof value === "string") {
            result[key] = {
                import: [value]
            };
        }
        else if (Array.isArray(value)) {
            result[key] = {
                import: value
            };
        }
        else {
            result[key] = {
                import: Array.isArray(value.import) ? value.import : [value.import],
                runtime: value.runtime,
                publicPath: value.publicPath,
                baseUri: value.baseUri,
                chunkLoading: value.chunkLoading,
                asyncChunks: value.asyncChunks,
                filename: value.filename,
                library: value.library
            };
        }
    }
    return result;
};
const getNormalizedOptimizationRuntimeChunk = (runtimeChunk) => {
    if (runtimeChunk === undefined)
        return undefined;
    if (runtimeChunk === false)
        return false;
    if (runtimeChunk === "single") {
        return {
            name: () => "runtime"
        };
    }
    if (runtimeChunk === true || runtimeChunk === "multiple") {
        return {
            name: (entrypoint) => `runtime~${entrypoint.name}`
        };
    }
    const { name } = runtimeChunk;
    const opts = {
        name: typeof name === "function" ? name : () => name
    };
    return opts;
};
const nestedConfig = (value, fn) => value === undefined ? fn({}) : fn(value);
const optionalNestedConfig = (value, fn) => (value === undefined ? undefined : fn(value));
const nestedArray = (value, fn) => Array.isArray(value) ? fn(value) : fn([]);
const optionalNestedArray = (value, fn) => (Array.isArray(value) ? fn(value) : undefined);
const cloneObject = (value) => ({ ...value });
const keyedNestedConfig = (value, fn, customKeys) => {
    const result = value === undefined
        ? {}
        : Object.keys(value).reduce((obj, key) => ((obj[key] = (customKeys && key in customKeys ? customKeys[key] : fn)(value[key])),
            obj), {});
    if (customKeys) {
        for (const key of Object.keys(customKeys)) {
            if (!(key in result)) {
                result[key] = customKeys[key]({});
            }
        }
    }
    return result;
};
