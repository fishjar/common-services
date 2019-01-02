import rq from './request';
import config from '../config';
const {
	WXAPP_HOST,
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

export async function code2session(body) {
  return rq({
    method: 'POST',
    uri: `${WXAPP_HOST}/code2session`,
    body,
  });
}
