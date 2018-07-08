import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

class BrandButtons extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>
                <strong>Brand Button</strong>
                <small> Usage ex. </small>
                <code>
                  &lt;Button className="btn-facebook btn-brand"&gt;&lt;i className="fa fa-facebook"&gt;&lt;/i&gt;&lt;span&gt;Facebook&lt;/span&gt;&lt;/Button&gt;
                </code>
              </CardHeader>
              <CardBody>
                <h6>Size Small
                  <small> Add this class <code>.btn-sm</code></small>
                </h6>
                <p>
                  <Button size="sm" className="btn-facebook btn-brand mr-1 mb-1"><i className="fa fa-facebook"></i><span>Facebook</span></Button>
                  <Button size="sm" className="btn-twitter btn-brand mr-1 mb-1"><i className="fa fa-twitter"></i><span>Twitter</span></Button>
                  <Button size="sm" className="btn-linkedin btn-brand mr-1 mb-1"><i className="fa fa-linkedin"></i><span>LinkedIn</span></Button>
                  <Button size="sm" className="btn-flickr btn-brand mr-1 mb-1"><i className="fa fa-flickr"></i><span>Flickr</span></Button>
                  <Button size="sm" className="btn-tumblr btn-brand mr-1 mb-1"><i className="fa fa-tumblr"></i><span>Tumblr</span></Button>
                  <Button size="sm" className="btn-xing btn-brand mr-1 mb-1"><i className="fa fa-xing"></i><span>Xing</span></Button>
                  <Button size="sm" className="btn-github btn-brand mr-1 mb-1"><i className="fa fa-github"></i><span>Github</span></Button>
                  <Button size="sm" className="btn-html5 btn-brand mr-1 mb-1"><i className="fa fa-html5"></i><span>HTML5</span></Button>
                  <Button size="sm" className="btn-openid btn-brand mr-1 mb-1"><i className="fa fa-openid"></i><span>OpenID</span></Button>
                  <Button size="sm" className="btn-stack-overflow btn-brand mr-1 mb-1"><i className="fa fa-stack-overflow"></i><span>StackOverflow</span></Button>
                  <Button size="sm" className="btn-css3 btn-brand mr-1 mb-1"><i className="fa fa-css3"></i><span>CSS3</span></Button>
                  <Button size="sm" className="btn-youtube btn-brand mr-1 mb-1"><i className="fa fa-youtube"></i><span>YouTube</span></Button>
                  <Button size="sm" className="btn-dribbble btn-brand mr-1 mb-1"><i className="fa fa-dribbble"></i><span>Dribbble</span></Button>
                  <Button size="sm" className="btn-google-plus btn-brand mr-1 mb-1"><i className="fa fa-google-plus"></i><span>Google+</span></Button>
                  <Button size="sm" className="btn-instagram btn-brand mr-1 mb-1"><i className="fa fa-instagram"></i><span>Instagram</span></Button>
                  <Button size="sm" className="btn-pinterest btn-brand mr-1 mb-1"><i className="fa fa-pinterest"></i><span>Pinterest</span></Button>
                  <Button size="sm" className="btn-vk btn-brand mr-1 mb-1"><i className="fa fa-vk"></i><span>VK</span></Button>
                  <Button size="sm" className="btn-yahoo btn-brand mr-1 mb-1"><i className="fa fa-yahoo"></i><span>Yahoo</span></Button>
                  <Button size="sm" className="btn-behance btn-brand mr-1 mb-1"><i className="fa fa-behance"></i><span>Behance</span></Button>
                  <Button size="sm" className="btn-dropbox btn-brand mr-1 mb-1"><i className="fa fa-dropbox"></i><span>Dropbox</span></Button>
                  <Button size="sm" className="btn-reddit btn-brand mr-1 mb-1"><i className="fa fa-reddit"></i><span>Reddit</span></Button>
                  <Button size="sm" className="btn-spotify btn-brand mr-1 mb-1"><i className="fa fa-spotify"></i><span>Spotify</span></Button>
                  <Button size="sm" className="btn-vine btn-brand mr-1 mb-1"><i className="fa fa-vine"></i><span>Vine</span></Button>
                  <Button size="sm" className="btn-foursquare btn-brand mr-1 mb-1"><i className="fa fa-foursquare"></i><span>Forsquare</span></Button>
                  <Button size="sm" className="btn-vimeo btn-brand mr-1 mb-1"><i className="fa fa-vimeo"></i><span>Vimeo</span></Button>
                </p>
                <h6>Size Normal</h6>
                <p>
                  <Button className="btn-facebook btn-brand mr-1 mb-1"><i className="fa fa-facebook"></i><span>Facebook</span></Button>
                  <Button className="btn-twitter btn-brand mr-1 mb-1"><i className="fa fa-twitter"></i><span>Twitter</span></Button>
                  <Button className="btn-linkedin btn-brand mr-1 mb-1"><i className="fa fa-linkedin"></i><span>LinkedIn</span></Button>
                  <Button className="btn-flickr btn-brand mr-1 mb-1"><i className="fa fa-flickr"></i><span>Flickr</span></Button>
                  <Button className="btn-tumblr btn-brand mr-1 mb-1"><i className="fa fa-tumblr"></i><span>Tumblr</span></Button>
                  <Button className="btn-xing btn-brand mr-1 mb-1"><i className="fa fa-xing"></i><span>Xing</span></Button>
                  <Button className="btn-github btn-brand mr-1 mb-1"><i className="fa fa-github"></i><span>Github</span></Button>
                  <Button className="btn-html5 btn-brand mr-1 mb-1"><i className="fa fa-html5"></i><span>HTML5</span></Button>
                  <Button className="btn-openid btn-brand mr-1 mb-1"><i className="fa fa-openid"></i><span>OpenID</span></Button>
                  <Button className="btn-stack-overflow btn-brand mr-1 mb-1"><i className="fa fa-stack-overflow"></i><span>StackOverflow</span></Button>
                  <Button className="btn-css3 btn-brand mr-1 mb-1"><i className="fa fa-css3"></i><span>CSS3</span></Button>
                  <Button className="btn-youtube btn-brand mr-1 mb-1"><i className="fa fa-youtube"></i><span>YouTube</span></Button>
                  <Button className="btn-dribbble btn-brand mr-1 mb-1"><i className="fa fa-dribbble"></i><span>Dribbble</span></Button>
                  <Button className="btn-google-plus btn-brand mr-1 mb-1"><i className="fa fa-google-plus"></i><span>Google+</span></Button>
                  <Button className="btn-instagram btn-brand mr-1 mb-1"><i className="fa fa-instagram"></i><span>Instagram</span></Button>
                  <Button className="btn-pinterest btn-brand mr-1 mb-1"><i className="fa fa-pinterest"></i><span>Pinterest</span></Button>
                  <Button className="btn-vk btn-brand mr-1 mb-1"><i className="fa fa-vk"></i><span>VK</span></Button>
                  <Button className="btn-yahoo btn-brand mr-1 mb-1"><i className="fa fa-yahoo"></i><span>Yahoo</span></Button>
                  <Button className="btn-behance btn-brand mr-1 mb-1"><i className="fa fa-behance"></i><span>Behance</span></Button>
                  <Button className="btn-dropbox btn-brand mr-1 mb-1"><i className="fa fa-dropbox"></i><span>Dropbox</span></Button>
                  <Button className="btn-reddit btn-brand mr-1 mb-1"><i className="fa fa-reddit"></i><span>Reddit</span></Button>
                  <Button className="btn-spotify btn-brand mr-1 mb-1"><i className="fa fa-spotify"></i><span>Spotify</span></Button>
                  <Button className="btn-vine btn-brand mr-1 mb-1"><i className="fa fa-vine"></i><span>Vine</span></Button>
                  <Button className="btn-foursquare btn-brand mr-1 mb-1"><i className="fa fa-foursquare"></i><span>Forsquare</span></Button>
                  <Button className="btn-vimeo btn-brand mr-1 mb-1"><i className="fa fa-vimeo"></i><span>Vimeo</span></Button>
                </p>
                <h6>Size Large
                  <small> Add this class <code>.btn-lg</code></small>
                </h6>
                <p>
                  <Button size="lg" className="btn-facebook btn-brand mr-1 mb-1"><i className="fa fa-facebook"></i><span>Facebook</span></Button>
                  <Button size="lg" className="btn-twitter btn-brand mr-1 mb-1"><i className="fa fa-twitter"></i><span>Twitter</span></Button>
                  <Button size="lg" className="btn-linkedin btn-brand mr-1 mb-1"><i className="fa fa-linkedin"></i><span>LinkedIn</span></Button>
                  <Button size="lg" className="btn-flickr btn-brand mr-1 mb-1"><i className="fa fa-flickr"></i><span>Flickr</span></Button>
                  <Button size="lg" className="btn-tumblr btn-brand mr-1 mb-1"><i className="fa fa-tumblr"></i><span>Tumblr</span></Button>
                  <Button size="lg" className="btn-xing btn-brand mr-1 mb-1"><i className="fa fa-xing"></i><span>Xing</span></Button>
                  <Button size="lg" className="btn-github btn-brand mr-1 mb-1"><i className="fa fa-github"></i><span>Github</span></Button>
                  <Button size="lg" className="btn-html5 btn-brand mr-1 mb-1"><i className="fa fa-html5"></i><span>HTML5</span></Button>
                  <Button size="lg" className="btn-openid btn-brand mr-1 mb-1"><i className="fa fa-openid"></i><span>OpenID</span></Button>
                  <Button size="lg" className="btn-stack-overflow btn-brand mr-1 mb-1"><i className="fa fa-stack-overflow"></i><span>StackOverflow</span></Button>
                  <Button size="lg" className="btn-css3 btn-brand mr-1 mb-1"><i className="fa fa-css3"></i><span>CSS3</span></Button>
                  <Button size="lg" className="btn-youtube btn-brand mr-1 mb-1"><i className="fa fa-youtube"></i><span>YouTube</span></Button>
                  <Button size="lg" className="btn-dribbble btn-brand mr-1 mb-1"><i className="fa fa-dribbble"></i><span>Dribbble</span></Button>
                  <Button size="lg" className="btn-google-plus btn-brand mr-1 mb-1"><i className="fa fa-google-plus"></i><span>Google+</span></Button>
                  <Button size="lg" className="btn-instagram btn-brand mr-1 mb-1"><i className="fa fa-instagram"></i><span>Instagram</span></Button>
                  <Button size="lg" className="btn-pinterest btn-brand mr-1 mb-1"><i className="fa fa-pinterest"></i><span>Pinterest</span></Button>
                  <Button size="lg" className="btn-vk btn-brand mr-1 mb-1"><i className="fa fa-vk"></i><span>VK</span></Button>
                  <Button size="lg" className="btn-yahoo btn-brand mr-1 mb-1"><i className="fa fa-yahoo"></i><span>Yahoo</span></Button>
                  <Button size="lg" className="btn-behance btn-brand mr-1 mb-1"><i className="fa fa-behance"></i><span>Behance</span></Button>
                  <Button size="lg" className="btn-dropbox btn-brand mr-1 mb-1"><i className="fa fa-dropbox"></i><span>Dropbox</span></Button>
                  <Button size="lg" className="btn-reddit btn-brand mr-1 mb-1"><i className="fa fa-reddit"></i><span>Reddit</span></Button>
                  <Button size="lg" className="btn-spotify btn-brand mr-1 mb-1"><i className="fa fa-spotify"></i><span>Spotify</span></Button>
                  <Button size="lg" className="btn-vine btn-brand mr-1 mb-1"><i className="fa fa-vine"></i><span>Vine</span></Button>
                  <Button size="lg" className="btn-foursquare btn-brand mr-1 mb-1"><i className="fa fa-foursquare"></i><span>Forsquare</span></Button>
                  <Button size="lg" className="btn-vimeo btn-brand mr-1 mb-1"><i className="fa fa-vimeo"></i><span>Vimeo</span></Button>
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>
                <strong>Brand Button</strong>
                <small> Icons only. Usage ex. </small>
                <code>
                  &lt;Button className="btn-facebook btn-brand icon"&gt;&lt;i className="fa fa-facebook"&gt;&lt;/i&gt;&lt;/Button&gt;
                </code>
              </CardHeader>
              <CardBody>
                <h6>Size Small
                  <small> Add this class <code>.btn-sm</code></small>
                </h6>
                <p>
                  <Button size="sm" className="btn-facebook btn-brand icon mr-1 mb-1"><i className="fa fa-facebook"></i></Button>
                  <Button size="sm" className="btn-twitter btn-brand icon mr-1 mb-1"><i className="fa fa-twitter"></i></Button>
                  <Button size="sm" className="btn-linkedin btn-brand icon mr-1 mb-1"><i className="fa fa-linkedin"></i></Button>
                  <Button size="sm" className="btn-flickr btn-brand icon mr-1 mb-1"><i className="fa fa-flickr"></i></Button>
                  <Button size="sm" className="btn-tumblr btn-brand icon mr-1 mb-1"><i className="fa fa-tumblr"></i></Button>
                  <Button size="sm" className="btn-xing btn-brand icon mr-1 mb-1"><i className="fa fa-xing"></i></Button>
                  <Button size="sm" className="btn-github btn-brand icon mr-1 mb-1"><i className="fa fa-github"></i></Button>
                  <Button size="sm" className="btn-html5 btn-brand icon mr-1 mb-1"><i className="fa fa-html5"></i></Button>
                  <Button size="sm" className="btn-openid btn-brand icon mr-1 mb-1"><i className="fa fa-openid"></i></Button>
                  <Button size="sm" className="btn-stack-overflow btn-brand icon mr-1 mb-1"><i className="fa fa-stack-overflow"></i></Button>
                  <Button size="sm" className="btn-css3 btn-brand icon mr-1 mb-1"><i className="fa fa-css3"></i></Button>
                  <Button size="sm" className="btn-youtube btn-brand icon mr-1 mb-1"><i className="fa fa-youtube"></i></Button>
                  <Button size="sm" className="btn-dribbble btn-brand icon mr-1 mb-1"><i className="fa fa-dribbble"></i></Button>
                  <Button size="sm" className="btn-google-plus btn-brand icon mr-1 mb-1"><i className="fa fa-google-plus"></i></Button>
                  <Button size="sm" className="btn-instagram btn-brand icon mr-1 mb-1"><i className="fa fa-instagram"></i></Button>
                  <Button size="sm" className="btn-pinterest btn-brand icon mr-1 mb-1"><i className="fa fa-pinterest"></i></Button>
                  <Button size="sm" className="btn-vk btn-brand icon mr-1 mb-1"><i className="fa fa-vk"></i></Button>
                  <Button size="sm" className="btn-yahoo btn-brand icon mr-1 mb-1"><i className="fa fa-yahoo"></i></Button>
                  <Button size="sm" className="btn-behance btn-brand icon mr-1 mb-1"><i className="fa fa-behance"></i></Button>
                  <Button size="sm" className="btn-dropbox btn-brand icon mr-1 mb-1"><i className="fa fa-dropbox"></i></Button>
                  <Button size="sm" className="btn-reddit btn-brand icon mr-1 mb-1"><i className="fa fa-reddit"></i></Button>
                  <Button size="sm" className="btn-spotify btn-brand icon mr-1 mb-1"><i className="fa fa-spotify"></i></Button>
                  <Button size="sm" className="btn-vine btn-brand icon mr-1 mb-1"><i className="fa fa-vine"></i></Button>
                  <Button size="sm" className="btn-foursquare btn-brand icon mr-1 mb-1"><i className="fa fa-foursquare"></i></Button>
                  <Button size="sm" className="btn-vimeo btn-brand icon mr-1 mb-1"><i className="fa fa-vimeo"></i></Button>
                </p>
                <h6>Size Normal</h6>
                <p>
                  <Button className="btn-facebook btn-brand icon mr-1 mb-1"><i className="fa fa-facebook"></i></Button>
                  <Button className="btn-twitter btn-brand icon mr-1 mb-1"><i className="fa fa-twitter"></i></Button>
                  <Button className="btn-linkedin btn-brand icon mr-1 mb-1"><i className="fa fa-linkedin"></i></Button>
                  <Button className="btn-flickr btn-brand icon mr-1 mb-1"><i className="fa fa-flickr"></i></Button>
                  <Button className="btn-tumblr btn-brand icon mr-1 mb-1"><i className="fa fa-tumblr"></i></Button>
                  <Button className="btn-xing btn-brand icon mr-1 mb-1"><i className="fa fa-xing"></i></Button>
                  <Button className="btn-github btn-brand icon mr-1 mb-1"><i className="fa fa-github"></i></Button>
                  <Button className="btn-html5 btn-brand icon mr-1 mb-1"><i className="fa fa-html5"></i></Button>
                  <Button className="btn-openid btn-brand icon mr-1 mb-1"><i className="fa fa-openid"></i></Button>
                  <Button className="btn-stack-overflow btn-brand icon mr-1 mb-1"><i className="fa fa-stack-overflow"></i></Button>
                  <Button className="btn-css3 btn-brand icon mr-1 mb-1"><i className="fa fa-css3"></i></Button>
                  <Button className="btn-youtube btn-brand icon mr-1 mb-1"><i className="fa fa-youtube"></i></Button>
                  <Button className="btn-dribbble btn-brand icon mr-1 mb-1"><i className="fa fa-dribbble"></i></Button>
                  <Button className="btn-google-plus btn-brand icon mr-1 mb-1"><i className="fa fa-google-plus"></i></Button>
                  <Button className="btn-instagram btn-brand icon mr-1 mb-1"><i className="fa fa-instagram"></i></Button>
                  <Button className="btn-pinterest btn-brand icon mr-1 mb-1"><i className="fa fa-pinterest"></i></Button>
                  <Button className="btn-vk btn-brand icon mr-1 mb-1"><i className="fa fa-vk"></i></Button>
                  <Button className="btn-yahoo btn-brand icon mr-1 mb-1"><i className="fa fa-yahoo"></i></Button>
                  <Button className="btn-behance btn-brand icon mr-1 mb-1"><i className="fa fa-behance"></i></Button>
                  <Button className="btn-dropbox btn-brand icon mr-1 mb-1"><i className="fa fa-dropbox"></i></Button>
                  <Button className="btn-reddit btn-brand icon mr-1 mb-1"><i className="fa fa-reddit"></i></Button>
                  <Button className="btn-spotify btn-brand icon mr-1 mb-1"><i className="fa fa-spotify"></i></Button>
                  <Button className="btn-vine btn-brand icon mr-1 mb-1"><i className="fa fa-vine"></i></Button>
                  <Button className="btn-foursquare btn-brand icon mr-1 mb-1"><i className="fa fa-foursquare"></i></Button>
                  <Button className="btn-vimeo btn-brand icon mr-1 mb-1"><i className="fa fa-vimeo"></i></Button>
                </p>
                <h6>Size Large
                  <small> Add this class <code>.btn-lg</code></small>
                </h6>
                <p>
                  <Button size="lg" className="btn-facebook btn-brand icon mr-1 mb-1"><i className="fa fa-facebook"></i></Button>
                  <Button size="lg" className="btn-twitter btn-brand icon mr-1 mb-1"><i className="fa fa-twitter"></i></Button>
                  <Button size="lg" className="btn-linkedin btn-brand icon mr-1 mb-1"><i className="fa fa-linkedin"></i></Button>
                  <Button size="lg" className="btn-flickr btn-brand icon mr-1 mb-1"><i className="fa fa-flickr"></i></Button>
                  <Button size="lg" className="btn-tumblr btn-brand icon mr-1 mb-1"><i className="fa fa-tumblr"></i></Button>
                  <Button size="lg" className="btn-xing btn-brand icon mr-1 mb-1"><i className="fa fa-xing"></i></Button>
                  <Button size="lg" className="btn-github btn-brand icon mr-1 mb-1"><i className="fa fa-github"></i></Button>
                  <Button size="lg" className="btn-html5 btn-brand icon mr-1 mb-1"><i className="fa fa-html5"></i></Button>
                  <Button size="lg" className="btn-openid btn-brand icon mr-1 mb-1"><i className="fa fa-openid"></i></Button>
                  <Button size="lg" className="btn-stack-overflow btn-brand icon mr-1 mb-1"><i className="fa fa-stack-overflow"></i></Button>
                  <Button size="lg" className="btn-css3 btn-brand icon mr-1 mb-1"><i className="fa fa-css3"></i></Button>
                  <Button size="lg" className="btn-youtube btn-brand icon mr-1 mb-1"><i className="fa fa-youtube"></i></Button>
                  <Button size="lg" className="btn-dribbble btn-brand icon mr-1 mb-1"><i className="fa fa-dribbble"></i></Button>
                  <Button size="lg" className="btn-google-plus btn-brand icon mr-1 mb-1"><i className="fa fa-google-plus"></i></Button>
                  <Button size="lg" className="btn-instagram btn-brand icon mr-1 mb-1"><i className="fa fa-instagram"></i></Button>
                  <Button size="lg" className="btn-pinterest btn-brand icon mr-1 mb-1"><i className="fa fa-pinterest"></i></Button>
                  <Button size="lg" className="btn-vk btn-brand icon mr-1 mb-1"><i className="fa fa-vk"></i></Button>
                  <Button size="lg" className="btn-yahoo btn-brand icon mr-1 mb-1"><i className="fa fa-yahoo"></i></Button>
                  <Button size="lg" className="btn-behance btn-brand icon mr-1 mb-1"><i className="fa fa-behance"></i></Button>
                  <Button size="lg" className="btn-dropbox btn-brand icon mr-1 mb-1"><i className="fa fa-dropbox"></i></Button>
                  <Button size="lg" className="btn-reddit btn-brand icon mr-1 mb-1"><i className="fa fa-reddit"></i></Button>
                  <Button size="lg" className="btn-spotify btn-brand icon mr-1 mb-1"><i className="fa fa-spotify"></i></Button>
                  <Button size="lg" className="btn-vine btn-brand icon mr-1 mb-1"><i className="fa fa-vine"></i></Button>
                  <Button size="lg" className="btn-foursquare btn-brand icon mr-1 mb-1"><i className="fa fa-foursquare"></i></Button>
                  <Button size="lg" className="btn-vimeo btn-brand icon mr-1 mb-1"><i className="fa fa-vimeo"></i></Button>
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>
                <strong>Brand Button</strong>
                <small> Text only. Usage ex. </small>
                <code>
                  &lt;Button className="btn-facebook btn-brand text"&gt;&lt;span&gt;Facebook&lt;/span&gt;&lt;/Button&gt;
                </code>
              </CardHeader>
              <CardBody>
                <h6>Size Small
                  <small> Add this class <code>.btn-sm</code></small>
                </h6>
                <p>
                  <Button size="sm" className="btn-facebook btn-brand text mr-1 mb-1"><span>Facebook</span></Button>
                  <Button size="sm" className="btn-twitter btn-brand text mr-1 mb-1"><span>Twitter</span></Button>
                  <Button size="sm" className="btn-linkedin btn-brand text mr-1 mb-1"><span>LinkedIn</span></Button>
                  <Button size="sm" className="btn-flickr btn-brand text mr-1 mb-1"><span>Flickr</span></Button>
                  <Button size="sm" className="btn-tumblr btn-brand text mr-1 mb-1"><span>Tumblr</span></Button>
                  <Button size="sm" className="btn-xing btn-brand text mr-1 mb-1"><span>Xing</span></Button>
                  <Button size="sm" className="btn-github btn-brand text mr-1 mb-1"><span>Github</span></Button>
                  <Button size="sm" className="btn-html5 btn-brand text mr-1 mb-1"><span>HTML5</span></Button>
                  <Button size="sm" className="btn-openid btn-brand text mr-1 mb-1"><span>OpenID</span></Button>
                  <Button size="sm" className="btn-stack-overflow btn-brand text mr-1 mb-1"><span>StackOverflow</span></Button>
                  <Button size="sm" className="btn-css3 btn-brand text mr-1 mb-1"><span>CSS3</span></Button>
                  <Button size="sm" className="btn-youtube btn-brand text mr-1 mb-1"><span>YouTube</span></Button>
                  <Button size="sm" className="btn-dribbble btn-brand text mr-1 mb-1"><span>Dribbble</span></Button>
                  <Button size="sm" className="btn-google-plus btn-brand text mr-1 mb-1"><span>Google+</span></Button>
                  <Button size="sm" className="btn-instagram btn-brand text mr-1 mb-1"><span>Instagram</span></Button>
                  <Button size="sm" className="btn-pinterest btn-brand text mr-1 mb-1"><span>Pinterest</span></Button>
                  <Button size="sm" className="btn-vk btn-brand text mr-1 mb-1"><span>VK</span></Button>
                  <Button size="sm" className="btn-yahoo btn-brand text mr-1 mb-1"><span>Yahoo</span></Button>
                  <Button size="sm" className="btn-behance btn-brand text mr-1 mb-1"><span>Behance</span></Button>
                  <Button size="sm" className="btn-dropbox btn-brand text mr-1 mb-1"><span>Dropbox</span></Button>
                  <Button size="sm" className="btn-reddit btn-brand text mr-1 mb-1"><span>Reddit</span></Button>
                  <Button size="sm" className="btn-spotify btn-brand text mr-1 mb-1"><span>Spotify</span></Button>
                  <Button size="sm" className="btn-vine btn-brand text mr-1 mb-1"><span>Vine</span></Button>
                  <Button size="sm" className="btn-foursquare btn-brand text mr-1 mb-1"><span>Forsquare</span></Button>
                  <Button size="sm" className="btn-vimeo btn-brand text mr-1 mb-1"><span>Vimeo</span></Button>
                </p>
                <h6>Size Normal</h6>
                <p>
                  <Button className="btn-facebook btn-brand text mr-1 mb-1"><span>Facebook</span></Button>
                  <Button className="btn-twitter btn-brand text mr-1 mb-1"><span>Twitter</span></Button>
                  <Button className="btn-linkedin btn-brand text mr-1 mb-1"><span>LinkedIn</span></Button>
                  <Button className="btn-flickr btn-brand text mr-1 mb-1"><span>Flickr</span></Button>
                  <Button className="btn-tumblr btn-brand text mr-1 mb-1"><span>Tumblr</span></Button>
                  <Button className="btn-xing btn-brand text mr-1 mb-1"><span>Xing</span></Button>
                  <Button className="btn-github btn-brand text mr-1 mb-1"><span>Github</span></Button>
                  <Button className="btn-html5 btn-brand text mr-1 mb-1"><span>HTML5</span></Button>
                  <Button className="btn-openid btn-brand text mr-1 mb-1"><span>OpenID</span></Button>
                  <Button className="btn-stack-overflow btn-brand text mr-1 mb-1"><span>StackOverflow</span></Button>
                  <Button className="btn-css3 btn-brand text mr-1 mb-1"><span>CSS3</span></Button>
                  <Button className="btn-youtube btn-brand text mr-1 mb-1"><span>YouTube</span></Button>
                  <Button className="btn-dribbble btn-brand text mr-1 mb-1"><span>Dribbble</span></Button>
                  <Button className="btn-google-plus btn-brand text mr-1 mb-1"><span>Google+</span></Button>
                  <Button className="btn-instagram btn-brand text mr-1 mb-1"><span>Instagram</span></Button>
                  <Button className="btn-pinterest btn-brand text mr-1 mb-1"><span>Pinterest</span></Button>
                  <Button className="btn-vk btn-brand text mr-1 mb-1"><span>VK</span></Button>
                  <Button className="btn-yahoo btn-brand text mr-1 mb-1"><span>Yahoo</span></Button>
                  <Button className="btn-behance btn-brand text mr-1 mb-1"><span>Behance</span></Button>
                  <Button className="btn-dropbox btn-brand text mr-1 mb-1"><span>Dropbox</span></Button>
                  <Button className="btn-reddit btn-brand text mr-1 mb-1"><span>Reddit</span></Button>
                  <Button className="btn-spotify btn-brand text mr-1 mb-1"><span>Spotify</span></Button>
                  <Button className="btn-vine btn-brand text mr-1 mb-1"><span>Vine</span></Button>
                  <Button className="btn-foursquare btn-brand text mr-1 mb-1"><span>Forsquare</span></Button>
                  <Button className="btn-vimeo btn-brand text mr-1 mb-1"><span>Vimeo</span></Button>
                </p>
                <h6>Size Large
                  <small> Add this class <code>.btn-lg</code></small>
                </h6>
                <p>
                  <Button size="lg" className="btn-facebook btn-brand text mr-1 mb-1"><span>Facebook</span></Button>
                  <Button size="lg" className="btn-twitter btn-brand text mr-1 mb-1"><span>Twitter</span></Button>
                  <Button size="lg" className="btn-linkedin btn-brand text mr-1 mb-1"><span>LinkedIn</span></Button>
                  <Button size="lg" className="btn-flickr btn-brand text mr-1 mb-1"><span>Flickr</span></Button>
                  <Button size="lg" className="btn-tumblr btn-brand text mr-1 mb-1"><span>Tumblr</span></Button>
                  <Button size="lg" className="btn-xing btn-brand text mr-1 mb-1"><span>Xing</span></Button>
                  <Button size="lg" className="btn-github btn-brand text mr-1 mb-1"><span>Github</span></Button>
                  <Button size="lg" className="btn-html5 btn-brand text mr-1 mb-1"><span>HTML5</span></Button>
                  <Button size="lg" className="btn-openid btn-brand text mr-1 mb-1"><span>OpenID</span></Button>
                  <Button size="lg" className="btn-stack-overflow btn-brand text mr-1 mb-1"><span>StackOverflow</span></Button>
                  <Button size="lg" className="btn-css3 btn-brand text mr-1 mb-1"><span>CSS3</span></Button>
                  <Button size="lg" className="btn-youtube btn-brand text mr-1 mb-1"><span>YouTube</span></Button>
                  <Button size="lg" className="btn-dribbble btn-brand text mr-1 mb-1"><span>Dribbble</span></Button>
                  <Button size="lg" className="btn-google-plus btn-brand text mr-1 mb-1"><span>Google+</span></Button>
                  <Button size="lg" className="btn-instagram btn-brand text mr-1 mb-1"><span>Instagram</span></Button>
                  <Button size="lg" className="btn-pinterest btn-brand text mr-1 mb-1"><span>Pinterest</span></Button>
                  <Button size="lg" className="btn-vk btn-brand text mr-1 mb-1"><span>VK</span></Button>
                  <Button size="lg" className="btn-yahoo btn-brand text mr-1 mb-1"><span>Yahoo</span></Button>
                  <Button size="lg" className="btn-behance btn-brand text mr-1 mb-1"><span>Behance</span></Button>
                  <Button size="lg" className="btn-dropbox btn-brand text mr-1 mb-1"><span>Dropbox</span></Button>
                  <Button size="lg" className="btn-reddit btn-brand text mr-1 mb-1"><span>Reddit</span></Button>
                  <Button size="lg" className="btn-spotify btn-brand text mr-1 mb-1"><span>Spotify</span></Button>
                  <Button size="lg" className="btn-vine btn-brand text mr-1 mb-1"><span>Vine</span></Button>
                  <Button size="lg" className="btn-foursquare btn-brand text mr-1 mb-1"><span>Forsquare</span></Button>
                  <Button size="lg" className="btn-vimeo btn-brand text mr-1 mb-1"><span>Vimeo</span></Button>
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default BrandButtons;
