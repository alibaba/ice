import {
  defaultFont,
  primaryBoxShadow,
  infoBoxShadow,
  successBoxShadow,
  warningBoxShadow,
  dangerBoxShadow,
  roseBoxShadow,
} from 'variables/global';

const snackbarContentStyle = {
  root: {
    ...defaultFont,
    flexWrap: 'unset',
    position: 'relative',
    padding: '20px 15px',
    lineHeight: '20px',
    marginBottom: '20px',
    fontSize: '14px',
    backgroundColor: 'white',
    color: '#555555',
    borderRadius: '3px',
    boxShadow:
      '0 12px 20px -10px rgba(255, 255, 255, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 255, 255, 0.2)',
  },
  top20: {
    top: '20px',
  },
  top40: {
    top: '40px',
  },
  info: {
    backgroundColor: '#00d3ee',
    color: '#ffffff',
    ...infoBoxShadow,
  },
  success: {
    backgroundColor: '#5cb860',
    color: '#ffffff',
    ...successBoxShadow,
  },
  warning: {
    backgroundColor: '#ffa21a',
    color: '#ffffff',
    ...warningBoxShadow,
  },
  danger: {
    backgroundColor: '#f55a4e',
    color: '#ffffff',
    ...dangerBoxShadow,
  },
  primary: {
    backgroundColor: '#af2cc5',
    color: '#ffffff',
    ...primaryBoxShadow,
  },
  rose: {
    backgroundColor: '#eb3573',
    color: '#ffffff',
    ...roseBoxShadow,
  },
  message: {
    padding: '0',
    display: 'block',
    maxWidth: '89%',
  },
  close: {
    width: '11px',
    height: '11px',
  },
  iconButton: {
    width: '24px',
    height: '24px',
  },
  icon: {
    display: 'block',
    left: '15px',
    position: 'absolute',
    top: '50%',
    marginTop: '-15px',
    width: '30px',
    height: '30px',
  },
  infoIcon: {
    color: '#00d3ee',
  },
  successIcon: {
    color: '#5cb860',
  },
  warningIcon: {
    color: '#ffa21a',
  },
  dangerIcon: {
    color: '#f55a4e',
  },
  primaryIcon: {
    color: '#af2cc5',
  },
  roseIcon: {
    color: '#eb3573',
  },
  iconMessage: {
    paddingLeft: '50px',
    display: 'block',
  },
};

export default snackbarContentStyle;
