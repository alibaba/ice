import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';

import Card from 'components/Card';
import FormInputs from 'components/FormInputs';
import UserCard from 'components/UserCard';
import CustomButton from 'components/CustomButton';

import avatar from 'assets/img/faces/face-3.jpg';

class UserProfile extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Edit Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={['col-md-5', 'col-md-3', 'col-md-4']}
                      proprieties={[
                        {
                          label: 'Company (disabled)',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Company',
                          defaultValue: 'Creative Code Inc.',
                          disabled: true,
                        },
                        {
                          label: 'Username',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Username',
                          defaultValue: 'michael23',
                        },
                        {
                          label: 'Email address',
                          type: 'email',
                          bsClass: 'form-control',
                          placeholder: 'Email',
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={['col-md-6', 'col-md-6']}
                      proprieties={[
                        {
                          label: 'First name',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'First name',
                          defaultValue: 'Mike',
                        },
                        {
                          label: 'Last name',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Last name',
                          defaultValue: 'Andrew',
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={['col-md-12']}
                      proprieties={[
                        {
                          label: 'Adress',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Home Adress',
                          defaultValue:
                            'Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09',
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={['col-md-4', 'col-md-4', 'col-md-4']}
                      proprieties={[
                        {
                          label: 'City',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'City',
                          defaultValue: 'Mike',
                        },
                        {
                          label: 'Country',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Country',
                          defaultValue: 'Andrew',
                        },
                        {
                          label: 'Postal Code',
                          type: 'number',
                          bsClass: 'form-control',
                          placeholder: 'ZIP Code',
                        },
                      ]}
                    />

                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>About Me</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Here can be your description"
                            defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <CustomButton bsStyle="info" pullRight fill type="submit">
                      Update Profile
                    </CustomButton>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={avatar}
                name="Mike Andrew"
                userName="michael24"
                description={
                  <span>
                    Lamborghini Mercy
                    <br />
                    Your chick she so thirsty
                    <br />
                    I am in that two seat Lambo
                  </span>
                }
                socials={
                  <div>
                    <CustomButton simple>
                      <i className="fa fa-facebook-square" />
                    </CustomButton>
                    <CustomButton simple>
                      <i className="fa fa-twitter" />
                    </CustomButton>
                    <CustomButton simple>
                      <i className="fa fa-google-plus-square" />
                    </CustomButton>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
