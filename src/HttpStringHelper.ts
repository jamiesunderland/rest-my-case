import HttpConfig from './HttpConfig';
import CaseConverter from './CaseConverter';

export default class HttpStringHelper {

  protected caseConverter: CaseConverter;
  private config: HttpConfig;

  constructor(
    config: HttpConfig
  ) {
    this.config = config;
    this.caseConverter = new CaseConverter(config);
  }

  public formatUriPrefix(uri: string): string {
    if (uri.length > 0 && uri[0] === '/') {
      uri = uri.substr(1);
    }
    if (uri.length > 0 && uri[uri.length - 1] == '/') {
      uri = uri.substr(0, uri.length - 1);
    }
    return uri;
  }

  public requestUrl(uri: string, uriPrefix: string, queryString: string): string {
    uri = uri[0] === '/' ? uri.substring(1) : uri;
    const formattedUri = this.formatUriPrefix(uri);
    const fullUri = uriPrefix ? 
      `/${uriPrefix}/${formattedUri}${queryString}` :
      `/${formattedUri}${queryString}`;
    let protocol = this.config.protocol ? this.config.protocol : HttpConfig.HTTP;
    const hostname = this.config.hostname || location.host;
    const port = this.config.port|| location.port;
    if (port === 80 || port === 443) {
      return `${protocol}://${hostname}${fullUri}`
    }
    return `${protocol}://${hostname}:${port}${fullUri}`
  }

  public getQuery(query: object | string = {}): string {
    if (!query) {
      return "";
    }
    if (typeof query === "string") {
      if (query[0] !== "?") {
        query = "?" + query;
      }
      return encodeURI(query as string);
    }
    const serverCaseQuery = this.caseConverter.convertToServerCase(query);
    let queryString = Object.keys(serverCaseQuery).reduce(
      (str: string, key: string, index: number): string  => {
        const value: string|number|boolean = this.getQueryValue(serverCaseQuery[key]);
        if (index === 0)  {
          return `${str}?${key}=${value}`;
        }
        return `${str}&${key}=${value}`;
    }, '');
    if (queryString.length > 0) {
      return queryString;
    }
    return "";
  }

  private getQueryValue(value: any): string|number|boolean {
    if (typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean") {
      return value;
    }
    return JSON.stringify(value);
  }
}
