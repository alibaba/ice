import fse from 'fs-extra';
import { SourceMapConsumer, SourceMapGenerator } from 'source-map';


export function generateSourceMap({
  sourceMapList = [],
}) {
  const generator = new SourceMapGenerator({
    file: 'home.js.map',
    sourceRoot: '',
  });

  sourceMapList.forEach((content) => {
    SourceMapConsumer.with(content, null, consumer => {
      // consumer.allGeneratedPositionsFor()
      // Set content by source.
      consumer.sources.forEach((source) => {
        generator.setSourceContent(source, consumer.sourceContentFor(source));
      });

      // Get each map from script,and set it to new map.
      consumer.eachMapping((mapping) => {
          if (!mapping.name) return;

          generator.addMapping({
            generated: {
              line: mapping.generatedLine,
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

  return generator.toJSON();
}