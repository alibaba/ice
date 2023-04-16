import fse from 'fs-extra';
import { SourceMapConsumer, SourceMapGenerator } from 'source-map';

export function generate({
  fileName = '',
  fileList = [],
}) {
  const generator = new SourceMapGenerator({
    file: fileName,
    sourceRoot: '',
  });

  fileList.forEach((content) => {
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

  fse.writeFileSync('', generator.toString());

  return generator.toJSON();
}