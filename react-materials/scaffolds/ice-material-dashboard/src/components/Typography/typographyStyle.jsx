import {
  defaultFont,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
} from 'variables/global';

const typographyStyle = {
  defaultFontStyle: {
    ...defaultFont,
    fontSize: '14px',
  },
  defaultHeaderMargins: {
    marginTop: '20px',
    marginBottom: '10px',
  },
  quote: {
    padding: '10px 20px',
    margin: '0 0 20px',
    fontSize: '17.5px',
    borderLeft: '5px solid #eee',
  },
  quoteText: {
    margin: '0 0 10px',
    fontStyle: 'italic',
  },
  quoteAuthor: {
    display: 'block',
    fontSize: '80%',
    lineHeight: '1.42857143',
    color: '#777',
  },
  mutedText: {
    color: '#777',
  },
  primaryText: {
    color: primaryColor,
  },
  infoText: {
    color: infoColor,
  },
  successText: {
    color: successColor,
  },
  warningText: {
    color: warningColor,
  },
  dangerText: {
    color: dangerColor,
  },
};

export default typographyStyle;
