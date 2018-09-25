import HttpConfig from '../HttpConfig';
import Http from '../Http';
import CaseConverter from '../CaseConverter';
import HttpMethod from '../HttpMethod';

import HttpResponse from './HttpResponse';
import HttpRequest from './HttpRequest';
import HttpPayload from './HttpPayload';
import ResponseType from './ResponseType';
import Headers from './Headers';
import { RequestHook, ResponseHook } from './Hooks';

export default interface RmcClient {
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
