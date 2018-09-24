import {
  camelCase,
  snakeCase
} from 'change-case';

import Http from './Http';
import Headers from './interfaces/Headers';
import HttpResponse from './interfaces/HttpResponse';
import { RequestHook, ResponseHook } from './interfaces/Hooks';

export default class HttpConfig {

  public static readonly HTTP: string = 'http';

  public serverCase: (string) => string = snakeCase;
  public clientCase: (string) => string = camelCase;

  public headers: Headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  };

  public uriPrefix: string = '';
  public autoUnwrapPayload: boolean = true;

  public requestHook: RequestHook = (http: Http) => http;
  public responseHook: ResponseHook = (response: HttpResponse) => response;

  public hostname: string = null; 
  public port: number = null; 
  public protocol: string = null; 

  public useHttp() {
    this.protocol = 'http';
  }

  public useHttps() {
    this.protocol = 'https';
  }
}
