import HttpConfig from '../src/HttpConfig';
import HttpStringHelper from '../src/HttpStringHelper';
import { clientCase } from './mocks';

describe('HttpStringHelper', () => {

  let httpStringHelper: HttpStringHelper;
  let config;

  beforeEach(() => {
    config = new HttpConfig();
    config.port = 8080;
    httpStringHelper = new HttpStringHelper(config);
  });

  describe('.formatUriPrefix', () => {

    test("when the uri is prefixed with a /", () => {
      let uri = "/test";
      expect(httpStringHelper.formatUriPrefix(uri)).toEqual("test");
    });

    test("when the uri is suffixed with a /", () => {
      let uri = "/test";
      expect(httpStringHelper.formatUriPrefix(uri)).toEqual("test");
    });

    test("when the uri is suffixed with a / and prefixed with a /", () => {
      let uri = "/test/";
      expect(httpStringHelper.formatUriPrefix(uri)).toEqual("test");
    });

    test("when the uri is has no prefix or suffic of /", () => {
      let uri = "test";
      expect(httpStringHelper.formatUriPrefix(uri)).toEqual("test");
    });

  });

  describe('.requestUrl', () => {
    let uri = "test";
    let uriPrefix = "api";
    let queryString = "";
    test('when the port does not equal 80 or 443', () => {
      config.port = 80;
      expect(httpStringHelper.requestUrl(uri, uriPrefix, queryString))
        .toEqual("http://localhost/api/test");
    });

    test('when the port does equal 80', () => {
      config.port = 8080;
      expect(httpStringHelper.requestUrl(uri, uriPrefix, queryString))
        .toEqual("http://localhost:8080/api/test");
    });

  });

  describe('.getQuery', () => {
    test('when the query is a string it returns the uri encoded string', () => {
      let query = "test=test value"
      expect(httpStringHelper.getQuery(query))
        .toEqual("test=test%20value");
    });

    test('when the query is an object it case converts and stringifies', () => {
      let queryString = "?key_one=1&key_two=two&key_three={\"key_four\":[{\"key_five\":5},{\"key_six\":6}]}";
      expect(httpStringHelper.getQuery(clientCase))
        .toEqual(queryString);
    });
  });
});
