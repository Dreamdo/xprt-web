import React from 'react';
import Radium from 'radium';

import FlatButton from 'material-ui-old/FlatButton';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import rest from '../utils/rest';

import { openLoginModal } from './LoginModal';
import { openRegisterModal } from './RegisterModal';
import XprtBackground from '../../assets/xprt-background.png';
import Footer from '../components/Footer';

import theme from '../utils/theme';

const styles = {
  wrapper: {
    color: theme.legacyPalette.textColor,
    backgroundImage: `url(${XprtBackground})`,
    backgroundSize: 'cover',
  },
  teacherExpertWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    '@media (max-width: 900px)': {
      flexDirection: 'column-reverse',
    },
  },
  teacherExpertWrapperBottom: {
    display: 'flex',
    paddingBottom: '25px',
    '@media (max-width: 900px)': {
      flexDirection: 'column-reverse',
    },
  },
  secondWrapper: {
    height: '75vmin',
    display: 'flex',
    flexDirection: 'column',
  },
  secondInnerWrapper: {
    background: '#cccccc',
    height: '70vmin',
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  landingWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100vh',
    paddingLeft: '4%',
    paddingRight: '4%',
    '@media (max-width: 900px)': {
      marginTop: 10,
    },
  },
  smallHeader: {
    color: theme.legacyPalette.primary1Color,
    letterSpacing: '4px',
  },
  smallHeaderUnder: {
    color: theme.legacyPalette.primary1Color,
    letterSpacing: '4px',
    marginTop: '10%',
  },
  bigHeader: {
    color: theme.legacyPalette.primary1Color,
    fontWeight: 300,
    '@media (max-width: 900px)': {
      fontSize: 24,
    },
  },
  empty: {
    flex: 3,
    flexBasis: '200px',
    '@media (max-width: 900px)': {
      display: 'none',
    },
  },
  bigText: {
    flex: 4,
    fontSize: '18px',
    fontWeight: '300',
    flexBasis: '200px',
    marginLeft: '3em',
    paddingLeft: '3em',
    '@media (max-width: 900px)': {
      margin: 0,
      padding: 0,
      textAlign: 'center',
    },
  },
  leftSpace: {
    flex: 2,
    '@media (max-width: 1280px)': {
      display: 'none',
    },
  },
  rightSpace: {
    flex: 2,
    '@media (max-width: 1280px)': {
      display: 'none',
    },
  },
  leftText: {
    fontSize: '18px',
    fontWeight: '300',
    textAlign: 'right',
    flex: 3,
    '@media (max-width: 900px)': {
      textAlign: 'center',
      fontSize: '16px',
    },
  },
  rightText: {
    fontSize: '18px',
    fontWeight: '300',
    borderLeft: '1px solid rgba(204, 204, 204, .34)',
    borderBottom: 0,
    textAlign: 'left',
    display: 'flex',
    flex: 4,
    flexDirection: 'column',
    marginLeft: '3em',
    paddingLeft: '3em',
    '@media (max-width: 900px)': {
      textAlign: 'center',
      margin: 0,
      padding: 0,
      borderLeft: 0,
      borderBottom: '1px solid rgba(204, 204, 204, .34)',
      fontSize: '16px',
    },
  },
  buttonStyle: {
    border: '1px solid #555555',
    // padding: '15px',
    borderRadius: '20px',
    // lineHeight: '0.4em',
    marginTop: '1em',
    margin: 5,
    width: '235px',
  },
  buttonGold: {
    color: theme.legacyPalette.primary2Color,
  },
  mobileHide: {
    '@media (max-width: 900px)': {
      display: 'none',
    },
  },
  video: {
    position: 'relative',
    width: '100%',
    height: 0,
    paddingBottom: '56.25%',
  },
  videoSize: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  mobileShow: {
    '@media (min-width: 901px)': {
      display: 'none',
    },
  },
};

const mapStateToProps = state => ({
  isLoggedIn: !!state.auth.data.token,
});

const mapDispatchToProps = dispatch => ({
  getExperts() {
    dispatch(rest.actions.experts());
  },
  changeView(view) {
    dispatch(push(view.toLowerCase()));
  },
  doLogin(creds, callback) {
    dispatch(rest.actions.auth({}, { body: JSON.stringify(creds) }, callback));
  },
  doOpenRegisterModal: () => dispatch(openRegisterModal()),
  doOpenLoginModal: () => dispatch(openLoginModal()),
});

@connect(mapStateToProps, mapDispatchToProps)
@Radium
class About extends React.Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.landingWrapper}>
          <div style={styles.headerWrapper}>
            <div style={styles.leftSpace} />
            <div style={styles.empty} />
            <div style={styles.bigText}>
              <h1 style={styles.bigHeader}>About</h1>
            </div>
            <div style={styles.rightSpace} />
          </div>

          <div style={styles.teacherExpertWrapperBottom}>
            <div style={styles.leftSpace} />
            <div style={styles.leftText}>
              <p style={styles.smallHeader}>TEACHERS</p>
              <p>
                Download and install the app to browse and view the experts profile. Easily invite
                experts to your classroom.
              </p>
              <div>
                <FlatButton label="DOWNLOAD FOR IPHONE" style={styles.buttonStyle} href="https://itunes.apple.com/fi/app/xprt/id1257645964?mt=8"/>
              </div>
              <div>
                <FlatButton label="DOWNLOAD FOR ANDROID" style={styles.buttonStyle} href="https://play.google.com/store/apps/details?id=org.hundred.xprt"/>
              </div>

              <p style={styles.smallHeaderUnder}>EXPERTS</p>
              <p>
                Sign up as an expert and  to share your skills for the benefit of the future
                generation.
              </p>
              {this.props.isLoggedIn ?
                <FlatButton label="MY PROFILE" style={{ ...styles.buttonStyle, ...styles.buttonGold }} onTouchTap={() => this.props.changeView('/profile')} />
                :
                <div>
                  <div>
                    <FlatButton
                      label="CREATE AN ACCOUNT"
                      style={{ ...styles.buttonStyle, ...styles.buttonGold }}
                      onTouchTap={this.props.doOpenRegisterModal}
                    />
                  </div>
                  <div>
                    <FlatButton
                      label="LOGIN"
                      style={{ ...styles.buttonStyle, ...styles.buttonGold }}
                      onTouchTap={this.props.doOpenLoginModal}
                    />
                  </div>
                </div>
              }
            </div>
            <div style={styles.rightText}>
              <p>
                Xprt connects teachers and experts for the benefit on Finnish school children.
                Arranging a visiting lecture from a professional expert has become easier
              </p>
              <p>
                See Xprt in action.
              </p>
              <div style={styles.video}>
                <iframe
                  title="HundrED introduction video"
                  style={styles.videoSize}
                  src="https://www.youtube.com/embed/niGGKthoCNQ"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
            <div style={styles.rightSpace} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default About;
