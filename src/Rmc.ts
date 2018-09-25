import HttpConfig from './HttpConfig';
import Http from './Http';
import CaseConverter from './CaseConverter';
import HttpMethod from './HttpMethod';

import HttpResponse from './interfaces/HttpResponse';
import HttpRequest from './interfaces/HttpRequest';
import HttpPayload from './interfaces/HttpPayload';
import ResponseType from './interfaces/ResponseType';
import Headers from './interfaces/Headers';
import RmcClient from './interfaces/RmcClient';
import { RequestHook, ResponseHook } from './interfaces/Hooks';

export default (config: HttpConfig = new HttpConfig()): RmcClient  => {
  return {
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

    get: <T, U>(uri: string, query?: string | {}): ResponseType<T|U> => {
      return Http.default(config).get<T, U>(uri, query);
    },

    post: <T, U>(uri: string, params: {}): ResponseType<T|U> => {
      return Http.default(config).post<T, U>(uri, params);
    },

    put: <T, U>(uri: string, params: {}): ResponseType<T|U> => {
      return Http.default(config).put<T, U>(uri, params);
    },

    patch: <T, U>(uri: string, params: {}): ResponseType<T|U> => {
      return Http.default(config).patch<T, U>(uri, params);
    },

    delete: <T, U>(uri: string, params: {}): ResponseType<T|U> => {
      return Http.default(config).delete<T, U>(uri, params);
    },

    options: <T, U>(uri: string, params: {}): ResponseType<T|U> => {
      return Http.default(config).options<T, U>(uri, params);
    },

    head: <T, U>(uri: string, params: {}): ResponseType<T|U> => {
      return Http.default(config).head<T, U>(uri, params);
    },

    connect: <T, U>(uri: string, params: {}): ResponseType<T|U> => {
      return Http.default(config).connect<T, U>(uri, params);
    },

    trace: <T, U>(uri: string, params: {}): ResponseType<T|U> => {
      return Http.default(config).trace<T, U>(uri, params);
    },

    convertToServerCase(data: any): any {
      return (new CaseConverter(config)).convertToServerCase(data);
    },

    convertToClientCase(data: any): any {
      return (new CaseConverter(config)).convertToClientCase(data);
    },
  };
};
