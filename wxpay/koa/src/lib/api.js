import rq from './request';
import config from '../config';
const {
  FEEDS_HOST,
  UNIFIEDORDER_HOST,
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

export async function unifiedorder(body) {
  return rq({
    method: 'POST',
    uri: UNIFIEDORDER_HOST,
    headers: {
      'content-type': 'text/html',
    },
    json: false,
    body,
  });
}


export default {
  fetchFeeds,
  unifiedorder,
}
