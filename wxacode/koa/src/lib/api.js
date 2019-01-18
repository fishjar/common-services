import rq from './request';
import config from '../config';
const {
  FEEDS_HOST,
  TOKEN_HOST,
  WXAPP_HOST,
  WXACODE_URL,
} = config;

export async function fetchFeeds(qs) {
  return rq({
    method: 'GET',
    uri: FEEDS_HOST,
    // headers: {
    //   'User-Agent': 'Request-Promise',
    // },
    // qs: {
    //   foo: 'bar',
    // },
    // body: {
    //   some: 'payload',
    // },
    qs,
  });
}

export async function fetchAccessToken(qs) {
  return rq({
    method: 'GET',
    uri: `${WXAPP_HOST}/token`,
    qs,
  });
}

export async function fetchWxacode({ code_type, params, access_token }) {
  return rq({
    method: 'POST',
    uri: WXACODE_URL[code_type],
    encoding: null,
    qs: {
      access_token,
    },
    body: params,
  });
}

export default {
  fetchFeeds,
  fetchAccessToken,
  fetchWxacode,
}
