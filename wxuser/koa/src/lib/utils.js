import WXBizDataCrypt from '../lib/WXBizDataCrypt';

const foo = function () {
  return 'bar'
};

const encryData = function ({ appid, sessionKey, encryptedData, iv }) {
  const pc = new WXBizDataCrypt(appid, sessionKey);
  const data = pc.decryptData(encryptedData, iv);
  return data;
}

export default {
  foo,
  encryData,
}
