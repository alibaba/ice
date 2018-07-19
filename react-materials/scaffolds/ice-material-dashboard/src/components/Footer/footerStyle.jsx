import {
  defaultFont,
  container,
  primaryColor,
} from 'variables/global';

const footerStyle = {
  block: {
    color: 'inherit',
    padding: '15px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    textDecoration: 'none',
    position: 'relative',
    display: 'block',
    ...defaultFont,
    fontWeight: '500',
    fontSize: '12px',
  },
  left: {
    float: 'left!important',
    display: 'block',
  },
  right: {
    padding: '15px 0',
    margin: '0',
    fontSize: '14px',
    float: 'right!important',
  },
  footer: {
    bottom: '0',
    borderTop: '1px solid #e7e7e7',
    padding: '15px 0',
    ...defaultFont,
  },
  container,
  a: {
    color: primaryColor,
    textDecoration: 'none',
    backgroundColor: 'transparent',
  },
  list: {
    marginBottom: '0',
    padding: '0',
    marginTop: '0',
  },
  inlineBlock: {
    display: 'inline-block',
    paddingTop: '0px',
    width: 'auto',
  },
};
export default footerStyle;
