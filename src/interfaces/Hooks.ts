import Http from '../Http';
import HttpResponse from './HttpResponse';

export type RequestHook = (http: Http) => Http | Promise<Http>;

export type ResponseHook = (response: HttpResponse) => HttpResponse | Promise<HttpResponse>;
