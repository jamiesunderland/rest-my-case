import HttpConfig from './HttpConfig';

export default class CaseConverter {

  private config: HttpConfig;

  constructor(config: HttpConfig) {
    this.config = config;
  }

  private convertCase(caseFunction: (str: string) => string, data = {} as any) : any {
    if (data instanceof Array) {
      return data.map((obj: any) => this.convertCase(caseFunction, obj));
    }
    return Object.keys(data || {}).reduce((newData: any, key: string) => {
      const value:any = data[key];
      if (data.hasOwnProperty(key)) {
        const newKey = caseFunction(key);
        return {
          ...newData,
          [newKey]: this.newCaseValue(value, caseFunction)
        };
      }
      return {
        ...newData,
        [key]: value
      };
    }, {});
  }

  private newCaseValue(value: any, caseFunction: (str: string) => string): any {
    if (value instanceof Object) {
      return this.convertCase(caseFunction, value);
    }
    return value;
  }

  public convertToServerCase(data: any): any {
    return this.convertCase(this.config.serverCase, data);
  }

  public convertToClientCase(data: any): any {
    return this.convertCase(this.config.clientCase, data);
  }
}
