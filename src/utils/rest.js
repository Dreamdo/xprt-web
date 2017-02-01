import 'isomorphic-fetch';
import reduxApi, { transformers } from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import config from 'config';

import { storeToken, getToken } from './persist'

// Endpoint configurations
const rest = reduxApi({
  auth: {
    url: `${config.API_ROOT}/admins/authenticate`,
    transformer: (data = {
      token: getToken()
    }) => {
      if (data.token) {
        storeToken(data.token);
      }
      return data;
    },
    options: {
      method: 'POST'
    }
  },
  experts: {
    url: `${config.API_ROOT}/experts`,
    transformer: transformers.array,
    crud: true,
  },
  // Add more API endpoints here! Examples below:

  /*
  // These example endpoints can be called by dispatching the respective actions, e.g:
  //
  // dispatch(rest.actions.teams.post({teamId: 42}, { body: JSON.stringify(exampleData) }));
  // Results in: POST /teams?teamId=42 with POST data from 'exampleData'
  //
  // Result of request can be found in: `state.teams.data`
  // Information about request: `state.teams.error`, `state.teams.sync`, `state.teams.error`...

  // Endpoints which return an array (data defaults to [])
  teams: {
    url: `${config.API_ROOT}/teams`,
    transformer: transformers.array,
    crud: true,
  },
  companies: {
    url: `${config.API_ROOT}/companies`,
    transformer: transformers.array,
    crud: true,
  }

  // Endpoint which returns an object (data defaults to {})
  profile: {
    url: `${config.API_ROOT}/profile`,
    crud: true,
  }
  */
})
.use('options', (url, params, getState) => {
  const { auth: { data: { token }}} = getState();

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  // Add token to request headers
  if (token) {
    return { headers: {  ...headers, Authorization: `Bearer ${token}` } };
  }

  return { headers };
})
.use('fetch', adapterFetch(fetch));

export default rest;