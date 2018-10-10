import mapValues from 'lodash.mapvalues';

export default function(Tag, stylesAttr) {
  const MarkComponent = ({ attributes, children, mark }) => {
    return (
      <Tag
        {...attributes}
        style={mapValues(stylesAttr, val => val && val(mark))}
        data-slate-type={Tag}
      >
        {children}
      </Tag>
    );
  };

  MarkComponent.displayName = `${Tag}-mark`;

  return MarkComponent;
}
