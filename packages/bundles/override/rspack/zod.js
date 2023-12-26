"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rspackOptions = exports.externalsType = void 0;
const zod_1 = require("zod");
const util_1 = require("../util");
const Module_1 = require("../Module");
//#region Name
const name = zod_1.z.string();
//#endregion
//#region Dependencies
const dependencies = zod_1.z.array(name);
//#endregion
//#region Context
const context = zod_1.z.string();
//#endregion
//#region Mode
const mode = zod_1.z.enum(["development", "production", "none"]);
//#endregion
//#region Entry
const rawPublicPath = zod_1.z.string();
const publicPath = zod_1.z.literal("auto").or(rawPublicPath);
const baseUri = zod_1.z.string();
const chunkLoadingType = zod_1.z
    .enum(["jsonp", "import-scripts", "require", "async-node", "import"])
    .or(zod_1.z.string());
const chunkLoading = zod_1.z.literal(false).or(chunkLoadingType);
const asyncChunks = zod_1.z.boolean();
const wasmLoadingType = zod_1.z
    .enum(["fetch-streaming", "fetch", "async-node"])
    .or(zod_1.z.string());
const wasmLoading = zod_1.z.literal(false).or(wasmLoadingType);
const scriptType = zod_1.z.enum(["text/javascript", "module"]).or(zod_1.z.literal(false));
const libraryCustomUmdObject = zod_1.z.strictObject({
    amd: zod_1.z.string().optional(),
    commonjs: zod_1.z.string().optional(),
    root: zod_1.z.string().or(zod_1.z.array(zod_1.z.string())).optional()
});
const libraryName = zod_1.z
    .string()
    .or(zod_1.z.array(zod_1.z.string()))
    .or(libraryCustomUmdObject);
const libraryCustomUmdCommentObject = zod_1.z.strictObject({
    amd: zod_1.z.string().optional(),
    commonjs: zod_1.z.string().optional(),
    commonjs2: zod_1.z.string().optional(),
    root: zod_1.z.string().optional()
});
const amdContainer = zod_1.z.string();
const auxiliaryComment = zod_1.z.string().or(libraryCustomUmdCommentObject);
const libraryExport = zod_1.z.string().or(zod_1.z.array(zod_1.z.string()));
const libraryType = zod_1.z
    .enum([
    "var",
    "module",
    "assign",
    "assign-properties",
    "this",
    "window",
    "self",
    "global",
    "commonjs",
    "commonjs2",
    "commonjs-module",
    "commonjs-static",
    "amd",
    "amd-require",
    "umd",
    "umd2",
    "jsonp",
    "system"
])
    .or(zod_1.z.string());
const umdNamedDefine = zod_1.z.boolean();
const libraryOptions = zod_1.z.strictObject({
    amdContainer: amdContainer.optional(),
    auxiliaryComment: auxiliaryComment.optional(),
    export: libraryExport.optional(),
    name: libraryName.optional(),
    type: libraryType,
    umdNamedDefine: umdNamedDefine.optional()
});
const library = libraryName.or(libraryOptions).optional();
const filenameTemplate = zod_1.z.string();
const filename = filenameTemplate;
const entryFilename = filenameTemplate;
const entryRuntime = zod_1.z.literal(false).or(zod_1.z.string());
const entryItem = zod_1.z.string().or(zod_1.z.array(zod_1.z.string()));
const entryDescription = zod_1.z.strictObject({
    import: entryItem,
    runtime: entryRuntime.optional(),
    publicPath: publicPath.optional(),
    baseUri: baseUri.optional(),
    chunkLoading: chunkLoading.optional(),
    asyncChunks: asyncChunks.optional(),
    wasmLoading: wasmLoading.optional(),
    filename: entryFilename.optional(),
    library: libraryOptions.optional()
});
const entryUnnamed = entryItem;
const entryObject = zod_1.z.record(entryItem.or(entryDescription));
const entryStatic = entryObject.or(entryUnnamed);
const entry = entryStatic;
//#endregion
//#region Output
const path = zod_1.z.string();
const assetModuleFilename = zod_1.z.string();
const webassemblyModuleFilename = zod_1.z.string();
const chunkFilename = filenameTemplate;
const crossOriginLoading = zod_1.z
    .literal(false)
    .or(zod_1.z.enum(["anonymous", "use-credentials"]));
const cssFilename = filenameTemplate;
const cssChunkFilename = filenameTemplate;
const hotUpdateChunkFilename = filenameTemplate;
const hotUpdateMainFilename = filenameTemplate;
const hotUpdateGlobal = zod_1.z.string();
const uniqueName = zod_1.z.string();
const chunkLoadingGlobal = zod_1.z.string();
const enabledLibraryTypes = zod_1.z.array(libraryType);
const clean = zod_1.z.boolean();
const outputModule = zod_1.z.boolean();
const strictModuleExceptionHandling = zod_1.z.boolean();
const strictModuleErrorHandling = zod_1.z.boolean();
const globalObject = zod_1.z.string();
const enabledWasmLoadingTypes = zod_1.z.array(wasmLoadingType);
const importFunctionName = zod_1.z.string();
const iife = zod_1.z.boolean();
const enabledChunkLoadingTypes = zod_1.z.array(chunkLoadingType);
const chunkFormat = zod_1.z.literal(false).or(zod_1.z.string());
const workerPublicPath = zod_1.z.string();
const trustedTypes = zod_1.z.strictObject({
    policyName: zod_1.z.string().optional()
});
const hashDigest = zod_1.z.string();
const hashDigestLength = zod_1.z.number();
const hashFunction = zod_1.z.string();
const hashSalt = zod_1.z.string();
const sourceMapFilename = zod_1.z.string();
const output = zod_1.z.strictObject({
    path: path.optional(),
    clean: clean.optional(),
    publicPath: publicPath.optional(),
    filename: filename.optional(),
    chunkFilename: chunkFilename.optional(),
    crossOriginLoading: crossOriginLoading.optional(),
    cssFilename: cssFilename.optional(),
    cssChunkFilename: cssChunkFilename.optional(),
    hotUpdateMainFilename: hotUpdateMainFilename.optional(),
    hotUpdateChunkFilename: hotUpdateChunkFilename.optional(),
    hotUpdateGlobal: hotUpdateGlobal.optional(),
    assetModuleFilename: assetModuleFilename.optional(),
    uniqueName: uniqueName.optional(),
    chunkLoadingGlobal: chunkLoadingGlobal.optional(),
    enabledLibraryTypes: enabledLibraryTypes.optional(),
    library: library.optional(),
    libraryExport: libraryExport.optional(),
    libraryTarget: libraryType.optional(),
    umdNamedDefine: umdNamedDefine.optional(),
    amdContainer: amdContainer.optional(),
    auxiliaryComment: auxiliaryComment.optional(),
    module: outputModule.optional(),
    strictModuleExceptionHandling: strictModuleExceptionHandling.optional(),
    strictModuleErrorHandling: strictModuleErrorHandling.optional(),
    globalObject: globalObject.optional(),
    importFunctionName: importFunctionName.optional(),
    iife: iife.optional(),
    wasmLoading: wasmLoading.optional(),
    enabledWasmLoadingTypes: enabledWasmLoadingTypes.optional(),
    webassemblyModuleFilename: webassemblyModuleFilename.optional(),
    chunkFormat: chunkFormat.optional(),
    chunkLoading: chunkLoading.optional(),
    enabledChunkLoadingTypes: enabledChunkLoadingTypes.optional(),
    trustedTypes: zod_1.z.literal(true).or(zod_1.z.string()).or(trustedTypes).optional(),
    sourceMapFilename: sourceMapFilename.optional(),
    hashDigest: hashDigest.optional(),
    hashDigestLength: hashDigestLength.optional(),
    hashFunction: hashFunction.optional(),
    hashSalt: hashSalt.optional(),
    asyncChunks: asyncChunks.optional(),
    workerChunkLoading: chunkLoading.optional(),
    workerWasmLoading: wasmLoading.optional(),
    workerPublicPath: workerPublicPath.optional(),
    scriptType: scriptType.optional()
});
//#endregion
//#region Resolve
const resolveAlias = zod_1.z.record(zod_1.z
    .literal(false)
    .or(zod_1.z.string())
    .or(zod_1.z.array(zod_1.z.string().or(zod_1.z.literal(false)))));
const resolveTsconfig = zod_1.z.strictObject({
    configFile: zod_1.z.string(),
    references: zod_1.z.array(zod_1.z.string()).or(zod_1.z.literal("auto")).optional()
});
const baseResolveOptions = zod_1.z.strictObject({
    alias: resolveAlias.optional(),
    /**
     * This is `aliasField: ["browser"]` in webpack, because no one
     * uses aliasField other than "browser". ---@bvanjoi
     */
    browserField: zod_1.z.boolean().optional(),
    conditionNames: zod_1.z.array(zod_1.z.string()).optional(),
    extensions: zod_1.z.array(zod_1.z.string()).optional(),
    fallback: resolveAlias.optional(),
    mainFields: zod_1.z.array(zod_1.z.string()).optional(),
    mainFiles: zod_1.z.array(zod_1.z.string()).optional(),
    modules: zod_1.z.array(zod_1.z.string()).optional(),
    preferRelative: zod_1.z.boolean().optional(),
    tsConfigPath: zod_1.z.string().optional(),
    tsConfig: resolveTsconfig.optional(),
    fullySpecified: zod_1.z.boolean().optional(),
    exportsFields: zod_1.z.array(zod_1.z.string()).optional(),
    extensionAlias: zod_1.z.record(zod_1.z.string().or(zod_1.z.array(zod_1.z.string()))).optional()
});
const resolveOptions = baseResolveOptions.extend({
    byDependency: zod_1.z.lazy(() => zod_1.z.record(resolveOptions)).optional()
});
const resolve = resolveOptions;
//#endregion
//#region Module
const baseRuleSetCondition = zod_1.z
    .instanceof(RegExp)
    .or(zod_1.z.string())
    .or(zod_1.z.function().args(zod_1.z.string()).returns(zod_1.z.boolean()));
const ruleSetCondition = baseRuleSetCondition
    .or(zod_1.z.lazy(() => ruleSetConditions))
    .or(zod_1.z.lazy(() => ruleSetLogicalConditions));
const ruleSetConditions = zod_1.z.lazy(() => zod_1.z.array(ruleSetCondition));
const ruleSetLogicalConditions = zod_1.z.strictObject({
    and: ruleSetConditions.optional(),
    or: ruleSetConditions.optional(),
    not: ruleSetConditions.optional()
});
const ruleSetLoader = zod_1.z.string();
const ruleSetLoaderOptions = zod_1.z.string().or(zod_1.z.record(zod_1.z.any()));
const ruleSetLoaderWithOptions = zod_1.z.strictObject({
    ident: zod_1.z.string().optional(),
    loader: ruleSetLoader,
    options: ruleSetLoaderOptions.optional()
});
const ruleSetUseItem = ruleSetLoader.or(ruleSetLoaderWithOptions);
const ruleSetUse = ruleSetUseItem
    .or(ruleSetUseItem.array())
    .or(zod_1.z.function().args(zod_1.z.custom()).returns(ruleSetUseItem.array()));
const baseRuleSetRule = zod_1.z.strictObject({
    test: ruleSetCondition.optional(),
    exclude: ruleSetCondition.optional(),
    include: ruleSetCondition.optional(),
    issuer: ruleSetCondition.optional(),
    dependency: ruleSetCondition.optional(),
    resource: ruleSetCondition.optional(),
    resourceFragment: ruleSetCondition.optional(),
    resourceQuery: ruleSetCondition.optional(),
    scheme: ruleSetCondition.optional(),
    mimetype: ruleSetCondition.optional(),
    descriptionData: zod_1.z.record(ruleSetCondition).optional(),
    type: zod_1.z.string().optional(),
    loader: ruleSetLoader.optional(),
    options: ruleSetLoaderOptions.optional(),
    use: ruleSetUse.optional(),
    parser: zod_1.z.record(zod_1.z.any()).optional(),
    generator: zod_1.z.record(zod_1.z.any()).optional(),
    resolve: resolveOptions.optional(),
    sideEffects: zod_1.z.boolean().optional(),
    enforce: zod_1.z.literal("pre").or(zod_1.z.literal("post")).optional()
});
const ruleSetRule = baseRuleSetRule.extend({
    oneOf: zod_1.z.lazy(() => ruleSetRule.array()).optional(),
    rules: zod_1.z.lazy(() => ruleSetRule.array()).optional()
});
const ruleSetRules = zod_1.z.array(zod_1.z.literal("...").or(ruleSetRule));
const assetParserDataUrlOptions = zod_1.z.strictObject({
    maxSize: zod_1.z.number().optional()
});
const assetParserDataUrl = assetParserDataUrlOptions;
const assetParserOptions = zod_1.z.strictObject({
    dataUrlCondition: assetParserDataUrl.optional()
});
//TODO: "weak", "lazy-once"
const dynamicImportMode = zod_1.z.enum(["eager", "lazy"]);
const javascriptParserOptions = zod_1.z.strictObject({
    dynamicImportMode: dynamicImportMode.optional()
});
const parserOptionsByModuleTypeKnown = zod_1.z.strictObject({
    asset: assetParserOptions.optional(),
    javascript: javascriptParserOptions.optional()
});
const parserOptionsByModuleTypeUnknown = zod_1.z.record(zod_1.z.record(zod_1.z.any()));
const parserOptionsByModuleType = parserOptionsByModuleTypeKnown.or(parserOptionsByModuleTypeUnknown);
const assetGeneratorDataUrlOptions = zod_1.z.strictObject({
    encoding: zod_1.z.literal(false).or(zod_1.z.literal("base64")).optional(),
    mimetype: zod_1.z.string().optional()
});
const assetGeneratorDataUrl = assetGeneratorDataUrlOptions;
const assetInlineGeneratorOptions = zod_1.z.strictObject({
    dataUrl: assetGeneratorDataUrl.optional()
});
const assetResourceGeneratorOptions = zod_1.z.strictObject({
    filename: filenameTemplate.optional(),
    publicPath: publicPath.optional()
});
const assetGeneratorOptions = assetInlineGeneratorOptions.merge(assetResourceGeneratorOptions);
const generatorOptionsByModuleTypeKnown = zod_1.z.strictObject({
    asset: assetGeneratorOptions.optional(),
    "asset/inline": assetInlineGeneratorOptions.optional(),
    "asset/resource": assetResourceGeneratorOptions.optional()
});
const generatorOptionsByModuleTypeUnknown = zod_1.z.record(zod_1.z.record(zod_1.z.any()));
const generatorOptionsByModuleType = generatorOptionsByModuleTypeKnown.or(generatorOptionsByModuleTypeUnknown);
const moduleOptions = zod_1.z.strictObject({
    defaultRules: ruleSetRules.optional(),
    rules: ruleSetRules.optional(),
    parser: parserOptionsByModuleType.optional(),
    generator: generatorOptionsByModuleType.optional()
});
//#endregion
//#region Target
const allowTarget = zod_1.z
    .enum([
    "web",
    "webworker",
    "es3",
    "es5",
    "es2015",
    "es2016",
    "es2017",
    "es2018",
    "es2019",
    "es2020",
    "es2021",
    "es2022",
    "browserslist"
])
    .or(zod_1.z.literal("node"))
    .or(zod_1.z.literal("async-node"))
    .or(zod_1.z.custom(value => typeof value === "string" && /^node\d+$/.test(value)))
    .or(zod_1.z.custom(value => typeof value === "string" && /^async-node\d+$/.test(value)))
    .or(zod_1.z.custom(value => typeof value === "string" && /^node\d+\.\d+$/.test(value)))
    .or(zod_1.z.custom(value => typeof value === "string" && /^async-node\d+\.\d+$/.test(value)))
    .or(zod_1.z.literal("electron-main"))
    .or(zod_1.z.custom(value => typeof value === "string" && /^electron\d+-main$/.test(value)))
    .or(zod_1.z.custom(value => typeof value === "string" && /^electron\d+\.\d+-main$/.test(value)))
    .or(zod_1.z.literal("electron-renderer"))
    .or(zod_1.z.custom(value => typeof value === "string" && /^electron\d+-renderer$/.test(value)))
    .or(zod_1.z.custom(value => typeof value === "string" && /^electron\d+\.\d+-renderer$/.test(value)))
    .or(zod_1.z.literal("electron-preload"))
    .or(zod_1.z.custom(value => typeof value === "string" && /^electron\d+-preload$/.test(value)))
    .or(zod_1.z.custom(value => typeof value === "string" && /^electron\d+\.\d+-preload$/.test(value)));
const target = zod_1.z.literal(false).or(allowTarget).or(allowTarget.array());
//#endregion
//#region ExternalsType
exports.externalsType = zod_1.z.enum([
    "var",
    "module",
    "assign",
    "this",
    "window",
    "self",
    "global",
    "commonjs",
    "commonjs2",
    "commonjs-module",
    "commonjs-static",
    "amd",
    "amd-require",
    "umd",
    "umd2",
    "jsonp",
    "system",
    "promise",
    "import",
    "script",
    "node-commonjs"
]);
//#endregion
//#region Externals
const externalItemValue = zod_1.z
    .string()
    .or(zod_1.z.boolean())
    .or(zod_1.z.string().array().min(1))
    .or(zod_1.z.record(zod_1.z.string().or(zod_1.z.string().array())));
const externalItemObjectUnknown = zod_1.z.record(externalItemValue);
const externalItemFunctionData = zod_1.z.strictObject({
    context: zod_1.z.string().optional(),
    dependencyType: zod_1.z.string().optional(),
    request: zod_1.z.string().optional()
});
const externalItem = zod_1.z
    .string()
    .or(zod_1.z.instanceof(RegExp))
    .or(externalItemObjectUnknown)
    .or(zod_1.z
    .function()
    .args(externalItemFunctionData, zod_1.z
    .function()
    .args(zod_1.z.instanceof(Error).optional(), externalItemValue.optional(), exports.externalsType.optional())
    .returns(zod_1.z.void())))
    .or(zod_1.z
    .function()
    .args(externalItemFunctionData)
    .returns(zod_1.z.promise(externalItemValue)));
const externals = externalItem.array().or(externalItem);
//#endregion
//#region ExternalsPresets
const externalsPresets = zod_1.z.strictObject({
    node: zod_1.z.boolean().optional(),
    web: zod_1.z.boolean().optional(),
    webAsync: zod_1.z.boolean().optional(),
    electron: zod_1.z.boolean().optional(),
    electronMain: zod_1.z.boolean().optional(),
    electronPreload: zod_1.z.boolean().optional(),
    electronRenderer: zod_1.z.boolean().optional()
});
//#endregion
//#region InfrastructureLogging
const filterItemTypes = zod_1.z
    .instanceof(RegExp)
    .or(zod_1.z.string())
    .or(zod_1.z.function().args(zod_1.z.string()).returns(zod_1.z.boolean()));
const filterTypes = filterItemTypes.array().or(filterItemTypes);
const infrastructureLogging = zod_1.z.strictObject({
    appendOnly: zod_1.z.boolean().optional(),
    colors: zod_1.z.boolean().optional(),
    console: zod_1.z.custom().optional(),
    debug: zod_1.z.boolean().or(filterTypes).optional(),
    level: zod_1.z.enum(["none", "error", "warn", "info", "log", "verbose"]).optional(),
    stream: zod_1.z.custom().optional()
});
//#endregion
//#region DevTool
const devTool = zod_1.z
    .literal(false)
    .or(zod_1.z.enum([
    "cheap-source-map",
    "cheap-module-source-map",
    "source-map",
    "inline-cheap-source-map",
    "inline-cheap-module-source-map",
    "inline-source-map",
    "inline-nosources-cheap-module-source-map",
    "inline-nosources-source-map",
    "nosources-cheap-source-map",
    "nosources-cheap-module-source-map",
    "nosources-source-map",
    "hidden-nosources-cheap-source-map",
    "hidden-nosources-cheap-module-source-map",
    "hidden-nosources-source-map",
    "hidden-cheap-source-map",
    "hidden-cheap-module-source-map",
    "hidden-source-map",
    "eval-cheap-source-map",
    "eval-cheap-module-source-map",
    "eval-source-map",
    "eval-nosources-cheap-source-map",
    "eval-nosources-cheap-module-source-map",
    "eval-nosources-source-map"
]));
//#endregion
//#region Node
const nodeOptions = zod_1.z.strictObject({
    __dirname: zod_1.z
        .boolean()
        .or(zod_1.z.enum(["warn-mock", "mock", "eval-only"]))
        .optional(),
    __filename: zod_1.z
        .boolean()
        .or(zod_1.z.enum(["warn-mock", "mock", "eval-only"]))
        .optional(),
    global: zod_1.z.boolean().or(zod_1.z.literal("warn")).optional()
});
const node = zod_1.z.literal(false).or(nodeOptions);
//#endregion
//#region Snapshot
const snapshotOptions = zod_1.z.strictObject({
    module: zod_1.z
        .strictObject({
        hash: zod_1.z.boolean().optional(),
        timestamp: zod_1.z.boolean().optional()
    })
        .optional(),
    resolve: zod_1.z
        .strictObject({
        hash: zod_1.z.boolean().optional(),
        timestamp: zod_1.z.boolean().optional()
    })
        .optional()
});
//#endregion
//#region Cache
const cacheOptions = zod_1.z.boolean();
//#endregion
//#region Stats
const statsOptions = zod_1.z.strictObject({
    all: zod_1.z.boolean().optional(),
    preset: zod_1.z
        .enum(["normal", "none", "verbose", "errors-only", "errors-warnings"])
        .optional(),
    assets: zod_1.z.boolean().optional(),
    chunks: zod_1.z.boolean().optional(),
    modules: zod_1.z.boolean().optional(),
    entrypoints: zod_1.z.boolean().optional(),
    chunkGroups: zod_1.z.boolean().optional(),
    warnings: zod_1.z.boolean().optional(),
    warningsCount: zod_1.z.boolean().optional(),
    errors: zod_1.z.boolean().optional(),
    errorsCount: zod_1.z.boolean().optional(),
    colors: zod_1.z.boolean().optional(),
    hash: zod_1.z.boolean().optional(),
    version: zod_1.z.boolean().optional(),
    reasons: zod_1.z.boolean().optional(),
    publicPath: zod_1.z.boolean().optional(),
    outputPath: zod_1.z.boolean().optional(),
    chunkModules: zod_1.z.boolean().optional(),
    chunkRelations: zod_1.z.boolean().optional(),
    ids: zod_1.z.boolean().optional(),
    timings: zod_1.z.boolean().optional(),
    builtAt: zod_1.z.boolean().optional(),
    moduleAssets: zod_1.z.boolean().optional(),
    modulesSpace: zod_1.z.number().optional(),
    nestedModules: zod_1.z.boolean().optional(),
    source: zod_1.z.boolean().optional(),
    logging: zod_1.z
        .enum(["none", "error", "warn", "info", "log", "verbose"])
        .or(zod_1.z.boolean())
        .optional(),
    loggingDebug: zod_1.z.boolean().or(filterTypes).optional(),
    loggingTrace: zod_1.z.boolean().optional(),
    runtimeModules: zod_1.z.boolean().optional()
});
const statsValue = zod_1.z
    .enum(["none", "errors-only", "errors-warnings", "normal", "verbose"])
    .or(zod_1.z.boolean())
    .or(statsOptions);
const plugin = zod_1.z.union([
    zod_1.z.custom(),
    zod_1.z.custom()
]);
const plugins = plugin.array();
//#endregion
//#region Optimization
const optimizationRuntimeChunk = zod_1.z
    .enum(["single", "multiple"])
    .or(zod_1.z.boolean())
    .or(zod_1.z.strictObject({
    name: zod_1.z
        .string()
        .or(zod_1.z.function().returns(zod_1.z.string().or(zod_1.z.undefined())))
        .optional()
}));
const optimizationSplitChunksNameFunction = zod_1.z.function().args(zod_1.z.instanceof(Module_1.Module).optional()
// FIXME: z.array(z.instanceof(Chunk)).optional(), z.string()
// FIXME: Chunk[],   															cacheChunkKey
);
const optimizationSplitChunksName = zod_1.z
    .string()
    .or(zod_1.z.literal(false))
    .or(optimizationSplitChunksNameFunction);
const optimizationSplitChunksChunks = zod_1.z
    .enum(["initial", "async", "all"])
    .or(zod_1.z.instanceof(RegExp));
const optimizationSplitChunksSizes = zod_1.z.number();
const sharedOptimizationSplitChunksCacheGroup = {
    chunks: optimizationSplitChunksChunks.optional(),
    minChunks: zod_1.z.number().optional(),
    name: optimizationSplitChunksName.optional(),
    minSize: optimizationSplitChunksSizes.optional(),
    maxSize: optimizationSplitChunksSizes.optional(),
    maxAsyncSize: optimizationSplitChunksSizes.optional(),
    maxInitialSize: optimizationSplitChunksSizes.optional(),
    automaticNameDelimiter: zod_1.z.string().optional()
};
const optimizationSplitChunksCacheGroup = zod_1.z.strictObject({
    test: zod_1.z
        .string()
        .or(zod_1.z.instanceof(RegExp))
        .or(zod_1.z
        .function()
        .args(zod_1.z.instanceof(Module_1.Module) /** FIXME: lack of CacheGroupContext */))
        .optional(),
    priority: zod_1.z.number().optional(),
    enforce: zod_1.z.boolean().optional(),
    filename: zod_1.z.string().optional(),
    reuseExistingChunk: zod_1.z.boolean().optional(),
    type: zod_1.z.string().or(zod_1.z.instanceof(RegExp)).optional(),
    idHint: zod_1.z.string().optional(),
    ...sharedOptimizationSplitChunksCacheGroup
});
const optimizationSplitChunksOptions = zod_1.z.strictObject({
    cacheGroups: zod_1.z
        .record(zod_1.z.literal(false).or(optimizationSplitChunksCacheGroup))
        .optional(),
    maxAsyncRequests: zod_1.z.number().optional(),
    maxInitialRequests: zod_1.z.number().optional(),
    fallbackCacheGroup: zod_1.z
        .strictObject({
        chunks: optimizationSplitChunksChunks.optional(),
        minSize: zod_1.z.number().optional(),
        maxSize: zod_1.z.number().optional(),
        maxAsyncSize: zod_1.z.number().optional(),
        maxInitialSize: zod_1.z.number().optional(),
        automaticNameDelimiter: zod_1.z.string().optional()
    })
        .optional(),
    hidePathInfo: zod_1.z.boolean().optional(),
    ...sharedOptimizationSplitChunksCacheGroup
});
const optimization = zod_1.z.strictObject({
    moduleIds: zod_1.z.enum(["named", "deterministic"]).optional(),
    chunkIds: zod_1.z.enum(["named", "deterministic"]).optional(),
    minimize: zod_1.z.boolean().optional(),
    minimizer: zod_1.z.literal("...").or(plugin).array().optional(),
    mergeDuplicateChunks: zod_1.z.boolean().optional(),
    splitChunks: zod_1.z.literal(false).or(optimizationSplitChunksOptions).optional(),
    runtimeChunk: optimizationRuntimeChunk.optional(),
    removeAvailableModules: zod_1.z.boolean().optional(),
    removeEmptyChunks: zod_1.z.boolean().optional(),
    realContentHash: zod_1.z.boolean().optional(),
    sideEffects: zod_1.z.enum(["flag"]).or(zod_1.z.boolean()).optional(),
    providedExports: zod_1.z.boolean().optional(),
    innerGraph: zod_1.z.boolean().optional(),
    usedExports: zod_1.z.enum(["global"]).or(zod_1.z.boolean()).optional(),
    mangleExports: zod_1.z.enum(["size", "deterministic"]).or(zod_1.z.boolean()).optional(),
    nodeEnv: zod_1.z.union([zod_1.z.string(), zod_1.z.literal(false)]).optional()
});
//#endregion
//#region Experiments
const incrementalRebuildOptions = zod_1.z.strictObject({
    make: zod_1.z.boolean().optional(),
    emitAsset: zod_1.z.boolean().optional()
});
const rspackFutureOptions = zod_1.z.strictObject({
    newResolver: zod_1.z
        .boolean()
        .optional()
        .refine(val => {
        if (val === false) {
            (0, util_1.deprecatedWarn)(`'experiments.rspackFuture.newResolver = ${JSON.stringify(val)}' has been deprecated, and will be drop support in 0.5.0, please switch 'experiments.rspackFuture.newResolver = true' to use new resolver, See the discussion ${(0, util_1.termlink)("here", "https://github.com/web-infra-dev/rspack/issues/4825")}`);
        }
        return true;
    }),
    newTreeshaking: zod_1.z.boolean().optional(),
    disableTransformByDefault: zod_1.z.boolean().optional()
});
const experiments = zod_1.z.strictObject({
    lazyCompilation: zod_1.z.boolean().optional(),
    incrementalRebuild: zod_1.z
        .boolean()
        .or(incrementalRebuildOptions)
        .optional()
        .refine(val => {
        if (val !== undefined) {
            (0, util_1.deprecatedWarn)(`'experiments.incrementalRebuild' has been deprecated, and will be drop support in 0.5.0. See the discussion ${(0, util_1.termlink)("here", "https://github.com/web-infra-dev/rspack/issues/4708")}`);
        }
        return true;
    }),
    asyncWebAssembly: zod_1.z.boolean().optional(),
    outputModule: zod_1.z.boolean().optional(),
    topLevelAwait: zod_1.z.boolean().optional(),
    newSplitChunks: zod_1.z
        .boolean()
        .optional()
        .refine(val => {
        if (val === false) {
            (0, util_1.deprecatedWarn)(`'experiments.newSplitChunks = ${JSON.stringify(val)}' has been deprecated, please switch to 'experiments.newSplitChunks = true' to use webpack's behavior.
 	See the discussion ${(0, util_1.termlink)("here", "https://github.com/web-infra-dev/rspack/discussions/4168")}`);
        }
        return true;
    }),
    css: zod_1.z.boolean().optional(),
    futureDefaults: zod_1.z.boolean().optional(),
    rspackFuture: rspackFutureOptions.optional()
});
//#endregion
//#region Watch
const watch = zod_1.z.boolean();
//#endregion
//#region WatchOptions
const watchOptions = zod_1.z.strictObject({
    aggregateTimeout: zod_1.z.number().optional(),
    followSymlinks: zod_1.z.boolean().optional(),
    ignored: zod_1.z
        .string()
        .array()
        .or(zod_1.z.instanceof(RegExp))
        .or(zod_1.z.string())
        .optional(),
    poll: zod_1.z.number().or(zod_1.z.boolean()).optional(),
    stdin: zod_1.z.boolean().optional()
});
const devServer = zod_1.z.custom();
//#endregion
//#region IgnoreWarnings
const ignoreWarnings = zod_1.z
    .instanceof(RegExp)
    .or(zod_1.z
    .function()
    .args(zod_1.z.instanceof(Error), zod_1.z.custom())
    .returns(zod_1.z.boolean()))
    .array();
//#endregion
//#region Profile
const profile = zod_1.z.boolean();
//#endregion
//#region Builtins (deprecated)
const builtins = zod_1.z.custom();
const features = zod_1.z.custom();
// #endregion
exports.rspackOptions = zod_1.z.strictObject({
    name: name.optional(),
    dependencies: dependencies.optional(),
    entry: entry.optional(),
    output: output.optional(),
    target: target.optional(),
    mode: mode.optional(),
    experiments: experiments.optional(),
    externals: externals.optional(),
    externalsType: exports.externalsType.optional(),
    externalsPresets: externalsPresets.optional(),
    infrastructureLogging: infrastructureLogging.optional(),
    cache: cacheOptions.optional(),
    context: context.optional(),
    devtool: devTool.optional(),
    node: node.optional(),
    ignoreWarnings: ignoreWarnings.optional(),
    watchOptions: watchOptions.optional(),
    watch: watch.optional(),
    stats: statsValue.optional(),
    snapshot: snapshotOptions.optional(),
    optimization: optimization.optional(),
    resolve: resolve.optional(),
    resolveLoader: resolve.optional(),
    plugins: plugins.optional(),
    devServer: devServer.optional(),
    builtins: builtins.optional(),
    module: moduleOptions.optional(),
    profile: profile.optional(),
    features: features.optional(),
});
