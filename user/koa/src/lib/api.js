import rq from './request';
import config from '../config';
const {
  FEEDS_HOST,
  WXUSER_HOST,
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

export async function wxLogin(body) {
  return rq({
    method: 'POST',
    uri: `${WXUSER_HOST}/login`,
    body,
  });
}

export default {
  fetchFeeds,
  wxLogin,
}
