import XML from 'pixl-xml';
import crypto from 'crypto';

export const foo = function () {
  return 'bar'
};

export const xml2json = function (xml) {
  return XML.parse(xml);
}

export const json2xml = function (json) {
  return XML.stringify(json, 'xml');
}

export const wxSign = function (obj, key) {
  if (!obj || !key) {
    throw new Error('签名缺少参数');
  }
  const stringA = Object.keys(obj).sort().filter(k => k !== 'sign' && obj[k]).map(k => `${k}=${obj[k]}`).join('&');
  const stringSignTemp = stringA + "&key=" + key;
  const sign = crypto.createHash('md5').update(stringSignTemp).digest('hex').toUpperCase();
  return sign;
}

export default {
  foo,
  xml2json,
  json2xml,
  wxSign,
}
