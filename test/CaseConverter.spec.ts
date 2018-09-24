import HttpConfig from '../src/HttpConfig';
import CaseConverter from '../src/CaseConverter';
import { clientCase, serverCase } from './mocks';


describe('HttpConfig', () => {
  let caseConverter;

  beforeAll(() => {
    let config = new HttpConfig();
    caseConverter = new CaseConverter(config);
  });

  describe('.convertToServerCase', () => {
    it('converts a client case json to a server cased json' , () => {
      expect(caseConverter.convertToServerCase(clientCase)).toMatchObject(serverCase);
    });
  });

  describe('.convertToClientCase', () => {
    it('converts a server case json to a client cased json' , () => {
      expect(caseConverter.convertToClientCase(serverCase)).toMatchObject(clientCase);
    });
  });
});
