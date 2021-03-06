import 'isomorphic-fetch';
import reduxApi, { transformers } from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import jwtDecode from 'jwt-decode';

/* eslint-disable */
import config from 'config';
/* eslint-enable */

import { showError } from '../modules/ErrorSnackbar';

let store;

export const injectStore = (_store) => {
  store = _store;
};

/*
// Endpoint configurations
These example endpoints can be called by dispatching the respective actions, e.g:

dispatch(rest.actions.teams.post({teamId: 42}, { body: JSON.stringify(exampleData) }));
Results in: POST /teams?teamId=42 with POST data from 'exampleData'

Result of request can be found in: `state.teams.data`
Information about request: `state.teams.error`, `state.teams.sync`, `state.teams.error`...
*/

const rest = reduxApi({
  auth: {
    reducerName: 'auth',
    url: `${config.apiRoot}/users/authenticate`,
    transformer: (data = {}) => {
      if (data.token) {
        return {
          ...data,
          decoded: jwtDecode(data.token),
        };
      }
      return data;
    },

    options: {
      method: 'POST',
    },
  },
  register: {
    reducerName: 'auth',
    url: `${config.apiRoot}/users`,
    transformer: (data = {}) => {
      if (data.token) {
        return {
          ...data,
          decoded: jwtDecode(data.token),
        };
      }
      return data;
    },

    options: {
      method: 'POST',
    },
  },
  profile: {
    url: `${config.apiRoot}/users/me`,
    crud: true,
  },
  invitations: {
    url: `${config.apiRoot}/invitations/:lectureId`,
    crud: true,
  },
  expertLectures: {
    url: `${config.apiRoot}/expert/lectures`,
    transformer: transformers.array,
    crud: true,
  },
  adminLectures: {
    url: `${config.apiRoot}/lectures`,
    transformer: transformers.array,
    crud: true,
  },
  adminUser: {
    url: `${config.apiRoot}/users/:userId`,
    crud: true,
  },
  users: {
    url: `${config.apiRoot}/users`,
    transformer: transformers.array,
    crud: true,
  },
  feedback: {
    url: `${config.apiRoot}/feedback`,
    crud: true,
  },
  // Add more API endpoints here! Examples below:

  /*
  // Endpoints which return an array (data defaults to [])
  teams: {
    url: `${config.apiRoot}/teams`,
    transformer: transformers.array,
    crud: true,
  },
  companies: {
    url: `${config.apiRoot}/companies`,
    transformer: transformers.array,
    crud: true,
  }

  // Endpoint which returns an object (data defaults to {})
  profile: {
    url: `${config.apiRoot}/profile`,
    crud: true,
  }
  */
})
.use('options', (url, params, getState) => {
  const { auth: { data: { token } } } = getState();

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  // Add token to request headers
  if (token) {
    return { headers: { ...headers, Authorization: `Bearer ${token}` } };
  }

  return { headers };
})
.use('fetch', adapterFetch(fetch))
.use('responseHandler', (err) => {
  if (err) {
    let msg = 'Error';

    // error code
    msg += err.statusCode ? ` ${err.statusCode}` : '';

    // error reason
    msg += err.error ? ` ${err.error}` : '';

    // error description
    msg += err.message ? `: ${err.message}` : '';
    store.dispatch(showError(msg));

    throw err;
  }
});

export default rest;
export const reducers = rest.reducers;
