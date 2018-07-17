/* eslint arrow-parens:0 */
import {
  defaultFont,
  dangerColor,
} from 'variables/global';

import dropdownStyle from './dropdownStyle.jsx';

const headerLinksStyle = (theme) => ({
  ...dropdownStyle(theme),
  search: {
    '& > div': {
      marginTop: '0',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '10px 15px !important',
      float: 'none !important',
      paddingTop: '1px',
      paddingBottom: '1px',
      padding: '0!important',
      width: '60%',
      marginTop: '40px',
      '& input': {
        color: '#FFFFFF',
      },
    },
  },
  linkText: {
    zIndex: '4',
    ...defaultFont,
    fontSize: '14px',
    margin: '0px',
  },
  buttonLink: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      margin: '10px 15px 0',
      width: '-webkit-fill-available',
      '& svg': {
        width: '24px',
        height: '30px',
        marginRight: '15px',
        marginLeft: '-15px',
      },
      '& > span': {
        justifyContent: 'flex-start',
      },
    },
  },
  searchButton: {
    [theme.breakpoints.down('sm')]: {
      top: '-50px !important',
      marginRight: '22px',
      float: 'right',
    },
  },
  margin: {
    zIndex: '4',
    margin: '0',
  },
  searchIcon: {
    width: '17px',
    zIndex: '4',
  },
  notifications: {
    zIndex: '4',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: '2px',
      border: '1px solid #FFF',
      right: '4px',
      fontSize: '9px',
      background: dangerColor,
      color: '#FFFFFF',
      minWidth: '16px',
      height: '16px',
      borderRadius: '10px',
      textAlign: 'center',
      lineHeight: '16px',
      verticalAlign: 'middle',
      display: 'block',
    },
    [theme.breakpoints.down('sm')]: {
      ...defaultFont,
      fontSize: '14px',
      marginRight: '8px',
    },
  },
  manager: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    display: 'inline-block',
  },
  searchWrapper: {
    [theme.breakpoints.down('sm')]: {
      width: '-webkit-fill-available',
      margin: '10px 15px 0',
    },
    display: 'inline-block',
  },
});

export default headerLinksStyle;
