export default function isValidElement(object) {
    return !!(typeof object === 'object' && object !== null && object.type && object.props);
  }