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

    query: (query: object | string = {}): Http => {
      return Http.default(config).query(query);
    },

    request: <T>(uri: string, param?: {}): ResponseType<T> => {
      return Http.default(config).get<T>(uri, param);
    },

    get: <T>(uri: string, query?: string | {}): ResponseType<T> => {
      return Http.default(config).get<T>(uri, query);
    },

    post: <T>(uri: string, params: {}): ResponseType<T> => {
      return Http.default(config).post<T>(uri, params);
    },

    put: <T>(uri: string, params: {}): ResponseType<T> => {
      return Http.default(config).put<T>(uri, params);
    },

    patch: <T>(uri: string, params: {}): ResponseType<T> => {
      return Http.default(config).patch<T>(uri, params);
    },

    delete: <T>(uri: string, params: {}): ResponseType<T> => {
      return Http.default(config).delete<T>(uri, params);
    },

    options: <T>(uri: string, params: {}): ResponseType<T> => {
      return Http.default(config).options<T>(uri, params);
    },

    head: <T>(uri: string, params: {}): ResponseType<T> => {
      return Http.default(config).head<T>(uri, params);
    },

    connect: <T>(uri: string, params: {}): ResponseType<T> => {
      return Http.default(config).connect<T>(uri, params);
    },

    trace: <T>(uri: string, params: {}): ResponseType<T> => {
      return Http.default(config).trace<T>(uri, params);
    },

    convertToServerCase(data: any): any {
      return (new CaseConverter(config)).convertToServerCase(data);
    },

    convertToClientCase(data: any): any {
      return (new CaseConverter(config)).convertToClientCase(data);
    },
  };
};
