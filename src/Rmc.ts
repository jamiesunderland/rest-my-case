import HttpConfig from './HttpConfig';
import Http from './Http';
import CaseConverter from './CaseConverter';
import HttpMethod from './HttpMethod';

import HttpResponse from './interfaces/HttpResponse';
import HttpRequest from './interfaces/HttpRequest';
import HttpPayload from './interfaces/HttpPayload';
import ResponseType from './interfaces/ResponseType';
import Headers from './interfaces/Headers';
import { RequestHook, ResponseHook } from './interfaces/Hooks';

export interface RmcHttp {
  config: HttpConfig,
  headers(headers: Headers):  Http;
  uriPrefix(uriPrefix: string):  Http;
  requestHook(requestHook: RequestHook):  Http;
  responseHook(responseHook: ResponseHook):  Http;
  responseHook(responseHook: ResponseHook):  Http;
  request<T, U>(method: HttpMethod, uri: string, query: string | {}): ResponseType<T|U>;
  get<T, U>(uri: string, query: string | {}): ResponseType<T|U>;
  post<T, U>(uri: string, param: {}): ResponseType<T|U>;
  put<T, U>(uri: string, param: {}): ResponseType<T|U>;
  patch<T, U>(uri: string, param: {}): ResponseType<T|U>;
  delete<T, U>(uri: string, param: {}): ResponseType<T|U>;
  options<T, U>(uri: string, param: {}): ResponseType<T|U>;
  head<T, U>(uri: string, param: {}): ResponseType<T|U>;
  connect<T, U>(uri: string, param: {}): ResponseType<T|U>;
  trace<T, U>(uri: string, param: {}): ResponseType<T|U>;
  convertToServerCase(data: any) : any;
  convertToClientCase(data: any) : any;
}

export default () => {
  let config: HttpConfig = new HttpConfig();
  return ((config: HttpConfig): RmcHttp => ({

    config,

    headers: (headers: Headers): Http => {
      return Http.default(config).headers(headers);
    },

    uriPrefix: (uriPrefix: string): Http => {
      return Http.default(config).uriPrefix(uriPrefix);
    },

    requestHook: (requestHook: RequestHook): Http => {
      return Http.default(config).requestHook(requestHook);
    },

    responseHook: (responseHook: ResponseHook): Http => {
      return Http.default(config).responseHook(responseHook);
    },

    request: <T, U>(uri: string, query: string | {}): ResponseType<T|U> => {
      return Http.default(config).get<T, U>(uri, query);
    },

    get: <T, U>(uri: string, query: string | {}): ResponseType<T|U> => {
      return Http.default(config).get<T, U>(uri, query);
    },

    post: <T, U>(uri: string, query: {}): ResponseType<T|U> => {
      return Http.default(config).post<T, U>(uri, query);
    },

    put: <T, U>(uri: string, query: {}): ResponseType<T|U> => {
      return Http.default(config).put<T, U>(uri, query);
    },

    patch: <T, U>(uri: string, query: {}): ResponseType<T|U> => {
      return Http.default(config).patch<T, U>(uri, query);
    },

    delete: <T, U>(uri: string, query: {}): ResponseType<T|U> => {
      return Http.default(config).delete<T, U>(uri, query);
    },

    options: <T, U>(uri: string, query: {}): ResponseType<T|U> => {
      return Http.default(config).options<T, U>(uri, query);
    },

    head: <T, U>(uri: string, query: {}): ResponseType<T|U> => {
      return Http.default(config).head<T, U>(uri, query);
    },

    connect: <T, U>(uri: string, query: {}): ResponseType<T|U> => {
      return Http.default(config).connect<T, U>(uri, query);
    },

    trace: <T, U>(uri: string, query: {}): ResponseType<T|U> => {
      return Http.default(config).trace<T, U>(uri, query);
    },

    convertToServerCase(data: any): any {
      return (new CaseConverter(config)).convertToServerCase(data);
    },

    convertToClientCase(data: any): any {
      return (new CaseConverter(config)).convertToClientCase(data);
    },
  }))(config);
};
