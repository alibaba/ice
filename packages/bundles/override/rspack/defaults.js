"use strict";
/**
 * The following code is modified based on
 * https://github.com/webpack/webpack/blob/4b4ca3b/lib/config/defaults.js
 *
 * MIT Licensed
 * Author Tobias Koppers @sokra
 * Copyright (c) JS Foundation and other contributors
 * https://github.com/webpack/webpack/blob/main/LICENSE
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyRspackOptionsBaseDefaults = exports.applyRspackOptionsDefaults = void 0;
const assert_1 = __importDefault(require("assert"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = require("../util");
const cleverMerge_1 = require("../util/cleverMerge");
const target_1 = require("./target");
const Template_1 = __importDefault(require("../Template"));
const assertNotNil_1 = require("../util/assertNotNil");
const ModuleTypeConstants_1 = require("../ModuleTypeConstants");
const applyRspackOptionsDefaults = (options) => {
    var _a;
    F(options, "context", () => process.cwd());
    F(options, "target", () => {
        return (0, target_1.getDefaultTarget)(options.context);
    });
    const { mode, target } = options;
    (0, assert_1.default)(!(0, util_1.isNil)(target));
    let targetProperties = target === false
        ? false
        : typeof target === "string"
            ? (0, target_1.getTargetProperties)(target, options.context)
            : (0, target_1.getTargetsProperties)(target, options.context);
    const development = mode === "development";
    const production = mode === "production" || !mode;
    if (typeof options.entry !== "function") {
        for (const key of Object.keys(options.entry)) {
            F(options.entry[key], "import", () => ["./src"]);
        }
    }
    F(options, "devtool", () => false);
    D(options, "watch", false);
    D(options, "profile", false);
    const futureDefaults = (_a = options.experiments.futureDefaults) !== null && _a !== void 0 ? _a : false;
    F(options, "cache", () => development);
    applyExperimentsDefaults(options.experiments, {
        cache: options.cache
    });
    // CUSTOM: add default rules for features options.
    if (options.features) {
      applyFeaturesDefaults(options.features);
    } else {
      D(options, 'features', {});
    }
    applySnapshotDefaults(options.snapshot, { production });
    applyModuleDefaults(options.module, {
        // syncWebAssembly: options.experiments.syncWebAssembly,
        asyncWebAssembly: options.experiments.asyncWebAssembly,
        disableTransformByDefault: options.experiments.rspackFuture.disableTransformByDefault,
        css: options.experiments.css
    });
    applyOutputDefaults(options.output, {
        context: options.context,
        targetProperties,
        isAffectedByBrowserslist: target === undefined ||
            (typeof target === "string" && target.startsWith("browserslist")) ||
            (Array.isArray(target) &&
                target.some(target => target.startsWith("browserslist"))),
        outputModule: options.experiments.outputModule,
        entry: options.entry,
        futureDefaults
    });
    applyExternalsPresetsDefaults(options.externalsPresets, {
        targetProperties
    });
    // @ts-expect-error
    F(options, "externalsType", () => {
        return options.output.library
            ? options.output.library.type
            : options.output.module
                ? "module"
                : "var";
    });
    applyNodeDefaults(options.node, { targetProperties });
    applyOptimizationDefaults(options.optimization, { production, development });
    options.resolve = (0, cleverMerge_1.cleverMerge)(getResolveDefaults({
        targetProperties,
        mode: options.mode
    }), options.resolve);
    options.resolveLoader = (0, cleverMerge_1.cleverMerge)(getResolveLoaderDefaults(), options.resolveLoader);
};
exports.applyRspackOptionsDefaults = applyRspackOptionsDefaults;
const applyRspackOptionsBaseDefaults = (options) => {
    F(options, "context", () => process.cwd());
    applyInfrastructureLoggingDefaults(options.infrastructureLogging);
};
exports.applyRspackOptionsBaseDefaults = applyRspackOptionsBaseDefaults;
const applyInfrastructureLoggingDefaults = (infrastructureLogging) => {
    F(infrastructureLogging, "stream", () => process.stderr);
    const tty = infrastructureLogging.stream.isTTY && process.env.TERM !== "dumb";
    D(infrastructureLogging, "level", "info");
    D(infrastructureLogging, "debug", false);
    D(infrastructureLogging, "colors", tty);
    D(infrastructureLogging, "appendOnly", !tty);
};
const applyExperimentsDefaults = (experiments, { cache }) => {
    D(experiments, "lazyCompilation", false);
    D(experiments, "asyncWebAssembly", false);
    D(experiments, "newSplitChunks", true);
    D(experiments, "css", true); // we not align with webpack about the default value for better DX
    D(experiments, "topLevelAwait", true);
    D(experiments, "incrementalRebuild", {});
    if (typeof experiments.incrementalRebuild === "object") {
        D(experiments.incrementalRebuild, "make", true);
        D(experiments.incrementalRebuild, "emitAsset", true);
    }
    if (cache === false &&
        experiments.incrementalRebuild &&
        experiments.incrementalRebuild.make) {
        experiments.incrementalRebuild.make = false;
        // TODO: use logger to warn user enable cache for incrementalRebuild.make
    }
    D(experiments, "rspackFuture", {});
    if (typeof experiments.rspackFuture === "object") {
        D(experiments.rspackFuture, "newResolver", true);
        D(experiments.rspackFuture, "newTreeshaking", false);
        D(experiments.rspackFuture, "disableTransformByDefault", true);
    }
};
const applyFeaturesDefaults = (features) => {
  D(features, 'split_chunks_strategy', {});
  if (typeof features.split_chunks_strategy === 'object') {
    D(features.split_chunks_strategy, 'name', '');
    D(features.split_chunks_strategy, 'topLevelFrameworks', []);
  }
};
const applySnapshotDefaults = (snapshot, { production }) => {
    F(snapshot, "module", () => production
        ? { timestamp: true, hash: true }
        : { timestamp: true, hash: false });
    F(snapshot, "resolve", () => production
        ? { timestamp: true, hash: true }
        : { timestamp: true, hash: false });
};
const applyJavascriptParserOptionsDefaults = (parserOptions) => {
    D(parserOptions, "dynamicImportMode", "lazy");
};
const applyModuleDefaults = (module, { asyncWebAssembly, css, disableTransformByDefault }) => {
    (0, assertNotNil_1.assertNotNill)(module.parser);
    F(module.parser, ModuleTypeConstants_1.ASSET_MODULE_TYPE, () => ({}));
    (0, assertNotNil_1.assertNotNill)(module.parser.asset);
    F(module.parser.asset, "dataUrlCondition", () => ({}));
    if (typeof module.parser.asset.dataUrlCondition === "object") {
        D(module.parser.asset.dataUrlCondition, "maxSize", 8096);
    }
    F(module.parser, "javascript", () => ({}));
    (0, assertNotNil_1.assertNotNill)(module.parser.javascript);
    applyJavascriptParserOptionsDefaults(module.parser.javascript);
    A(module, "defaultRules", () => {
        const esm = {
            type: "javascript/esm",
            resolve: {
                byDependency: {
                    esm: {
                        fullySpecified: true
                    }
                }
            }
        };
        const commonjs = {
            type: "javascript/dynamic"
        };
        const rules = [
            {
                mimetype: "application/node",
                type: "javascript/auto"
            },
            {
                test: /\.json$/i,
                type: "json"
            },
            {
                mimetype: "application/json",
                type: "json"
            },
            {
                test: /\.mjs$/i,
                ...esm
            },
            {
                test: /\.js$/i,
                descriptionData: {
                    type: "module"
                },
                ...esm
            },
            {
                test: /\.cjs$/i,
                ...commonjs
            },
            {
                test: /\.js$/i,
                descriptionData: {
                    type: "commonjs"
                },
                ...commonjs
            },
            {
                mimetype: {
                    or: ["text/javascript", "application/javascript"]
                },
                ...esm
            }
        ];
        // TODO: remove in 0.5.0
        if (!disableTransformByDefault) {
            rules.push({
                test: /\.jsx$/i,
                type: "jsx"
            }, {
                test: /\.ts$/i,
                type: "ts"
            }, {
                test: /\.tsx$/i,
                type: "tsx"
            });
        }
        if (asyncWebAssembly) {
            const wasm = {
                type: "webassembly/async",
                rules: [
                    {
                        descriptionData: {
                            type: "module"
                        },
                        resolve: {
                            fullySpecified: true
                        }
                    }
                ]
            };
            rules.push({
                test: /\.wasm$/i,
                ...wasm
            });
            rules.push({
                mimetype: "application/wasm",
                ...wasm
            });
        }
        if (css) {
            const cssRule = {
                type: "css",
                resolve: {
                    fullySpecified: true,
                    preferRelative: true
                }
            };
            const cssModulesRule = {
                type: "css/module",
                resolve: {
                    fullySpecified: true
                }
            };
            rules.push({
                test: /\.css$/i,
                oneOf: [
                    {
                        test: /\.module\.css$/i,
                        ...cssModulesRule
                    },
                    {
                        ...cssRule
                    }
                ]
            });
            rules.push({
                mimetype: "text/css+module",
                ...cssModulesRule
            });
            rules.push({
                mimetype: "text/css",
                ...cssRule
            });
        }
        rules.push({
            dependency: "url",
            oneOf: [
                {
                    scheme: /^data$/,
                    type: "asset/inline"
                },
                {
                    type: "asset/resource"
                }
            ]
        });
        return rules;
    });
};
const applyOutputDefaults = (output, { context, outputModule, targetProperties: tp, isAffectedByBrowserslist, entry, futureDefaults }) => {
    const getLibraryName = (library) => {
        const libraryName = typeof library === "object" &&
            library &&
            !Array.isArray(library) &&
            "type" in library
            ? library.name
            : library;
        if (Array.isArray(libraryName)) {
            return libraryName.join(".");
        }
        else if (typeof libraryName === "object") {
            return getLibraryName(libraryName.root);
        }
        else if (typeof libraryName === "string") {
            return libraryName;
        }
        return "";
    };
    F(output, "uniqueName", () => {
        const libraryName = getLibraryName(output.library).replace(/^\[(\\*[\w:]+\\*)\](\.)|(\.)\[(\\*[\w:]+\\*)\](?=\.|$)|\[(\\*[\w:]+\\*)\]/g, (m, a, d1, d2, b, c) => {
            const content = a || b || c;
            return content.startsWith("\\") && content.endsWith("\\")
                ? `${d2 || ""}[${content.slice(1, -1)}]${d1 || ""}`
                : "";
        });
        if (libraryName)
            return libraryName;
        const pkgPath = path_1.default.resolve(context, "package.json");
        try {
            const packageInfo = JSON.parse(fs_1.default.readFileSync(pkgPath, "utf-8"));
            return packageInfo.name || "";
        }
        catch (e) {
            if (e.code !== "ENOENT") {
                e.message += `\nwhile determining default 'output.uniqueName' from 'name' in ${pkgPath}`;
                throw e;
            }
            return "";
        }
    });
    F(output, "chunkLoadingGlobal", () => Template_1.default.toIdentifier("webpackChunk" + Template_1.default.toIdentifier(output.uniqueName)));
    F(output, "module", () => !!outputModule);
    D(output, "filename", output.module ? "[name].mjs" : "[name].js");
    F(output, "iife", () => !output.module);
    F(output, "chunkFilename", () => {
        const filename = output.filename;
        if (typeof filename !== "function") {
            const hasName = filename.includes("[name]");
            const hasId = filename.includes("[id]");
            const hasChunkHash = filename.includes("[chunkhash]");
            const hasContentHash = filename.includes("[contenthash]");
            // Anything changing depending on chunk is fine
            if (hasChunkHash || hasContentHash || hasName || hasId)
                return filename;
            // Otherwise prefix "[id]." in front of the basename to make it changing
            return filename.replace(/(^|\/)([^/]*(?:\?|$))/, "$1[id].$2");
        }
        return "[id].js";
    });
    F(output, "cssFilename", () => {
        const filename = output.filename;
        if (typeof filename !== "function") {
            return filename.replace(/\.[mc]?js(\?|$)/, ".css$1");
        }
        return "[id].css";
    });
    F(output, "cssChunkFilename", () => {
        const chunkFilename = output.chunkFilename;
        if (typeof chunkFilename !== "function") {
            return chunkFilename.replace(/\.[mc]?js(\?|$)/, ".css$1");
        }
        return "[id].css";
    });
    D(output, "hotUpdateChunkFilename", `[id].[fullhash].hot-update.${output.module ? "mjs" : "js"}`);
    D(output, "hotUpdateMainFilename", "[runtime].[fullhash].hot-update.json");
    F(output, "hotUpdateGlobal", () => Template_1.default.toIdentifier("webpackHotUpdate" + Template_1.default.toIdentifier(output.uniqueName)));
    D(output, "assetModuleFilename", "[hash][ext][query]");
    D(output, "webassemblyModuleFilename", "[hash].module.wasm");
    F(output, "path", () => path_1.default.join(process.cwd(), "dist"));
    D(output, "publicPath", tp && (tp.document || tp.importScripts) ? "auto" : "");
    D(output, "hashFunction", futureDefaults ? "xxhash64" : "md4");
    D(output, "hashDigest", "hex");
    D(output, "hashDigestLength", futureDefaults ? 16 : 20);
    D(output, "strictModuleErrorHandling", false);
    if (output.library) {
        F(output.library, "type", () => (output.module ? "module" : "var"));
    }
    F(output, "chunkFormat", () => {
        if (tp) {
            const helpMessage = isAffectedByBrowserslist
                ? "Make sure that your 'browserslist' includes only platforms that support these features or select an appropriate 'target' to allow selecting a chunk format by default. Alternatively specify the 'output.chunkFormat' directly."
                : "Select an appropriate 'target' to allow selecting one by default, or specify the 'output.chunkFormat' directly.";
            if (output.module) {
                if (tp.dynamicImport)
                    return "module";
                if (tp.document)
                    return "array-push";
                throw new Error("For the selected environment is no default ESM chunk format available:\n" +
                    "ESM exports can be chosen when 'import()' is available.\n" +
                    "JSONP Array push can be chosen when 'document' is available.\n" +
                    helpMessage);
            }
            else {
                if (tp.document)
                    return "array-push";
                if (tp.require)
                    return "commonjs";
                if (tp.nodeBuiltins)
                    return "commonjs";
                if (tp.importScripts)
                    return "array-push";
                throw new Error("For the selected environment is no default script chunk format available:\n" +
                    "JSONP Array push can be chosen when 'document' or 'importScripts' is available.\n" +
                    "CommonJs exports can be chosen when 'require' or node builtins are available.\n" +
                    helpMessage);
            }
        }
        throw new Error("Chunk format can't be selected by default when no target is specified");
    });
    D(output, "asyncChunks", true);
    F(output, "chunkLoading", () => {
        if (tp) {
            switch (output.chunkFormat) {
                case "array-push":
                    if (tp.document)
                        return "jsonp";
                    if (tp.importScripts)
                        return "import-scripts";
                    break;
                case "commonjs":
                    if (tp.require)
                        return "require";
                    if (tp.nodeBuiltins)
                        return "async-node";
                    break;
                case "module":
                    if (tp.dynamicImport)
                        return "import";
                    break;
            }
            if (tp.require === null ||
                tp.nodeBuiltins === null ||
                tp.document === null ||
                tp.importScripts === null) {
                return "universal";
            }
        }
        return false;
    });
    F(output, "workerChunkLoading", () => {
        if (tp) {
            switch (output.chunkFormat) {
                case "array-push":
                    if (tp.importScriptsInWorker)
                        return "import-scripts";
                    break;
                case "commonjs":
                    if (tp.require)
                        return "require";
                    if (tp.nodeBuiltins)
                        return "async-node";
                    break;
                case "module":
                    if (tp.dynamicImportInWorker)
                        return "import";
                    break;
            }
            if (tp.require === null ||
                tp.nodeBuiltins === null ||
                tp.importScriptsInWorker === null) {
                return "universal";
            }
        }
        return false;
    });
    F(output, "wasmLoading", () => {
        if (tp) {
            if (tp.fetchWasm)
                return "fetch";
            if (tp.nodeBuiltins)
                return output.module ? "async-node-module" : "async-node";
            if (tp.nodeBuiltins === null || tp.fetchWasm === null) {
                return "universal";
            }
        }
        return false;
    });
    F(output, "workerWasmLoading", () => output.wasmLoading);
    F(output, "globalObject", () => {
        if (tp) {
            if (tp.global)
                return "global";
            if (tp.globalThis)
                return "globalThis";
        }
        return "self";
    });
    D(output, "importFunctionName", "import");
    F(output, "clean", () => !!output.clean);
    D(output, "crossOriginLoading", false);
    D(output, "workerPublicPath", "");
    F(output, "sourceMapFilename", () => {
        return "[file].map";
    });
    F(output, "scriptType", () => (output.module ? "module" : false));
    const { trustedTypes } = output;
    if (trustedTypes) {
        F(trustedTypes, "policyName", () => output.uniqueName.replace(/[^a-zA-Z0-9\-#=_/@.%]+/g, "_") || "webpack");
    }
    const forEachEntry = (fn) => {
        for (const name of Object.keys(entry)) {
            fn(entry[name]);
        }
    };
    A(output, "enabledLibraryTypes", () => {
        const enabledLibraryTypes = [];
        if (output.library) {
            enabledLibraryTypes.push(output.library.type);
        }
        forEachEntry(desc => {
            if (desc.library) {
                enabledLibraryTypes.push(desc.library.type);
            }
        });
        return enabledLibraryTypes;
    });
    A(output, "enabledChunkLoadingTypes", () => {
        const enabledChunkLoadingTypes = new Set();
        if (output.chunkLoading) {
            enabledChunkLoadingTypes.add(output.chunkLoading);
        }
        if (output.workerChunkLoading) {
            enabledChunkLoadingTypes.add(output.workerChunkLoading);
        }
        forEachEntry(desc => {
            if (desc.chunkLoading) {
                enabledChunkLoadingTypes.add(desc.chunkLoading);
            }
        });
        return Array.from(enabledChunkLoadingTypes);
    });
    A(output, "enabledWasmLoadingTypes", () => {
        const enabledWasmLoadingTypes = new Set();
        if (output.wasmLoading) {
            enabledWasmLoadingTypes.add(output.wasmLoading);
        }
        if (output.workerWasmLoading) {
            enabledWasmLoadingTypes.add(output.workerWasmLoading);
        }
        // forEachEntry(desc => {
        // 	if (desc.wasmLoading) {
        // 		enabledWasmLoadingTypes.add(desc.wasmLoading);
        // 	}
        // });
        return Array.from(enabledWasmLoadingTypes);
    });
};
const applyExternalsPresetsDefaults = (externalsPresets, { targetProperties }) => {
    D(externalsPresets, "web", targetProperties && targetProperties.web);
    D(externalsPresets, "node", targetProperties && targetProperties.node);
    D(externalsPresets, "electron", targetProperties && targetProperties.electron);
    D(externalsPresets, "electronMain", targetProperties &&
        targetProperties.electron &&
        targetProperties.electronMain);
    D(externalsPresets, "electronPreload", targetProperties &&
        targetProperties.electron &&
        targetProperties.electronPreload);
    D(externalsPresets, "electronRenderer", targetProperties &&
        targetProperties.electron &&
        targetProperties.electronRenderer);
};
const applyNodeDefaults = (node, { targetProperties }) => {
    if (node === false)
        return;
    F(node, "global", () => {
        if (targetProperties && targetProperties.global)
            return false;
        return "warn";
    });
    F(node, "__dirname", () => {
        if (targetProperties && targetProperties.node)
            return "eval-only";
        return "warn-mock";
    });
    F(node, "__filename", () => {
        if (targetProperties && targetProperties.node)
            return "eval-only";
        return "warn-mock";
    });
};
const applyOptimizationDefaults = (optimization, { production, development }) => {
    D(optimization, "removeAvailableModules", true);
    D(optimization, "removeEmptyChunks", true);
    D(optimization, "mergeDuplicateChunks", true);
    F(optimization, "moduleIds", () => {
        if (production)
            return "deterministic";
        return "named";
    });
    F(optimization, "chunkIds", () => "named");
    F(optimization, "sideEffects", () => (production ? true : "flag"));
    D(optimization, "mangleExports", production);
    D(optimization, "providedExports", true);
    D(optimization, "usedExports", production);
    D(optimization, "innerGraph", production);
    D(optimization, "runtimeChunk", false);
    D(optimization, "realContentHash", production);
    D(optimization, "minimize", production);
    A(optimization, "minimizer", () => [
    // TODO: enable this when drop support for builtins options
    // new SwcJsMinimizerPlugin(),
    // new SwcCssMinimizerPlugin()
    ]);
    F(optimization, "nodeEnv", () => {
        if (production)
            return "production";
        if (development)
            return "development";
        return false;
    });
    const { splitChunks } = optimization;
    if (splitChunks) {
        // A(splitChunks, "defaultSizeTypes", () =>
        // 	css ? ["javascript", "css", "unknown"] : ["javascript", "unknown"]
        // );
        D(splitChunks, "hidePathInfo", production);
        D(splitChunks, "chunks", "async");
        // D(splitChunks, "usedExports", optimization.usedExports === true);
        D(splitChunks, "minChunks", 1);
        F(splitChunks, "minSize", () => (production ? 20000 : 10000));
        // F(splitChunks, "minRemainingSize", () => (development ? 0 : undefined));
        // F(splitChunks, "enforceSizeThreshold", () => (production ? 50000 : 30000));
        F(splitChunks, "maxAsyncRequests", () => (production ? 30 : Infinity));
        F(splitChunks, "maxInitialRequests", () => (production ? 30 : Infinity));
        D(splitChunks, "automaticNameDelimiter", "-");
        const { cacheGroups } = splitChunks;
        if (cacheGroups) {
            F(cacheGroups, "default", () => ({
                idHint: "",
                reuseExistingChunk: true,
                minChunks: 2,
                priority: -20
            }));
            F(cacheGroups, "defaultVendors", () => ({
                idHint: "vendors",
                reuseExistingChunk: true,
                test: /[\\/]node_modules[\\/]/i,
                priority: -10
            }));
        }
    }
};
const getResolveLoaderDefaults = () => {
    const resolveOptions = {
        conditionNames: ["loader", "require", "node"],
        exportsFields: ["exports"],
        mainFields: ["loader", "main"],
        extensions: [".js"],
        mainFiles: ["index"]
    };
    return resolveOptions;
};
const getResolveDefaults = ({ targetProperties, mode }) => {
    const conditions = ["webpack"];
    conditions.push(mode === "development" ? "development" : "production");
    if (targetProperties) {
        if (targetProperties.webworker)
            conditions.push("worker");
        if (targetProperties.node)
            conditions.push("node");
        if (targetProperties.web)
            conditions.push("browser");
        if (targetProperties.electron)
            conditions.push("electron");
        if (targetProperties.nwjs)
            conditions.push("nwjs");
    }
    const jsExtensions = [".js", ".json", ".wasm", ".tsx", ".ts", ".jsx"];
    const tp = targetProperties;
    const browserField = tp && tp.web && (!tp.node || (tp.electron && tp.electronRenderer));
    const cjsDeps = () => ({
        browserField,
        mainFields: browserField ? ["browser", "module", "..."] : ["module", "..."],
        conditionNames: ["require", "module", "..."],
        extensions: [...jsExtensions]
    });
    const esmDeps = () => ({
        browserField,
        mainFields: browserField ? ["browser", "module", "..."] : ["module", "..."],
        conditionNames: ["import", "module", "..."],
        extensions: [...jsExtensions]
    });
    const resolveOptions = {
        modules: ["node_modules"],
        conditionNames: conditions,
        mainFiles: ["index"],
        extensions: [],
        browserField,
        mainFields: ["main"].filter(Boolean),
        exportsFields: ["exports"],
        byDependency: {
            wasm: esmDeps(),
            esm: esmDeps(),
            url: {
                preferRelative: true
            },
            worker: {
                ...esmDeps(),
                preferRelative: true
            },
            commonjs: cjsDeps(),
            // amd: cjsDeps(),
            // for backward-compat: loadModule
            // loader: cjsDeps(),
            // for backward-compat: Custom Dependency and getResolve without dependencyType
            unknown: cjsDeps()
        }
    };
    return resolveOptions;
};
const D = (obj, prop, value) => {
    if (obj[prop] === undefined) {
        obj[prop] = value;
    }
};
const F = (obj, prop, factory) => {
    if (obj[prop] === undefined) {
        obj[prop] = factory();
    }
};
const A = (obj, prop, factory) => {
    const value = obj[prop];
    if (value === undefined) {
        obj[prop] = factory();
    }
    else if (Array.isArray(value)) {
        let newArray = undefined;
        for (let i = 0; i < value.length; i++) {
            const item = value[i];
            if (item === "...") {
                if (newArray === undefined) {
                    newArray = value.slice(0, i);
                    // @ts-expect-error
                    obj[prop] = newArray;
                }
                const items = factory();
                if (items !== undefined) {
                    for (const item of items) {
                        newArray.push(item);
                    }
                }
            }
            else if (newArray !== undefined) {
                newArray.push(item);
            }
        }
    }
};
