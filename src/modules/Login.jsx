import React from 'react';

import Button from 'material-ui-old/Button';
import TextField from 'material-ui-old/TextField';

import { CardActions, CardHeader, CardContent } from 'material-ui-old/Card';
import Avatar from 'material-ui-old/Avatar';
import Icon from 'material-ui-old/Icon';

import { LinearProgress } from 'material-ui-old/Progress';

import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { updateIntl } from 'react-intl-redux';

import CardWrapper from '../components/CardWrapper';
import ResponsiveCard from '../components/ResponsiveCard';

import { getLocaleForUser, languages } from '../utils/intl';
import rest from '../utils/rest';
import theme from '../utils/theme';

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  redirectPath: ownProps.location.state
    ? ownProps.location.state.from.pathname
    : '/',
});

const mapDispatchToProps = dispatch => ({
  doLogin(creds) {
    dispatch(rest.actions.auth({}, { body: JSON.stringify(creds) }));

    const storedLocale = getLocaleForUser(creds.email);
    if (storedLocale && languages[storedLocale]) {
      dispatch(updateIntl({
        locale: storedLocale,
        messages: languages[storedLocale].translations,
      }));
    }
  },
  redirect(path) {
    dispatch(replace(path));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  componentDidMount() {
    // FIXME: omg hax
    document.querySelector('input').focus();
  }

  shouldComponentUpdate(props) {
    if (props.auth.data && props.auth.data.token) {
      this.authSuccess();
      return false;
    }

    return true;
  }

  authSuccess() {
    const { redirect } = this.props;
    let path = this.props.redirectPath;

    if (!path || path === '/logout') {
      path = '/';
    }

    redirect(path);
  }

  handleChange(event, field) {
    this.setState({
      [field]: event.target.value,
    });
  }

  render() {
    const { auth } = this.props;

    const loading = auth.loading;

    const progress = loading ? <LinearProgress /> : null;

    return (
      <CardWrapper>
        <ResponsiveCard style={{ maxWidth: 360 }}>
          <CardHeader
            avatar={
              <Avatar style={{ backgroundColor: theme.legacyPalette.primary[500] }}>
                <Icon>account_circle</Icon>
              </Avatar>
            }
            title="frontend-hipster-kit"
            subheader="Please log in:"
          />
          <CardContent>
            <TextField
              ref={(c) => { this.email = c; }}
              type="text"
              label="Email"
              onChange={(event) => {
                if (event.keyCode !== 13) {
                  this.handleChange(event, 'email');
                }
              }}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  this.props.doLogin({ email: this.state.email, password: this.state.password });
                }
              }}
            />
            <TextField
              type="password"
              label="Password"
              onChange={(event) => {
                if (event.keyCode !== 13) {
                  this.handleChange(event, 'password');
                }
              }}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  this.props.doLogin({ email: this.state.email, password: this.state.password });
                }
              }}
            />
          </CardContent>
          <CardActions
            style={{
              margin: theme.spacing.desktopGutter,
              marginTop: '0px',
            }}
          >
            <Button
              raised
              style={{
                width: '100%',
              }}
              primary
              onClick={() =>
                this.props.doLogin({ email: this.state.email, password: this.state.password })
              }
            >
              Login
            </Button>
          </CardActions>
          {progress}
        </ResponsiveCard>
      </CardWrapper>
    );
  }
}
