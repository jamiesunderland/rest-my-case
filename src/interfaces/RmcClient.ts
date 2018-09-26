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
  request<T>(method: HttpMethod, uri: string, query: string | {}): ResponseType<T>;
  get<T>(uri: string, query?: string | {}): ResponseType<T>;
  post<T>(uri: string, param: {}): ResponseType<T>;
  put<T>(uri: string, param: {}): ResponseType<T>;
  patch<T>(uri: string, param: {}): ResponseType<T>;
  delete<T>(uri: string, param: {}): ResponseType<T>;
  options<T>(uri: string, param: {}): ResponseType<T>;
  head<T>(uri: string, param: {}): ResponseType<T>;
  connect<T>(uri: string, param: {}): ResponseType<T>;
  trace<T>(uri: string, param: {}): ResponseType<T>;
  convertToServerCase(data: any) : any;
  convertToClientCase(data: any) : any;
}
