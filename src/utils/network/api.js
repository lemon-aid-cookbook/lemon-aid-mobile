import axios from 'axios';
import {BASE_URL} from 'config';
import {store} from 'reduxs/index';
import {from} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {log as SysLog} from 'utils/function';
import {Header} from './model';

const headers = new Header();

export function request(param) {
  let url = `${BASE_URL}/${param.url}`;

  const language = 'vi';
  const parameters = param.param;
  const token = store.getState().Auth.token;

  headers.setHeader({
    'Content-Type': 'application/json',
    'Accept-Language': language,
    ...(token ? {Authorization: token} : {}),
  });

  return from(
    axios
      .request({
        url,
        timeout: 10000,
        headers: headers.getSnapshot(),
        method: param.method || 'POST',
        params: parameters,
        ...(param.option && param.option.format === 'json'
          ? {data: parameters, params: {}}
          : {params: parameters}),
      })
      .catch((error) => {
        return Promise.resolve(error.response);
      }),
  ).pipe(
    map((result) => {
      return result;
    }),
    tap((result) => log(url, parameters, result)),
  );
}

function log(url, parameters, result) {
  SysLog(
    '--------------------------\n',
    // '\x1b[34m',
    'Request data:',
    // '\x1b[37m',
    '\nURL:           ',
    // '\x1b[32m',
    url,
    // '\x1b[37m',
    '\nParam:         ',
    // '\x1b[32m',
    JSON.stringify(parameters, null, '\x1b[32m'),
    // '\x1b[37m',
    '\nResponse Data: ',
    // '\x1b[32m',
    JSON.stringify(result, null, '\x1b[32m') || true,
    // '\x1b[37m',
    '\n--------------------------',
  );
}
