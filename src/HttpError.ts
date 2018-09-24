import Http from './Http';
import HttpConfig from './HttpConfig';
import HttpResponse from './interfaces/HttpResponse';
import HttpErrorMessage from './interfaces/HttpErrorMessage';
import HttpPayload from './interfaces/HttpPayload';
import CaseConverter from './CaseConverter';

export default class HttpError implements HttpResponse {

  private response: HttpResponse;
  private caseConverter: CaseConverter;
  private config: HttpConfig;
  public status: number;
  public ok: false;

  constructor(response: HttpResponse, config: HttpConfig) {
    this.response = response;
    this.status = response.status;
    this.caseConverter = new CaseConverter(config);
    this.config = config;
  }

  public json<T>(): Promise<HttpErrorMessage<T>> {
    if (!this.response.json) {
      const errorMessage: HttpErrorMessage<T> = {
        status: this.response.status,
        message: this.response.statusText,
        payload: {},
        unwrap: () => ({})
      };
      throw Http.handleUnwrapping(this.config, errorMessage);
    } else {
      return this.response.json()
        .then((json: any) => {
          let payload: T;
          try {
            payload = this.caseConverter.convertToClientCase(json); 
            const errorMessage: HttpErrorMessage<T> = {
              status: this.response.status,
              message: this.response.statusText,
              payload,
              unwrap: (): T => payload   
            };
            throw Http.handleUnwrapping(this.config, errorMessage);
          } catch (error) {
            throw this.throwHttpError(error)
          }
        }).catch(error => {
          throw this.throwHttpError(error)
        });
    }
  }

  private throwHttpError<T>(error: any): HttpPayload<T> | T | {} {
    const errorMessage: HttpErrorMessage<T> = {
      status: this.response.status,
      message: this.response.statusText,
      payload: error,
      unwrap: () => error   
    };
    return Http.handleUnwrapping(this.config, errorMessage);
  }
}
