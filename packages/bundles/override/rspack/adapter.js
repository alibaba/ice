// Copy from @rspack/core/dist/config/adapter.js
'use strict';
let __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.getRawLibrary = exports.getRawOptions = void 0;
const assert_1 = __importDefault(require('assert'));
const Stats_1 = require('../Stats');
const util_1 = require('../util');
const identifier_1 = require('../util/identifier');
const adapterRuleUse_1 = require('./adapterRuleUse');
const getRawOptions = (options, compiler, processResource) => {
    let _a,
_b;
    (0, assert_1.default)(!(0, util_1.isNil)(options.context) && !(0, util_1.isNil)(options.devtool) && !(0, util_1.isNil)(options.cache), 'context, devtool, cache should not be nil after defaults');
    const devtool = options.devtool === false ? '' : options.devtool;
    const { mode } = options;
    const experiments = getRawExperiments(options.experiments);
    return {
        // CUSTOM: add options of features.
        features: options.features,
        mode,
        target: getRawTarget(options.target),
        context: options.context,
        output: getRawOutput(options.output),
        resolve: getRawResolve(options.resolve),
        resolveLoader: getRawResolve(options.resolveLoader),
        module: getRawModule(options.module, {
            compiler,
            devtool,
            mode,
            context: options.context,
            experiments,
        }),
        devtool,
        optimization: getRawOptimization(options.optimization),
        stats: getRawStats(options.stats),
        devServer: {
            hot: (_b = (_a = options.devServer) === null || _a === void 0 ? void 0 : _a.hot) !== null && _b !== void 0 ? _b : false,
        },
        snapshot: getRawSnapshotOptions(options.snapshot),
        cache: {
            type: options.cache ? 'memory' : 'disable',
            // TODO: implement below cache options
            maxGenerations: 0,
            maxAge: 0,
            profile: false,
            buildDependencies: [],
            cacheDirectory: '',
            cacheLocation: '',
            name: '',
            version: '',
        },
        experiments,
        node: getRawNode(options.node),
        profile: options.profile,
        // TODO: remove this
        builtins: options.builtins,
    };
};
exports.getRawOptions = getRawOptions;
function getRawTarget(target) {
    if (!target) {
        return [];
    }
    if (typeof target === 'string') {
        return [target];
    }
    return target;
}
function getRawAlias(alias = {}) {
    const entires = Object.entries(alias).map(([key, value]) => {
        if (Array.isArray(value)) {
            return [key, value];
        } else {
            return [key, [value]];
        }
    });
    return Object.fromEntries(entires);
}
function getRawResolveByDependency(byDependency) {
    if (byDependency === undefined) return byDependency;
    return Object.fromEntries(Object.entries(byDependency).map(([k, v]) => [k, getRawResolve(v)]));
}
function getRawResolve(resolve) {
    let _a,
_b,
_c;
    let references = (_a = resolve.tsConfig) === null || _a === void 0 ? void 0 : _a.references;
    let tsconfigConfigFile = (_b = resolve.tsConfigPath) !== null && _b !== void 0 ? _b : (_c = resolve.tsConfig) === null || _c === void 0 ? void 0 : _c.configFile;
    return {
        ...resolve,
        alias: getRawAlias(resolve.alias),
        fallback: getRawAlias(resolve.fallback),
        extensionAlias: getRawAlias(resolve.extensionAlias),
        tsconfig: tsconfigConfigFile
            ? {
                configFile: tsconfigConfigFile,
                referencesType: references == 'auto' ? 'auto' : references ? 'manual' : 'disabled',
                references: references == 'auto' ? undefined : references,
            }
            : undefined,
        byDependency: getRawResolveByDependency(resolve.byDependency),
    };
}
function getRawCrossOriginLoading(crossOriginLoading) {
    if (typeof crossOriginLoading === 'boolean') {
        return { type: 'bool', boolPayload: crossOriginLoading };
    }
    return { type: 'string', stringPayload: crossOriginLoading };
}
function getRawOutput(output) {
    const { chunkLoading } = output;
    const { wasmLoading } = output;
    const { workerChunkLoading } = output;
    const { workerWasmLoading } = output;
    return {
        path: output.path,
        publicPath: output.publicPath,
        clean: output.clean,
        assetModuleFilename: output.assetModuleFilename,
        filename: output.filename,
        chunkFilename: output.chunkFilename,
        chunkLoading: chunkLoading === false ? 'false' : chunkLoading,
        crossOriginLoading: getRawCrossOriginLoading(output.crossOriginLoading),
        cssFilename: output.cssFilename,
        cssChunkFilename: output.cssChunkFilename,
        hotUpdateChunkFilename: output.hotUpdateChunkFilename,
        hotUpdateMainFilename: output.hotUpdateMainFilename,
        hotUpdateGlobal: output.hotUpdateGlobal,
        uniqueName: output.uniqueName,
        chunkLoadingGlobal: output.chunkLoadingGlobal,
        enabledLibraryTypes: output.enabledLibraryTypes,
        library: output.library && getRawLibrary(output.library),
        strictModuleErrorHandling: output.strictModuleErrorHandling,
        globalObject: output.globalObject,
        importFunctionName: output.importFunctionName,
        iife: output.iife,
        module: output.module,
        wasmLoading: wasmLoading === false ? 'false' : wasmLoading,
        enabledWasmLoadingTypes: output.enabledWasmLoadingTypes,
        enabledChunkLoadingTypes: output.enabledChunkLoadingTypes,
        webassemblyModuleFilename: output.webassemblyModuleFilename,
        trustedTypes: output.trustedTypes,
        sourceMapFilename: output.sourceMapFilename,
        hashFunction: output.hashFunction,
        hashDigest: output.hashDigest,
        hashDigestLength: output.hashDigestLength,
        hashSalt: output.hashSalt,
        asyncChunks: output.asyncChunks,
        workerChunkLoading: workerChunkLoading === false ? 'false' : workerChunkLoading,
        workerWasmLoading: workerWasmLoading === false ? 'false' : workerWasmLoading,
        workerPublicPath: output.workerPublicPath,
    };
}
function getRawLibrary(library) {
    const { type, name, export: libraryExport, umdNamedDefine, auxiliaryComment, amdContainer } = library;
    return {
        amdContainer,
        auxiliaryComment: typeof auxiliaryComment === 'string'
            ? {
                commonjs: auxiliaryComment,
                commonjs2: auxiliaryComment,
                amd: auxiliaryComment,
                root: auxiliaryComment,
            }
            : auxiliaryComment,
        libraryType: type,
        name: (0, util_1.isNil)(name) ? name : getRawLibraryName(name),
        export: Array.isArray(libraryExport) || libraryExport == null
            ? libraryExport
            : [libraryExport],
        umdNamedDefine,
    };
}
exports.getRawLibrary = getRawLibrary;
function getRawLibraryName(name) {
    if (typeof name === 'string') {
        return {
            type: 'string',
            stringPayload: name,
        };
    }
    if (Array.isArray(name)) {
        return {
            type: 'array',
            arrayPayload: name,
        };
    }
    if (typeof name === 'object' && !Array.isArray(name)) {
        return {
            type: 'umdObject',
            umdObjectPayload: {
                commonjs: name.commonjs,
                root: Array.isArray(name.root) || (0, util_1.isNil)(name.root)
                    ? name.root
                    : [name.root],
                amd: name.amd,
            },
        };
    }
    throw new Error('unreachable');
}
function getRawModule(module, options) {
    (0, assert_1.default)(!(0, util_1.isNil)(module.defaultRules), 'module.defaultRules should not be nil after defaults');
    // "..." in defaultRules will be flatten in `applyModuleDefaults`, and "..." in rules is empty, so it's safe to use `as RuleSetRule[]` at here
    const ruleSet = [
        { rules: module.defaultRules },
        { rules: module.rules },
    ];
    const rules = ruleSet.map((rule, index) => getRawModuleRule(rule, `ruleSet[${index}]`, options));
    return {
        rules,
        parser: getRawParserOptionsByModuleType(module.parser),
        generator: getRawGeneratorOptionsByModuleType(module.generator),
    };
}
function tryMatch(payload, condition) {
    if (typeof condition === 'string') {
        return payload.startsWith(condition);
    }
    if (condition instanceof RegExp) {
        return condition.test(payload);
    }
    if (typeof condition === 'function') {
        return condition(payload);
    }
    if (Array.isArray(condition)) {
        return condition.some(c => tryMatch(payload, c));
    }
    if (condition && typeof condition === 'object') {
        if (condition.and) {
            return condition.and.every(c => tryMatch(payload, c));
        }
        if (condition.or) {
            return condition.or.some(c => tryMatch(payload, c));
        }
        if (condition.not) {
            return condition.not.every(c => !tryMatch(payload, c));
        }
    }
    return false;
}
const deprecatedRuleType = (type) => {
    type !== null && type !== void 0 ? type : (type = 'javascript/auto');
    if (/ts|typescript|tsx|typescriptx|jsx|javascriptx/.test(type)) {
        (0, util_1.deprecatedWarn)(`'Rule.type: ${type}' has been deprecated, please migrate to builtin:swc-loader with type 'javascript/auto'`);
    }
};
const getRawModuleRule = (rule, path, options) => {
    let _a,
_b,
_c;
    // Rule.loader is a shortcut to Rule.use: [ { loader } ].
    // See: https://webpack.js.org/configuration/module/#ruleloader
    if (rule.loader) {
        rule.use = [
            {
                loader: rule.loader,
                options: rule.options,
            },
        ];
    }
    let funcUse;
    if (typeof rule.use === 'function') {
        funcUse = (rawContext) => {
            const context = {
                ...rawContext,
                compiler: options.compiler,
            };
            const uses = rule.use(context);
            return (0, adapterRuleUse_1.createRawModuleRuleUses)(uses !== null && uses !== void 0 ? uses : [], `${path}.use`, options);
        };
    }
    let rawModuleRule = {
        test: rule.test ? getRawRuleSetCondition(rule.test) : undefined,
        include: rule.include ? getRawRuleSetCondition(rule.include) : undefined,
        exclude: rule.exclude ? getRawRuleSetCondition(rule.exclude) : undefined,
        issuer: rule.issuer ? getRawRuleSetCondition(rule.issuer) : undefined,
        dependency: rule.dependency
            ? getRawRuleSetCondition(rule.dependency)
            : undefined,
        descriptionData: rule.descriptionData
            ? Object.fromEntries(Object.entries(rule.descriptionData).map(([k, v]) => [
                k,
                getRawRuleSetCondition(v),
            ]))
            : undefined,
        resource: rule.resource ? getRawRuleSetCondition(rule.resource) : undefined,
        resourceQuery: rule.resourceQuery
            ? getRawRuleSetCondition(rule.resourceQuery)
            : undefined,
        resourceFragment: rule.resourceFragment
            ? getRawRuleSetCondition(rule.resourceFragment)
            : undefined,
        scheme: rule.scheme ? getRawRuleSetCondition(rule.scheme) : undefined,
        mimetype: rule.mimetype ? getRawRuleSetCondition(rule.mimetype) : undefined,
        sideEffects: rule.sideEffects,
        use: typeof rule.use === 'function'
            ? { type: 'function', funcUse }
            : {
                type: 'array',
                arrayUse: (0, adapterRuleUse_1.createRawModuleRuleUses)((_a = rule.use) !== null && _a !== void 0 ? _a : [], `${path}.use`, options),
            },
        type: rule.type,
        parser: rule.parser
            ? getRawParserOptions(rule.parser, (_b = rule.type) !== null && _b !== void 0 ? _b : 'javascript/auto')
            : undefined,
        generator: rule.generator
            ? getRawGeneratorOptions(rule.generator, (_c = rule.type) !== null && _c !== void 0 ? _c : 'javascript/auto')
            : undefined,
        resolve: rule.resolve ? getRawResolve(rule.resolve) : undefined,
        oneOf: rule.oneOf
            ? rule.oneOf.map((rule, index) => getRawModuleRule(rule, `${path}.oneOf[${index}]`, options))
            : undefined,
        rules: rule.rules
            ? rule.rules.map((rule, index) => getRawModuleRule(rule, `${path}.rules[${index}]`, options))
            : undefined,
        enforce: rule.enforce,
    };
    // Function calls may contain side-effects when interoperating with single-threaded environment.
    // In order to mitigate the issue, Rspack tries to merge these calls together.
    // See: https://github.com/web-infra-dev/rspack/issues/4003#issuecomment-1689662380
    if (typeof rule.test === 'function' ||
        typeof rule.resource === 'function' ||
        typeof rule.resourceQuery === 'function' ||
        typeof rule.resourceFragment === 'function') {
        delete rawModuleRule.test;
        delete rawModuleRule.resource;
        delete rawModuleRule.resourceQuery;
        delete rawModuleRule.resourceFragment;
        rawModuleRule.rspackResource = getRawRuleSetCondition((resourceQueryFragment) => {
            const { path, query, fragment } = (0, identifier_1.parseResource)(resourceQueryFragment);
            if (rule.test && !tryMatch(path, rule.test)) {
                return false;
            } else if (rule.resource && !tryMatch(path, rule.resource)) {
                return false;
            }
            if (rule.resourceQuery && !tryMatch(query, rule.resourceQuery)) {
                return false;
            }
            if (rule.resourceFragment && !tryMatch(fragment, rule.resourceFragment)) {
                return false;
            }
            return true;
        });
    }
    if (options.experiments.rspackFuture.disableTransformByDefault) {
        deprecatedRuleType(rule.type);
    }
    return rawModuleRule;
};
function getRawRuleSetCondition(condition) {
    if (typeof condition === 'string') {
        return {
            type: 'string',
            stringMatcher: condition,
        };
    }
    if (condition instanceof RegExp) {
        return {
            type: 'regexp',
            regexpMatcher: condition.source,
        };
    }
    if (typeof condition === 'function') {
        return {
            type: 'function',
            funcMatcher: condition,
        };
    }
    if (Array.isArray(condition)) {
        return {
            type: 'array',
            arrayMatcher: condition.map(i => getRawRuleSetCondition(i)),
        };
    }
    if (typeof condition === 'object' && condition !== null) {
        return {
            type: 'logical',
            logicalMatcher: [getRawRuleSetLogicalConditions(condition)],
        };
    }
    throw new Error('unreachable: condition should be one of string, RegExp, Array, Object');
}
function getRawRuleSetLogicalConditions(logical) {
    return {
        and: logical.and
            ? logical.and.map(i => getRawRuleSetCondition(i))
            : undefined,
        or: logical.or ? logical.or.map(i => getRawRuleSetCondition(i)) : undefined,
        not: logical.not ? getRawRuleSetCondition(logical.not) : undefined,
    };
}
function getRawParserOptionsByModuleType(parser) {
    return Object.fromEntries(Object.entries(parser).map(([k, v]) => [k, getRawParserOptions(v, k)]));
}
function getRawGeneratorOptionsByModuleType(parser) {
    return Object.fromEntries(Object.entries(parser).map(([k, v]) => [k, getRawGeneratorOptions(v, k)]));
}
function getRawParserOptions(parser, type) {
    if (type === 'asset') {
        return {
            type: 'asset',
            asset: getRawAssetParserOptions(parser),
        };
    } else if (type === 'javascript') {
        return {
            type: 'javascript',
            javascript: getRawJavascriptParserOptions(parser),
        };
    }
    return {
        type: 'unknown',
    };
}
function getRawJavascriptParserOptions(parser) {
    let _a;
    return {
        dynamicImportMode: (_a = parser.dynamicImportMode) !== null && _a !== void 0 ? _a : 'lazy',
    };
}
function getRawAssetParserOptions(parser) {
    return {
        dataUrlCondition: parser.dataUrlCondition
            ? getRawAssetParserDataUrl(parser.dataUrlCondition)
            : undefined,
    };
}
function getRawAssetParserDataUrl(dataUrlCondition) {
    if (typeof dataUrlCondition === 'object' && dataUrlCondition !== null) {
        return {
            type: 'options',
            options: {
                maxSize: dataUrlCondition.maxSize,
            },
        };
    }
    throw new Error(`unreachable: AssetParserDataUrl type should be one of "options", but got ${dataUrlCondition}`);
}
function getRawGeneratorOptions(generator, type) {
    if (type === 'asset') {
        return {
            type: 'asset',
            asset: generator ? getRawAssetGeneratorOptions(generator) : undefined,
        };
    }
    if (type === 'asset/inline') {
        return {
            type: 'asset/inline',
            assetInline: generator
                ? getRawAssetInlineGeneratorOptions(generator)
                : undefined,
        };
    }
    if (type === 'asset/resource') {
        return {
            type: 'asset/resource',
            assetResource: generator
                ? getRawAssetResourceGeneratorOptions(generator)
                : undefined,
        };
    }
    return {
        type: 'unknown',
    };
}
function getRawAssetGeneratorOptions(options) {
    return {
        ...getRawAssetInlineGeneratorOptions(options),
        ...getRawAssetResourceGeneratorOptions(options),
    };
}
function getRawAssetInlineGeneratorOptions(options) {
    return {
        dataUrl: options.dataUrl
            ? getRawAssetGeneratorDaraUrl(options.dataUrl)
            : undefined,
    };
}
function getRawAssetResourceGeneratorOptions(options) {
    return {
        filename: options.filename,
        publicPath: options.publicPath,
    };
}
function getRawAssetGeneratorDaraUrl(dataUrl) {
    if (typeof dataUrl === 'object' && dataUrl !== null) {
        return {
            type: 'options',
            options: {
                encoding: dataUrl.encoding === false ? 'false' : dataUrl.encoding,
                mimetype: dataUrl.mimetype,
            },
        };
    }
    throw new Error(`unreachable: AssetGeneratorDataUrl type should be one of "options", but got ${dataUrl}`);
}
function getRawOptimization(optimization) {
    (0, assert_1.default)(!(0, util_1.isNil)(optimization.moduleIds) &&
        !(0, util_1.isNil)(optimization.chunkIds) &&
        !(0, util_1.isNil)(optimization.removeAvailableModules) &&
        !(0, util_1.isNil)(optimization.removeEmptyChunks) &&
        !(0, util_1.isNil)(optimization.sideEffects) &&
        !(0, util_1.isNil)(optimization.realContentHash) &&
        !(0, util_1.isNil)(optimization.providedExports) &&
        !(0, util_1.isNil)(optimization.usedExports) &&
        !(0, util_1.isNil)(optimization.innerGraph), 'optimization.moduleIds, optimization.removeAvailableModules, optimization.removeEmptyChunks, optimization.sideEffects, optimization.realContentHash, optimization.providedExports, optimization.usedExports, optimization.innerGraph should not be nil after defaults');
    return {
        chunkIds: optimization.chunkIds,
        splitChunks: toRawSplitChunksOptions(optimization.splitChunks),
        moduleIds: optimization.moduleIds,
        removeAvailableModules: optimization.removeAvailableModules,
        removeEmptyChunks: optimization.removeEmptyChunks,
        sideEffects: String(optimization.sideEffects),
        realContentHash: optimization.realContentHash,
        usedExports: String(optimization.usedExports),
        providedExports: optimization.providedExports,
        innerGraph: optimization.innerGraph,
    };
}
function toRawSplitChunksOptions(sc) {
    if (!sc) {
        return;
    }
    const { name, cacheGroups = {}, ...passThrough } = sc;
    return {
        name: name === false ? undefined : name,
        cacheGroups: Object.entries(cacheGroups)
            .filter(([_key, group]) => group !== false)
            .map(([key, group]) => {
            group = group;
            const { test, name, ...passThrough } = group;
            const rawGroup = {
                key,
                test,
                name: name === false ? undefined : name,
                ...passThrough,
            };
            return rawGroup;
        }),
        ...passThrough,
    };
}
function getRawSnapshotOptions(snapshot) {
    const { resolve, module } = snapshot;
    (0, assert_1.default)(!(0, util_1.isNil)(resolve) && !(0, util_1.isNil)(module));
    const { timestamp: resolveTimestamp, hash: resolveHash } = resolve;
    const { timestamp: moduleTimestamp, hash: moduleHash } = module;
    (0, assert_1.default)(!(0, util_1.isNil)(resolveTimestamp) &&
        !(0, util_1.isNil)(resolveHash) &&
        !(0, util_1.isNil)(moduleTimestamp) &&
        !(0, util_1.isNil)(moduleHash));
    return {
        resolve: {
            timestamp: resolveTimestamp,
            hash: resolveHash,
        },
        module: {
            timestamp: moduleTimestamp,
            hash: moduleHash,
        },
    };
}
function getRawExperiments(experiments) {
    const { lazyCompilation, incrementalRebuild, asyncWebAssembly, newSplitChunks, topLevelAwait, css, rspackFuture } = experiments;
    (0, assert_1.default)(!(0, util_1.isNil)(lazyCompilation) &&
        !(0, util_1.isNil)(incrementalRebuild) &&
        !(0, util_1.isNil)(asyncWebAssembly) &&
        !(0, util_1.isNil)(newSplitChunks) &&
        !(0, util_1.isNil)(topLevelAwait) &&
        !(0, util_1.isNil)(css) &&
        !(0, util_1.isNil)(rspackFuture));
    return {
        lazyCompilation,
        incrementalRebuild: getRawIncrementalRebuild(incrementalRebuild),
        asyncWebAssembly,
        newSplitChunks,
        topLevelAwait,
        css,
        rspackFuture: getRawRspackFutureOptions(rspackFuture),
    };
}
function getRawRspackFutureOptions(future) {
    (0, assert_1.default)(!(0, util_1.isNil)(future.newResolver));
    (0, assert_1.default)(!(0, util_1.isNil)(future.newTreeshaking));
    (0, assert_1.default)(!(0, util_1.isNil)(future.disableTransformByDefault));
    return {
        newResolver: future.newResolver,
        newTreeshaking: future.newTreeshaking,
        disableTransformByDefault: future.disableTransformByDefault,
    };
}
function getRawIncrementalRebuild(inc) {
    if (inc === false) {
        return {
            make: false,
            emitAsset: false,
        };
    }
    const { make, emitAsset } = inc;
    (0, assert_1.default)(!(0, util_1.isNil)(make) && !(0, util_1.isNil)(emitAsset));
    return {
        make,
        emitAsset,
    };
}
function getRawNode(node) {
    if (node === false) {
        return undefined;
    }
    (0, assert_1.default)(!(0, util_1.isNil)(node.__dirname) && !(0, util_1.isNil)(node.global) && !(0, util_1.isNil)(node.__filename));
    return {
        dirname: String(node.__dirname),
        filename: String(node.__filename),
        global: String(node.global),
    };
}
function getRawStats(stats) {
    let _a;
    const statsOptions = (0, Stats_1.normalizeStatsPreset)(stats);
    return {
        colors: (_a = statsOptions.colors) !== null && _a !== void 0 ? _a : false,
    };
}
