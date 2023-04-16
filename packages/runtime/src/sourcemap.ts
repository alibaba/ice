import fse from 'fs-extra';
import { SourceMapConsumer, SourceMapGenerator } from 'source-map';

export function generateSourceMap({
  fileName = '',
  sourceMapFileList = [],
}) {
  const generator = new SourceMapGenerator({
    file: fileName,
    sourceRoot: '',
  });

  sourceMapFileList.forEach((sourceMapFile, fileIndex) => {
    if (!fse.existsSync(sourceMapFile)) return;

    const content = fse.readFileSync(sourceMapFile, 'utf-8');
    SourceMapConsumer.with(content, null, consumer => {
      // Set content by source.
      consumer.sources.forEach((source) => {
        generator.setSourceContent(source, consumer.sourceContentFor(source));
      });

      // Get each map from script,and set it to new map.
      consumer.eachMapping((mapping) => {
          if (!mapping.name) return;

          generator.addMapping({
            generated: {
              line: mapping.generatedLine + fileIndex + 2,
              column: mapping.generatedColumn,
            },
            original: {
              line: mapping.originalLine,
              column: mapping.originalColumn,
            },
            source: mapping.source,
            name: mapping.name,
          });
      });
    });
  });

  return generator.toString();
}