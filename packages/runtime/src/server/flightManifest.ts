type ModuleId = string | number; /* | null */

export type ManifestChunks = Array<string>;

export interface ManifestNode {
  [moduleExport: string]: {
    /**
     * Webpack module id
     */
    id: ModuleId;
    /**
     * Export name
     */
    name: string;
    /**
     * Chunks for the module. JS and CSS.
     */
    chunks: ManifestChunks;

    /**
     * If chunk contains async module
     */
    async?: boolean;
  };
}

export type ClientReferenceManifest = {
  moduleLoading: {
    prefix: string;
    crossOrigin: string | null;
  };
  clientModules: ManifestNode;
  ssrModuleMapping: {
    [moduleId: string]: ManifestNode;
  };
};