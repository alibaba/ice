import fse from 'fs-extra';
import { SourceMapConsumer, SourceMapGenerator } from 'source-map';

// Starting with extra script, it's a fixed line.
const BASE_LINE = 28;
// Starting with end of '(function(){', it's a fixed column.
const BASE_COLUMN = 12;

export async function generateSourceMap({
  sourceMapFileList = [],
  extraLine = 0,
  extraColumn = 0,
}) {
  if (!sourceMapFileList.length) {
    return '';
  }

  const generator = new SourceMapGenerator({
    file: '',
    sourceRoot: '',
  });

  await Promise.all(sourceMapFileList.map((sourceMapFile) => {
    return new Promise((resolve) => {
      if (!fse.existsSync(sourceMapFile)) {
        resolve(true);
      }

      const content = fse.readFileSync(sourceMapFile, 'utf-8');
      const contentLines = content.split('\n').length;
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
                line: mapping.generatedLine + BASE_LINE + extraLine + contentLines,
                column: mapping.generatedColumn + BASE_COLUMN + extraColumn,
              },
              original: {
                line: mapping.originalLine,
                column: mapping.originalColumn,
              },
              source: mapping.source,
              name: mapping.name,
            });
        });

        resolve(true);
      });
    });
  }));

  return generator.toString();
}
