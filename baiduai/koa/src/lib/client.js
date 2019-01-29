import sdk from 'baidu-aip-sdk';
import {
  APP_ID,
  API_KEY,
} from '../config';
import { SECRET_KEY } from './env';

const AipSpeechClient = sdk.speech;

export const client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);
export default client;
