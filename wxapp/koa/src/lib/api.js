import rq from './request';
import config from '../config';
const {
  TOKEN_HOST,
  CODE2SESSION_HOST,
} = config;

export async function fetchFeeds(qs) {
  return rq({
    method: 'GET',
    uri: 'https://api.github.com/feeds',
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

export async function fetchToken(qs) {
  return rq({
    method: 'GET',
    uri: TOKEN_HOST,
    qs,
  });
}

export async function code2session(qs) {
  return rq({
    method: 'GET',
    uri: CODE2SESSION_HOST,
    qs,
  });
}

