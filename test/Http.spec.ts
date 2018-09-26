import mockttp = require("mockttp");
import HttpConfig from '../src/HttpConfig';
import Http from '../src/Http';
import ResponseType from '../src/interfaces/ResponseType';
import { clientCase, serverCase, ClientCase, ErrorCase } from './mocks';


describe('Http', () => {
  let http: Http;
  let server;
  let config;
  let mockServer;

  beforeEach(() => {
    mockServer = mockttp.getLocal();
    config = new HttpConfig();
    config.port = 8080;
    mockServer.start(config.port);
    http = Http.default(config);
    mockServer.reset();
  });

  afterEach(() => {
    mockServer.stop();
  });

  describe('.get', () => {
    describe('when the server has a response', () => {
      test('the server case will be equal to the the clientCase', done => {
        mockServer.get("/test").thenReply(200, JSON.stringify(serverCase));
        http.get<ClientCase>("test").then((response: ClientCase) => {
          expect(response).toMatchObject(clientCase);
          done();
        });
      });
    });

    describe('when the response is empty', () => {
      test('the server case will be equal to {}', done => {
        mockServer.get("/test").thenReply(204, JSON.stringify(undefined));
        http.get<{}>("test").then((response: {}) => {
          expect(response).toMatchObject({});
          done();
        });
      });
    });

    describe('when the response is erroneous', () => {
      test('the server case will reflect the error type', done => {
        mockServer.get("/test").thenReply(500, JSON.stringify({error_type: 'bad request'}));
        http.get<{}>("test").catch((response:ErrorCase) => {
          expect(response).toMatchObject({errorType: 'bad request'});
          done();
        });
      });
    });

    describe('when the query params are serialized', () => {
      test('the server case will be equal to {}', done => {
        mockServer.get("/test")
          .withQuery({query_param: "test", other_param:123})
          .once()
          .thenReply(204, JSON.stringify(undefined));

        http.get<{}>("test", { queryParam:"test", otherParam: 123 })
          .then(response => {
            expect(response).toEqual({});
            done();
          });
      });
    });
  });

  describe('.post', () => {
    describe('when the server has a response', () => {
      test('the server case json will be equal to the the clientCase', done => {
        mockServer.post("/test")
          .thenReply(200, JSON.stringify(serverCase));
        http.post<ClientCase>("test", clientCase).then((response: ClientCase) => {
          expect(response).toMatchObject(clientCase);
          done();
        });
      });
    });

    describe('when the response is empty', () => {
      test('the server case will be equal to {}', done => {
        mockServer.post("/test")
          .thenReply(204, JSON.stringify(undefined));
        http.post<{}>("test", clientCase).then((response: {}) => {
          expect(response).toMatchObject({});
          done();
        });
      });
    });

    describe('when the response is erroneous', () => {
      test('the server case will reflect the error type', done => {
        mockServer.post("/test")
          .thenReply(500, JSON.stringify({error_type: 'bad request'}));
        http.post<{}>("test", clientCase).catch((response:ErrorCase) => {
          expect(response).toMatchObject({errorType: 'bad request'});
          done();
        });
      });
    });
  });

  describe('.put', () => {
    describe('when the server has a response', () => {
      test('the server case json will be equal to the the clientCase', done => {
        mockServer.put("/test")
          .thenReply(200, JSON.stringify(serverCase));
        http.put<ClientCase>("test", clientCase).then((response: ClientCase) => {
          expect(response).toMatchObject(clientCase);
          done();
        });
      });
    });

    describe('when the response is empty', () => {
      test('the server case will be equal to {}', done => {
        mockServer.put("/test")
          .thenReply(204, JSON.stringify(undefined));
        http.put<{}>("test", clientCase).then((response: {}) => {
          expect(response).toMatchObject({});
          done();
        });
      });
    });

    describe('when the response is erroneous', () => {
      test('the server case will reflect the error type', done => {
        mockServer.put("/test")
          .thenReply(500, JSON.stringify({error_type: 'bad request'}));
        http.put<{}>("test", clientCase).catch((response:ErrorCase) => {
          expect(response).toMatchObject({errorType: 'bad request'});
          done();
        });
      });
    });
  });

  describe('.delete', () => {
    describe('when the server has a response', () => {
      test('the server case json will be equal to the the clientCase', done => {
        mockServer.delete("/test")
          .thenReply(200, JSON.stringify(serverCase));
        http.delete<ClientCase>("test", clientCase).then((response: ClientCase) => {
          expect(response).toMatchObject(clientCase);
          done();
        });
      });
    });

    describe('when the response is empty', () => {
      test('the server case will be equal to {}', done => {
        mockServer.delete("/test")
          .thenReply(204, JSON.stringify(undefined));
        http.delete<{}>("test", clientCase).then((response: {}) => {
          expect(response).toMatchObject({});
          done();
        });
      });
    });

    describe('when the response is erroneous', () => {
      test('the server case will reflect the error type', done => {
        mockServer.delete("/test")
          .thenReply(500, JSON.stringify({error_type: 'bad request'}));
        http.delete<{}>("test", clientCase).catch((response:ErrorCase) => {
          expect(response).toMatchObject({errorType: 'bad request'});
          done();
        });
      });
    });
  });

  describe('.patch', () => {
    describe('when the server has a response', () => {
      test('the server case json will be equal to the the clientCase', done => {
        mockServer.patch("/test")
          .thenReply(200, JSON.stringify(serverCase));
        http.patch<ClientCase>("test", clientCase).then((response: ClientCase) => {
          expect(response).toMatchObject(clientCase);
          done();
        });
      });
    });

    describe('when the response is empty', () => {
      test('the server case will be equal to {}', done => {
        mockServer.patch("/test")
          .thenReply(204, JSON.stringify(undefined));
        http.patch<{}>("test", clientCase).then((response: {}) => {
          expect(response).toMatchObject({});
          done();
        });
      });
    });

    describe('when the response is erroneous', () => {
      test('the server case will reflect the error type', done => {
        mockServer.patch("/test")
          .thenReply(500, JSON.stringify({error_type: 'bad request'}));
        http.patch<{}>("test", clientCase).catch((response:ErrorCase) => {
          expect(response).toMatchObject({errorType: 'bad request'});
          done();
        });
      });
    });
  });
});
