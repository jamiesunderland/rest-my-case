import * as fetch from 'isomorphic-fetch';

import HttpConfig from './HttpConfig';
import HttpError from './HttpError';
import CaseConverter from './CaseConverter';
import HttpStringHelper from './HttpStringHelper';
import HttpMethod from './HttpMethod';
import HttpResponse from './interfaces/HttpResponse';
import HttpRequest from './interfaces/HttpRequest';
import HttpPayload from './interfaces/HttpPayload';
import ResponseType from './interfaces/ResponseType';
import Headers from './interfaces/Headers';
import { RequestHook, ResponseHook } from './interfaces/Hooks';

export default class Http {

  private static readonly EMPTY_RESPONSE: number = 204;

  protected caseConverter: CaseConverter;
  protected httpStringHelper: HttpStringHelper;
  private config: HttpConfig;
  private _headers: Headers;
  private _uriPrefix: string;
  private _queryString: string = '';
  private _requestHook: RequestHook;
  protected _responseHook: ResponseHook;

  constructor(
    config: HttpConfig,
    headers: Headers,
    uriPrefix: string,
    requestHook: RequestHook,
    responseHook: ResponseHook
  ) {
    this._headers = headers;
    this.httpStringHelper = new HttpStringHelper(config);
    this._uriPrefix = this.httpStringHelper.formatUriPrefix(uriPrefix);
    this._requestHook = requestHook;
    this._responseHook = responseHook;
    this.config = config;
    this.caseConverter = new CaseConverter(config);
  }

  public static default(config: HttpConfig): Http {
    return new Http(
      config,
      config.headers,
      config.uriPrefix,
      config.requestHook,
      config.responseHook
    );
  }

  public headers(headers: Headers): Http {
    this._headers = headers;
    return this;
  }

  public uriPrefix(uriPrefix: string): Http {
    this._uriPrefix = this.httpStringHelper.formatUriPrefix(uriPrefix);
    return this;
  }

  public requestHook(requestHook: RequestHook): Http {
    this._requestHook = requestHook;
    return this;
  }

  public responseHook(responseHook: ResponseHook): Http {
    this._responseHook = responseHook;
    return this;
  }

  public query(query: object | string = {}): Http {
    this._queryString = this.httpStringHelper.getQuery(query);
    return this;
  }

  public async request<T>(method: HttpMethod, uri: string, data: any): ResponseType<T> {
    const http: Http = await this._requestHook(this, this._headers, data);
    const serverCaseData = this.caseConverter.convertToServerCase(data);
    const rawResponse: HttpResponse = await this.fetch(method, uri, data)
    const checkedResponse: HttpResponse = http.checkResponse(rawResponse);
    const response = await http._responseHook(checkedResponse);
    return http.processResponse<T>(response)
    .then(v => Http.handleUnwrapping<T>(this.config, v));
  }

  public static handleUnwrapping<T>(config: HttpConfig, response: HttpPayload<T>): HttpPayload<T> | T | {} {
    if (config.autoUnwrapPayload) {
      return response.unwrap();
    }
    return response;
  }

  private fetch<T>(method: HttpMethod, uri: string, data: any): Promise<any> {
    const requestUrl = this.httpStringHelper.requestUrl(uri, this._uriPrefix, this._queryString);
    if (method === HttpMethod.GET) {
      const emptyBody: any = {};
      return fetch(requestUrl, {
        headers: this._headers,
        method,
        ...emptyBody
      });
    }
    return fetch(requestUrl, {
      headers: this._headers,
      method,
      ...this.body(data)
    });
  }

  private body(data: any) : any {
    return data ? { body: JSON.stringify(data) } : {};
  }

  protected checkResponse(response: HttpResponse): HttpResponse {
    return response.ok ? response : new HttpError(response, this.config);
  }

  protected async processResponse<T>(response: HttpResponse): HttpRequest<T> {
    if (response instanceof HttpError) {
      return await response.json();
    }
    if (response.status == Http.EMPTY_RESPONSE) {
      return {
        status: response.status,
        payload: {},
        unwrap: () => ({})
      };
    }
    const body = await response.json();
    const payload: T = this.caseConverter.convertToClientCase(body);
    return {
      status: response.status,
      payload,
      unwrap: () => payload
    };
  }

  public async get<T>(uri: string, query: string | {} = {}): ResponseType<T> {
    return await this.query(query).request<T>(HttpMethod.GET, uri, null);
  }

  public async post<T>(uri: string, params: {}): ResponseType<T> {
    return await this.request<T>(HttpMethod.POST, uri, params);
  }

  public async put<T>(uri: string, params: {}): ResponseType<T> {
    return await this.request<T>(HttpMethod.PUT, uri, params);
  }

  public async patch<T>(uri: string, params: {}): ResponseType<T> {
    return await this.request<T>(HttpMethod.PATCH, uri, params);
  }

  public async delete<T>(uri: string, params: {}): ResponseType<T> {
    return await this.request<T>(HttpMethod.DELETE, uri, params);
  }

  public async options<T>(uri: string, params: {}): ResponseType<T> {
    return await this.request<T>(HttpMethod.OPTIONS, uri, params);
  }

  public async head<T>(uri: string, params: {}): ResponseType<T> {
    return await this.request<T>(HttpMethod.HEAD, uri, params);
  }

  public async connect<T>(uri: string, params: {}): ResponseType<T> {
    return await this.request<T>(HttpMethod.CONNECT, uri, params);
  }

  public async trace<T>(uri: string, params: {}): ResponseType<T> {
    return await this.request<T>(HttpMethod.TRACE, uri, params);
  }
}
