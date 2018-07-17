import {
  primaryColor,
  primaryBoxShadow,
  defaultFont,
} from 'variables/global';

const dropdownStyle = theme => ({
  buttonLink: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      marginLeft: '30px',
      width: 'auto',
    },
  },
  links: {
    width: '20px',
    height: '20px',
    zIndex: '4',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      width: '30px',
      height: '30px',
      color: '#a9afbb',
      marginRight: '15px',
    },
  },
  linkText: {
    zIndex: '4',
    ...defaultFont,
    fontSize: '14px',
  },
  popperClose: {
    pointerEvents: 'none',
  },
  pooperResponsive: {
    [theme.breakpoints.down('md')]: {
      zIndex: '1640',
      position: 'static',
      float: 'none',
      width: 'auto',
      marginTop: '0',
      backgroundColor: 'transparent',
      border: '0',
      WebkitBoxShadow: 'none',
      boxShadow: 'none',
      color: 'black',
    },
  },
  dropdown: {
    borderRadius: '3px',
    border: '0',
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
    top: '100%',
    zIndex: '1000',
    minWidth: '160px',
    padding: '5px 0',
    margin: '2px 0 0',
    fontSize: '14px',
    textAlign: 'left',
    listStyle: 'none',
    backgroundColor: '#fff',
    WebkitBackgroundClip: 'padding-box',
    backgroundClip: 'padding-box',
  },
  dropdownItem: {
    ...defaultFont,
    fontSize: '13px',
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '2px',
    WebkitTransition: 'all 150ms linear',
    MozTransition: 'all 150ms linear',
    OTransition: 'all 150ms linear',
    MsTransition: 'all 150ms linear',
    transition: 'all 150ms linear',
    display: 'block',
    clear: 'both',
    fontWeight: '400',
    lineHeight: '1.42857143',
    color: '#333',
    whiteSpace: 'nowrap',
    height: 'unset',
    '&:hover': {
      backgroundColor: primaryColor,
      color: '#FFFFFF',
      ...primaryBoxShadow,
    },
  },
});

export default dropdownStyle;
