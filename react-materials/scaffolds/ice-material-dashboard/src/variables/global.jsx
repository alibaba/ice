/*!

 =========================================================
 * Material Dashboard React - v1.3.0 based on Material Dashboard - v1.2.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

// ##############################
// // // Variables - Styles that are used on more than one component
// #############################

const drawerWidth = 260;

const transition = {
  transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
};

const container = {
  paddingRight: '15px',
  paddingLeft: '15px',
  marginRight: 'auto',
  marginLeft: 'auto',
};

const boxShadow = {
  boxShadow:
    '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
};

const card = {
  display: 'inline-block',
  position: 'relative',
  width: '100%',
  margin: '25px 0',
  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
  borderRadius: '3px',
  color: 'rgba(0, 0, 0, 0.87)',
  background: '#fff',
};

const defaultFont = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: '300',
  lineHeight: '1.5em',
};

const primaryColor = '#9c27b0';
const warningColor = '#ff9800';
const dangerColor = '#f44336';
const successColor = '#4caf50';
const infoColor = '#00acc1';
const roseColor = '#e91e63';
const grayColor = '#999999';

const primaryBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2)',
};
const infoBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(0, 188, 212, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 188, 212, 0.2)',
};
const successBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(76, 175, 80, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2)',
};
const warningBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(255, 152, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2)',
};
const dangerBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(244, 67, 54, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(244, 67, 54, 0.2)',
};
const roseBoxShadow = {
  boxShadow:
    '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(233, 30, 99, 0.4)',
};

const warningCardHeader = {
  background: 'linear-gradient(60deg, #ffa726, #fb8c00)',
  ...warningBoxShadow,
};
const successCardHeader = {
  background: 'linear-gradient(60deg, #66bb6a, #43a047)',
  ...successBoxShadow,
};
const dangerCardHeader = {
  background: 'linear-gradient(60deg, #ef5350, #e53935)',
  ...dangerBoxShadow,
};
const infoCardHeader = {
  background: 'linear-gradient(60deg, #26c6da, #00acc1)',
  ...infoBoxShadow,
};
const primaryCardHeader = {
  background: 'linear-gradient(60deg, #ab47bc, #8e24aa)',
  ...primaryBoxShadow,
};
const roseCardHeader = {
  background: 'linear-gradient(60deg, #ec407a, #d81b60)',
  ...roseBoxShadow,
};

const cardActions = {
  margin: '0 20px 10px',
  paddingTop: '10px',
  borderTop: '1px solid #eeeeee',
  height: 'auto',
  ...defaultFont,
};

const cardHeader = {
  margin: '-20px 15px 0',
  borderRadius: '3px',
  padding: '15px',
};

const defaultBoxShadow = {
  border: '0',
  borderRadius: '3px',
  boxShadow:
    '0 10px 20px -12px rgba(0, 0, 0, 0.42), 0 3px 20px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  padding: '10px 0',
  transition: 'all 150ms ease 0s',
};

const title = {
  color: '#3C4858',
  textDecoration: 'none',
  fontWeight: '300',
  marginTop: '30px',
  marginBottom: '25px',
  minHeight: '32px',
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  '& small': {
    color: '#777',
    fontSize: '65%',
    fontWeight: '400',
    lineHeight: '1',
  },
};

const cardTitle = {
  ...title,
  marginTop: '0',
  marginBottom: '3px',
  minHeight: 'auto',
  '& a': {
    ...title,
    marginTop: '.625rem',
    marginBottom: '0.75rem',
    minHeight: 'auto',
  },
};

const cardSubtitle = {
  marginTop: '-.375rem',
};

const cardLink = {
  '& + $cardLink': {
    marginLeft: '1.25rem',
  },
};

export {
  // variables
  drawerWidth,
  transition,
  container,
  boxShadow,
  card,
  defaultFont,
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  primaryBoxShadow,
  infoBoxShadow,
  successBoxShadow,
  warningBoxShadow,
  dangerBoxShadow,
  roseBoxShadow,
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  cardActions,
  cardHeader,
  defaultBoxShadow,
  title,
  cardTitle,
  cardSubtitle,
  cardLink,
};
