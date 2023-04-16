import fse from 'fs-extra';
import { SourceMapConsumer, SourceMapGenerator } from 'source-map';

const BASE_LINE = 27;
const BASE_COLUYMN = 12;

export function generateSourceMap({
  sourceMapFileList = [],
}) {
  const generator = new SourceMapGenerator({
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
              line: mapping.generatedLine + BASE_LINE + fileIndex * 2,
              column: mapping.generatedColumn + BASE_COLUYMN,
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