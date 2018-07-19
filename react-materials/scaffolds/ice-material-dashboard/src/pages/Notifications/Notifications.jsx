/* eslint-disable */
import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
// @material-ui/icons
import AddAlert from '@material-ui/icons/AddAlert';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import SnackbarContent from 'components/Snackbar/SnackbarContent.jsx';
import Snackbar from 'components/Snackbar/Snackbar.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
};

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false,
    };
  }
  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Notifications</h4>
          <p className={classes.cardCategoryWhite}>
            Handcrafted by our friends from{' '}
            <a target="_blank" href="#">
              Material UI
            </a>{' '}
            and styled by{' '}
            <a target="_blank" href="#">
              Creative Tim
            </a>. Please checkout the{' '}
            <a href="#pablo" target="_blank">
              full documentation
            </a>.
          </p>
        </CardHeader>
        <CardBody>
          <Grid container>
            <GridItem xs={12} sm={12} md={6}>
              <h5>Notifications Style</h5>
              <br />
              <SnackbarContent message={'This is a plain notification'} />
              <SnackbarContent
                message={'This is a notification with close button.'}
                close
              />
              <SnackbarContent
                message={'This is a notification with close button and icon.'}
                close
                icon={AddAlert}
              />
              <SnackbarContent
                message={
                  "This is a notification with close button and icon and have many lines. You can see that the icon and the close button are always vertically aligned. This is a beautiful notification. So you don't have to worry about the style."
                }
                close
                icon={AddAlert}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <h5>Notifications States</h5>
              <br />
              <SnackbarContent
                message={
                  'INFO - This is a regular notification made with color="info"'
                }
                close
                color="info"
              />
              <SnackbarContent
                message={
                  'SUCCESS - This is a regular notification made with color="success"'
                }
                close
                color="success"
              />
              <SnackbarContent
                message={
                  'WARNING - This is a regular notification made with color="warning"'
                }
                close
                color="warning"
              />
              <SnackbarContent
                message={
                  'DANGER - This is a regular notification made with color="danger"'
                }
                close
                color="danger"
              />
              <SnackbarContent
                message={
                  'PRIMARY - This is a regular notification made with color="primary"'
                }
                close
                color="primary"
              />
            </GridItem>
          </Grid>
          <br />
          <br />
          <Grid container justify="center">
            <GridItem xs={12} sm={12} md={6} style={{ textAlign: 'center' }}>
              <h5>
                Notifications Places
                <small>Click to view notifications</small>
              </h5>
            </GridItem>
          </Grid>
          <Grid container justify="center">
            <GridItem xs={12} sm={12} md={10} lg={8}>
              <Grid container>
                <GridItem xs={12} sm={12} md={4}>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => this.showNotification('tl')}
                  >
                    Top Left
                  </Button>
                  <Snackbar
                    place="tl"
                    color="info"
                    icon={AddAlert}
                    message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                    open={this.state.tl}
                    closeNotification={() => this.setState({ tl: false })}
                    close
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => this.showNotification('tc')}
                  >
                    Top Center
                  </Button>
                  <Snackbar
                    place="tc"
                    color="info"
                    icon={AddAlert}
                    message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                    open={this.state.tc}
                    closeNotification={() => this.setState({ tc: false })}
                    close
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => this.showNotification('tr')}
                  >
                    Top Right
                  </Button>
                  <Snackbar
                    place="tr"
                    color="info"
                    icon={AddAlert}
                    message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                    open={this.state.tr}
                    closeNotification={() => this.setState({ tr: false })}
                    close
                  />
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
          <Grid container justify={'center'}>
            <GridItem xs={12} sm={12} md={10} lg={8}>
              <Grid container>
                <GridItem xs={12} sm={12} md={4}>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => this.showNotification('bl')}
                  >
                    Bottom Left
                  </Button>
                  <Snackbar
                    place="bl"
                    color="info"
                    icon={AddAlert}
                    message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                    open={this.state.bl}
                    closeNotification={() => this.setState({ bl: false })}
                    close
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => this.showNotification('bc')}
                  >
                    Bottom Center
                  </Button>
                  <Snackbar
                    place="bc"
                    color="info"
                    icon={AddAlert}
                    message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                    open={this.state.bc}
                    closeNotification={() => this.setState({ bc: false })}
                    close
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => this.showNotification('br')}
                  >
                    Bottom Right
                  </Button>
                  <Snackbar
                    place="br"
                    color="info"
                    icon={AddAlert}
                    message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer.Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer.Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer.Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer.Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer.Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                    open={this.state.br}
                    closeNotification={() => this.setState({ br: false })}
                    close
                  />
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    );
  }
}

export default withStyles(styles)(Notifications);
